module.exports = {
  // babel ： 插件   预设(肯定需要的哪些插件 babel都放到了预设当中)
  presets: ["@babel/preset-env"],
  // plugins: ['@babel/plugin-proposal-class-properties']
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }]
  ]
}