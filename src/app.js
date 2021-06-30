import { exec } from 'child_process';
import { normalize, resolve, basename } from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

// File system variables
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const appendFile = promisify(fs.appendFile);

// Path variables
const basePath = resolve();
const framecPath = normalize(`${basePath}/framec`);
const tempPath = normalize(`${basePath}/temp`);
const testFilesPath = normalize(`${basePath}/test-files`);
const mainHandlerPath = normalize(`${basePath}/main-handlers`);
const outputPath = normalize(`${basePath}/output`);

// List of all target languages (id = file extension, fullName = framec language transpile code)
const testTypeList = [
  {id: 'js', fullName: 'javascript'}
];

const finalReport = {};

const execShellCommand = (cmd) => {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
      if (stderr || error) return res([true, null]);
      res([false, stdout]);
    });
  });
}

(async () => {
  // All files for test
  const testFiles = await readDir(testFilesPath);
  testFiles.forEach(async testFile => {
    finalReport[testFile] = '';
    const filePath = normalize(`${testFilesPath}/${testFile}`);
    
    // Iterate for all languages available
    testTypeList.forEach(async type => {

      // Execute command with framec executable
      const command = `${framecPath} ${filePath} ${type.fullName}`;
      const [errWhileFramepile, framepiledCode] = await execShellCommand(command);
      if (errWhileFramepile) {
        console.log(`Error in file:${filePath}`);
        return;
      }

      // Write file to temp folder
      const fileToWrite = `${basename(filePath, '.frm')}.${type.id}`;
      const fullPath = `${tempPath}/${fileToWrite}`
      await writeFile(fullPath, framepiledCode);

      // Append main file content
      const mainFile = normalize(`${mainHandlerPath}/${type.id}/${fileToWrite}`);
      const mainContent = await readFile(mainFile, 'utf-8');
      await appendFile(fullPath, mainContent);

      // Compare results
      const [errorWhileExe, fileOutput] = await execShellCommand(`node ${fullPath}`)
      const outputFile = normalize(`${outputPath}/${basename(filePath, '.frm')}.txt`)
      const outputContent = await readFile(outputFile, 'utf-8');

      const isMatched = fileOutput.trim() == outputContent.trim();
      console.log('isMatched', isMatched);
      finalReport[testFile] = isMatched ? 'Output Matched' : 'Output Not Matched';
      console.log('1',finalReport);
    })
    console.log('2',finalReport);

  })

  console.log('3',finalReport);

})();


