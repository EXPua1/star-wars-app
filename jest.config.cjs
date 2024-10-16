// jest.config.cjs
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy", // обработка CSS модулей
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // игнорируем все CSS
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Добавляем путь к файлу setupTests
  testEnvironment: "jsdom",
};
