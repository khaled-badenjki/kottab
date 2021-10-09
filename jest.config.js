/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@kottab/(.*)": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: [
    "<rootDir>/bin"
  ]
};