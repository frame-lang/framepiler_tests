import { exec } from 'child_process'
import { normalize, resolve, basename, extname } from 'path'
import * as fs from 'fs'
import { promisify } from 'util'
import { eachSeries } from 'async'

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
];

const finalReport = {
  processed: [],
  notProcessed: {},
  notMatched: {}
};

const execShellCommand = (cmd) => {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (stderr || error) return res([stderr || error, null])
      res([false, stdout])
    })
  })
}

(async () => {
  // All files for test
  console.log(`\n================== Started ${new Date()} ==================`);
  const testFiles = await readDir(testFilesPath)
  console.log(`Found total ${testFiles.length} files to be processed.`);

  await eachSeries(testFiles, async (testFile) => {
    console.log(`\n====== Processing file: ${testFile} ======`);
    const filePath = normalize(`${testFilesPath}/${testFile}`)

    if (extname(filePath) !== '.frm') {
      finalReport['notProcessed'][testFile] = 'Not a frame spec.'
      console.log('Error occured: Not a frame spec.');
      return
    }

    await eachSeries(testTypeList, async (type) => {
      try {
        console.log(`--> Target: ${type.fullName}`)
        // Execute command with framec executable
        const command = `${framecPath} ${filePath} ${type.fullName}`
        const [errWhileFramepile, framepiledCode] = await execShellCommand(command)
        if (errWhileFramepile) {
          finalReport['notProcessed'][testFile] = `Error while framepiling the file in ${type.fullName} target`
          console.log(`Error while framepiling the file in ${type.fullName} target`);
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
          console.log('Main handler file not exists.');
          await deleteFile(fullPath);
          return
        }
        const mainContent = await readFile(mainFile, 'utf-8')
        await appendFile(fullPath, mainContent)

        // Store current output
        let currentOutput = ''

        // Get current file results after compiling
        if (type.fullName === 'rust') {
          const rustBuildCmd = `rustc --out-dir ${tempPath} ${fullPath}`
          const [errorRustBuild, ] = await execShellCommand(rustBuildCmd)
          if (errorRustBuild) {
            finalReport['notProcessed'][testFile] = `Error while compiling the file in ${type.fullName} target.`
            console.log(`Error while compiling the file in ${type.fullName} target.`);
            return
          }
          await deleteFile(fullPath);
          const rustExeCmd = normalize(`${tempPath}/${fileNameWithoutExt}`)
          const [errorRustExe, rustOutput] = await execShellCommand(rustExeCmd)
          if (errorRustExe) {
            finalReport['notProcessed'][testFile] = `Error while executing the file in ${type.fullName} target.`
            console.log(`Error while executing the file in ${type.fullName} target.`);
            return
          }
          await deleteFile(`${tempPath}/${fileNameWithoutExt}`);
          currentOutput = rustOutput
        } else {
          const [errorWhileExe, fileOutput] = await execShellCommand(`node ${fullPath}`)
          if (errorWhileExe) {
            finalReport['notProcessed'][testFile] = `Error while executing the file in ${type.fullName} target. Error: ${errorRustExe}`
            console.log(`Error while executing the file in ${type.fullName} target. Error: ${errorRustExe}`);
            return
          }
          currentOutput = fileOutput
        }
        // Read output file
        const outputFile = normalize(`${outputPath}/${fileNameWithoutExt}.txt`)
        const outputFileExists = await fileExists(outputFile)
        if (!outputFileExists) {
          finalReport['notProcessed'][testFile] = 'Output file not exists.'
          console.log('Output file not exists.');
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
        console.log('Processed successfully.')
      } catch (err) {
        finalReport['notProcessed'][testFile] = `Error while processing the file in ${type.fullName} target. Error: ${err}`
        console.log(`Error while processing file ${testFile}`, err)
        return
      }
    });
  });

  console.log('\n================== Final Report ==================');
  console.log(`\n--> Processed files with no errors and matched outputs: ${finalReport['processed'].length}`);
  finalReport['processed'].forEach((processedFile, index) => {
    console.log(`${index + 1}. ${processedFile}`);
  })

  console.log(`\n--> Non processed files due to some errors: ${Object.keys(finalReport['notProcessed']).length}`);
  for (let [index, [key, value]]  of Object.entries(Object.entries(finalReport['notProcessed']))) {
    console.log(`${Number(index) + 1}. ${key}: Reson -> ${value}`);
  }

  console.log(`\n--> File where output is not matched from stored once: ${Object.keys(finalReport['notMatched']).length}`);
  if (Object.keys(finalReport['notMatched']).length) {
    for (let [index, [key, value]]  of Object.entries(Object.entries(finalReport['notMatched']))) {
      console.log(`${Number(index) + 1}. ${key}`);
      console.log('Stored output:\n', value.previous);
      console.log('Current output:\n', value.current);
    }
  }

  console.log(`\n================== Complete ${new Date()} ==================`);

})()


