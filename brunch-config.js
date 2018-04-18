// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!client)/,
      'app.js': /^client/
    }
  },
  stylesheets: {
    joinTo: {
      'app.css': /^client/
    },
    order: {
      before: [
        'client/stylesheets/reset.less',
        'client/stylesheets/base.less'
      ]
    }
  }
}

exports.paths = {
  watched: ['client', 'test', 'vendor']
}

exports.plugins = {
  pleeease: {
    autoprefixer: true,
    rem: false,
    pseudoElements: false,
    minifier: true
  },
  babel: {
    presets: [
      ['env', {
        'targets': {
          'browsers': ['last 2 versions']
        }
      }],
      'react'
    ],
    plugins: [
      'transform-object-rest-spread',
      ['module-resolver/lib/index.js', {
        'alias': {
          // This will cause require paths starting with `/` to resolve to the
          // `client` directory. i.e. `/app.js` resolves to `client/app.js`.
          '': './client'
        }
      }],
      ['jsx-import/src/index.js', {
        'identifier': 'Preact',
        'moduleName': 'preact'
      }],
      ['transform-react-jsx', {'pragma': 'Preact.h'}]
    ]
  },
  uglify: {
    mangle: false,
    keep_fnames: true,
    compress: false
  },
  replacer: {
    dict: [
      {
        key: /__ENV__/g,
        value: process.env.NODE_ENV || 'development'
      }
    ]
  }
}
