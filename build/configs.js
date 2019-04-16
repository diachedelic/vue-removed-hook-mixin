const path = require('path')
const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

const name = 'vue-removed-hook-mixin'

const banner =
`/*!
  * ${name} v${version}
  * (c) ${new Date().getFullYear()} James Diacono
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolve(`dist/${name}.js`),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve(`dist/${name}.min.js`),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve(`dist/${name}.common.js`),
    format: 'cjs'
  },
  {
    file: resolve(`dist/${name}.esm.js`),
    format: 'es'
  },
  {
    file: resolve(`dist/${name}.esm.browser.js`),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve(`dist/${name}.esm.browser.min.js`),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        node(),
        cjs(),
        replace({
          __VERSION__: version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueRemovedHookMixin'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble())
  }

  return config
}
