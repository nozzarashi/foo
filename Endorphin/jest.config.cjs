// jest.config.cjs
const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('fs');
const path = require('path');

// --- Helper для чтения JSONC (JSON с комментариями) ---
function readJsonc(jsoncPath) {
  const jsoncContent = fs.readFileSync(path.resolve(__dirname, jsoncPath), 'utf-8');
  // Удаляем однострочные и многострочные комментарии
  const jsonContent = jsoncContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  return JSON.parse(jsonContent);
}

// Читаем tsconfig с помощью нашего хелпера
const tsconfig = readJsonc('./tsconfig.app.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },

  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
