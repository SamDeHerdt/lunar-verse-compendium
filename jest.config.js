const { defaults } = require("jest-config");

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1',
    },
    // Add any other custom configurations specific to your project
    // For example, you might want to configure setupFilesAfterEnv for testing libraries like Enzyme or React Testing Library
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  