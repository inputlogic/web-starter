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
