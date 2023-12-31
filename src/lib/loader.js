'use strict';

const fsp = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');

const OPTIONS = {
  timeout: 5000,
  displayErrors: false,
};

const load = async (filePath, sandbox) => {
  const src = await fsp.readFile(filePath, 'utf8');
  const code = `'use strict';\n{\n${src}\n}`;
  const script = new vm.Script(code, {
    ...OPTIONS,
    lineOffset: -2,
    filename: filePath
  });
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, OPTIONS);
  if (typeof exported === 'object') {
    const map = {};
    for (const [key, value] of Object.entries(exported)) {
      map[key] = value;
    }
    return map;
  }
  return exported;
};

const loadDir = async (folderPath, sandbox) => {
  const files = await fsp.readdir(folderPath, { withFileTypes: true });
  const container = {};
  for (const file of files) {
    const { name } = file;
    if (file.isFile() && !name.endsWith('.js')) continue;
    const location = path.join(folderPath, name);
    const key = path.basename(name, '.js');
    const loader = file.isFile() ? load : loadDir;
    const exported = await loader(location, sandbox);
    if (exported.constructor.name === 'Object') {
      for (const [methodName, method] of Object.entries(exported)) {
        container[`${key}/${methodName}`] = method;
      }     
    } else container[key] = exported;
  }
  return container;
};

module.exports = { load, loadDir };
