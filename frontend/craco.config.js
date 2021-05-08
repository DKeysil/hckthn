const CracoLessPlugin = require(`craco-less`)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': `#722ed1`,
              '@link-color': `#722ed1`,
              '@success-color': `#52c41a`,
              '@warning-color': `#faad14`,
              '@error-color': `#f5222d`,
              '@processing-color': `#722ed1`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
