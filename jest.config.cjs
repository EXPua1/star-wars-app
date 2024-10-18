module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy", // для CSS модулей
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // игнорировать CSS
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // путь к настройкам
  testEnvironment: "jsdom",
};
