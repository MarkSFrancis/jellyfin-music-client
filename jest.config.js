module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
};
