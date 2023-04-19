// Docs related to this link: https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
import type { Config } from "@jest/types";
import { defaults as tsjPreset } from "ts-jest/presets";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  roots: ["./src/__tests__/tests"],
  testEnvironment: "node",
  verbose: true,
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

};

export default config;

// export default {
//   transform: {
//       '^.+\\.ts?$': 'ts-jest',
//       "\\.(gql|graphql)$": "jest-transform-graphql",
//       ".*": "babel-jest"
//   },
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// }

// export default config;

// /** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
// module.exports = {
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//     '^.+\\.js$': 'babel-jest',
//     '^.+\\.mjs$': 'babel-jest',
//   },
//   moduleDirectories: ['node_modules', '<rootDir>/src'],
//   moduleNameMapper: {
//     '@controllers/(.*)': '<rootDir>/src/controllers/$1',
//     '@middleware/(.*)': '<rootDir>/src/middleware/$1',
//     '@models/(.*)': '<rootDir>/src/models/$1',
//     '@routes/(.*)': '<rootDir>/src/routes/$1',
//     '@types/(.*)': '<rootDir>/src/types/$1',
//     '@util/(.*)': '<rootDir>/src/util/$1',
//   },
//   globals: {
//     'ts-jest' : {
//       astTransformers: {
//         before: [
//           'ts-jest/dist/transformers/path-mapping'
//         ]
//       },
//     }
//   },
//   globalSetup: './src/__tests__/helper.ts',
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   extensionsToTreatAsEsm: ['.ts'],
//   testPathIgnorePatterns: ['.js'],

// globals: {
//   // when we are testing we want to use a slightly different config
//   // to allow for jest types
//   'ts-jest': {
//     tsconfig: '/home/f18/Desktop/devs/jobs/2show/2showbe/src/__tests__/tsconfig.json',
//     useESM: true,
//   },
// },
// };

// configuration for package.json for the time is only reference
// "jest": {
//   "testEnvironment": "node",
//   "globalTeardown": "./dist/tests/teardown.js",
//   "testPathIgnorePatterns": [
//     "/node_modules/",
//     "./dist"
//   ],
//   "coverageReporters": [
//     "lcov",
//     "html"
//   ],
//   "moduleNameMapper": {
//     "^mongoose$": "/home/f18/Desktop/devs/jobs/2show/2showbe/node_modules/mongoose"
//   }
// }
