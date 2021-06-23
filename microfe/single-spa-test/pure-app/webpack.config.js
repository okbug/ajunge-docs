const singleSpaDefaults = require("webpack-config-single-app")
const { merge } = require("webpack-merge")

module.exports = () => {
  const defaultConfig = singleSpaDefaults({
    orgName: "okbug",
    projectName: "pureapp"
  })
  return merge(defaultConfig, {
    devServer: {
      port: 9001
    }
  })
}
