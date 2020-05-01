import jsdomGlobal = require('jsdom-global');
import * as fs from 'fs';

export function jsdomGlobalFromFile(file: string): void {
  jsdomGlobal(fs.readFileSync('src/index.html'), {
    "includeNodeLocations": true,
    "resources": "usable",
    "runScripts": "outside-only"
  });
}
