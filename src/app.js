const { exec } = require('child_process')
const { normalize, resolve, basename, extname }  = require('path')
const fs  = require('fs')
const { promisify }  = require('util')
const { eachSeries }  = require('async')
const { sendMail }  = require('./mailer.js')
const { logPath, logger }  = require('./logger/index.js')

// File system variables
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const readDir = promisify(fs.readdir)
const appendFile = promisify(fs.appendFile)
const fileExists = promisify(fs.exists)
const deleteFile = promisify(fs.unlink)

// Path variables
const basePath = resolve()
const framecPath = normalize(`${basePath}/framec`)
const tempPath = normalize(`${basePath}/temp`)
const testFilesPath = normalize(`${basePath}/test-files`)
const mainHandlerPath = normalize(`${basePath}/main-handlers`)
const outputPath = normalize(`${basePath}/output`)

// List of all target languages (id = file extension, fullName = framec language transpile code)
const testTypeList = [
  {id: 'rs', fullName: 'rust'}
]

let errorInTestSuite = false
const finalReport = {
  processed: [],
  notProcessed: {},
  notMatched: {}
}

const execShellCommand = (cmd) => {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (stderr || error) return res([stderr || error, null])
      res([false, stdout])
    })
  })
}

const compileRustFile = async (fullPath, fileNameWithoutExt) => {
  const rustBuildCmd = `rustc --out-dir ${tempPath} ${fullPath}`
  const [errorRustBuild, ] = await execShellCommand(rustBuildCmd)
  if (errorRustBuild) {
    logger.error('Error while building rust:', errorRustBuild)
    const binaryGenerated = await fileExists(normalize(`${tempPath}/${fileNameWithoutExt}`))
    if (!binaryGenerated) {
      return [true, null]
    }
  }
  await deleteFile(fullPath)
  const rustExeCmd = normalize(`${tempPath}/${fileNameWithoutExt}`)
  const [errorRustExe, rustOutput] = await execShellCommand(rustExeCmd)
  if (errorRustExe) {
    return [true, null]
  }
  await deleteFile(`${tempPath}/${fileNameWithoutExt}`)
  return [null, rustOutput]
}

const getMailContent = () => {
  let content = `
  Hi,

  Please find the attached report generated for the test suite available.
  All files are successfully processed without any errors.

  Regards
  `

  if (errorInTestSuite) {
    content = `
    Hi,
  
    Please find the attached report generated for the test suite available.
    The test suite is consists with errors. Please take a look on the logs.
  
    Regards
    `
  }
  return content
}


