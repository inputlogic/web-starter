// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: {
    joinTo: {
      'app.css': /^app/
    },
    order: {
      before: [
        'app/stylesheets/reset.less',
        'app/stylesheets/base.less'
      ]
    }
  }
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
          // `app` directory. i.e. `/app.js` resolves to `app/app.js`.
          '': './app'
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
