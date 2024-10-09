module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    setupFiles: ['jest-date-mock', './src/setup/mock-date.ts'],
    preset: 'ts-jest',
    rootDir: './',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
        '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^domain/(.*)$': '<rootDir>/src/domain/$1',
        '^core/(.*)$': '<rootDir>/src/core/$1',
        '^infra/(.*)$': '<rootDir>/src/infra/$1',
        '^event-handler/(.*)$': '<rootDir>/src/event-handler/$1',
        '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    },
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};
