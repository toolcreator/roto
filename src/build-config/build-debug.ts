import { execSync } from 'child_process';
import * as fs from 'fs';

function swallowErrorAndDie(err: Error, fatal: boolean = false): void {
  logErrorAndDie(err.name + ': ' + err.message, fatal);
}

function logErrorAndDie(err: string, fatal: boolean = false): void {
  const FATAL_MSG = '\nFATAL ERROR - CANNOT RESTORE STATE TO BEFORE STARTING THIS BUILD!'
  console.log(err + fatal ? FATAL_MSG : '');
  //process.exit(fatal ? 999 : 1);
}


function prepare(): void {
  try {
    fs.renameSync(__dirname + '/build-config.ts', __dirname + '/not-the-build-config-now.ts');
    fs.renameSync(__dirname + '/build-config-debug.ts', __dirname + '/build-config.ts');
  } catch (err) {
    if (err instanceof Error) {
      swallowErrorAndDie(err);
    } else {
      logErrorAndDie('Error: Could not rename file.');
    }
  }
}

function restore(): void {
  try {
    fs.renameSync(__dirname + '/build-config.ts', __dirname + '/build-config-debug.ts');
    fs.renameSync(__dirname + '/not-the-build-config-now.ts', __dirname + '/build-config.ts');
  } catch (err) {
    if (err instanceof Error) {
      swallowErrorAndDie(err, true);
    } else {
      logErrorAndDie('Error: Could not rename file.', true);
    }
  }
}


prepare();
try {
  execSync('npm run build');
} catch(err) {
  swallowErrorAndDie(err as Error);
}
restore();