(async () => {
  // All files for test
  logger.info(`================== Started ${new Date()} ==================\n`)
  const testFiles = await readDir(testFilesPath)
  logger.info(`Found total ${testFiles.length} files to be processed.`)

  await eachSeries(testFiles, async (testFile) => {
    logger.info(`====== Processing file: ${testFile} ======`)
    const filePath = normalize(`${testFilesPath}/${testFile}`)

    if (extname(filePath) !== '.frm') {
      finalReport['notProcessed'][testFile] = 'Not a frame spec.'
      logger.error('Error occured: Not a frame spec.\n')
      return
    }

    await eachSeries(testTypeList, async (type) => {
      try {
        logger.info(`--> Target: ${type.fullName}`)
        // Execute command with framec executable
        const command = `${framecPath} ${filePath} ${type.fullName}`
        const [errWhileFramepile, framepiledCode] = await execShellCommand(command)
        if (errWhileFramepile) {
          finalReport['notProcessed'][testFile] = `Error while framepiling the file in ${type.fullName} target`
          logger.error(`Error while framepiling the file in ${type.fullName} target\n`)
          return
        }

        // Write file to temp folder
        const fileNameWithoutExt = basename(filePath, '.frm') 
        const fileToWrite = `${fileNameWithoutExt}.${type.id}`
        const fullPath = `${tempPath}/${fileToWrite}`
        await writeFile(fullPath, framepiledCode)

        // Append main file content
        const mainFile = normalize(`${mainHandlerPath}/${type.id}/${fileToWrite}`)
        // fileExists(mainFile)
        const mainHandlerExists = await fileExists(mainFile)
        if (!mainHandlerExists) {
          finalReport['notProcessed'][testFile] = 'Main handler file not exists.'
          logger.error('Main handler file not exists.\n')
          await deleteFile(fullPath)
          return
        }
        const mainContent = await readFile(mainFile, 'utf-8')
        await appendFile(fullPath, mainContent)

        // Store current output
        let currentOutput = ''

        // Get current file results after compiling
        if (type.fullName === 'rust') {
          const [errWhileCompileRust, rustOutput] = await compileRustFile(fullPath, fileNameWithoutExt)
          if (errWhileCompileRust) {
            finalReport['notProcessed'][testFile] = `Error while compiling the file in ${type.fullName} target.`
            logger.error(`Error while compiling the file in ${type.fullName} target.\n`)
            return
          }
          currentOutput = rustOutput
        } else {
          const [errorWhileExe, fileOutput] = await execShellCommand(`node ${fullPath}`)
          if (errorWhileExe) {
            finalReport['notProcessed'][testFile] = `Error while executing the file in ${type.fullName} target. Error: ${errorWhileExe}`
            logger.error(`Error while executing the file in ${type.fullName} target. Error: ${errorWhileExe}\n`)
            return
          }
          currentOutput = fileOutput
        }
        // Read output file
        const outputFile = normalize(`${outputPath}/${fileNameWithoutExt}.txt`)
        const outputFileExists = await fileExists(outputFile)
        if (!outputFileExists) {
          finalReport['notProcessed'][testFile] = 'Output file not exists.'
          logger.error('Output file not exists.\n')
          return
        }
        const outputContent = await readFile(outputFile, 'utf-8')
        const isMatched = outputContent.trim() === currentOutput.trim()
        // Compare results
        if (isMatched) {
          finalReport['processed'].push(testFile)
        } else {
          finalReport['notMatched'][testFile] = {
            previous: outputContent.trim(),
            current: currentOutput.trim()
          }
        }
        logger.info('Processed successfully.\n')
      } catch (err) {
        finalReport['notProcessed'][testFile] = `Error while processing the file in ${type.fullName} target. Error: ${err}`
        logger.error(`Error while processing file ${testFile}`, err, '\n')
        return
      }
    })
  })

  let finalReportLog = '\n================== Final Report ==================\n'
  finalReportLog += `\n--> Processed files with no errors and matched outputs: ${finalReport['processed'].length}\n`;

  finalReport['processed'].forEach((processedFile, index) => {
    finalReportLog += `${index + 1}. ${processedFile}\n`
  })


  finalReportLog += `\n--> Non processed files due to some errors: ${Object.keys(finalReport['notProcessed']).length}\n`
  if (Object.keys(finalReport['notProcessed']).length) {
    errorInTestSuite = true
    for (let [index, [key, value]]  of Object.entries(Object.entries(finalReport['notProcessed']))) {
      finalReportLog += `${Number(index) + 1}. ${key}: Reason -> ${value}\n`
    }
  }

  finalReportLog += `\n--> File where output is not matched from stored once: ${Object.keys(finalReport['notMatched']).length}\n`
  if (Object.keys(finalReport['notMatched']).length) {
    for (let [index, [key, value]]  of Object.entries(Object.entries(finalReport['notMatched']))) {
      finalReportLog += `${Number(index) + 1}. ${key}\n`
      finalReportLog += 'Stored output:\n'
      finalReportLog += value.previous + '\n'
      finalReportLog += 'Current output:\n'
      finalReportLog += value.current + '\n'
    }
  }

  logger.info(finalReportLog)

  logger.info(`================== Complete ${new Date()} ==================`)

  // Send mail for production only
  if (process.env.NODE_ENV === 'production') {
    const logFullPath = `${basePath}/${logPath}`
    const mailContent = getMailContent()
    sendMail(logFullPath, mailContent)
  }
})()


