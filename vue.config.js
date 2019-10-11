const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('stylus', resolve('src/common/stylus'))
  }
}
