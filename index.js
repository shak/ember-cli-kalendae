'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name
  getConfig(app) {
    const options = typeof app.options === 'object' ? app.options : {};

    return options['emberCLIKalendae'] || { useStandalone: false, includeMoment: true, includeKalendae: true, includeStyles: true };
  },

  included(app) {
    this._super.included.apply(this, arguments);

    const config = this.getConfig(app);

    if (config.includeKalendae) {
      if (config.includeMoment) {
        app.import('vendor/moment/moment.min.js');
      }

      if (config.useStandalone) {
        app.import('vendor/kalendae/kalendae.standalone.min.js');
      } else {
        app.import('vendor/kalendae/kalendae.min.js');
      }
    }

    if (config.includeStyles) {
      app.import('vendor/kalendae/kalendae.css');
    }
  },

  treeForVendor() {
    const a = new Funnel(path.join(this.app.project.root, 'node_modules', 'kalendae', 'build'), {
      files: ['kalendae.min.js', 'kalendae.css', 'kalendae.standalone.min.js'],
      destDir: 'kalendae'
    });

    const b = new Funnel(path.join(this.app.project.root, 'node_modules', 'moment', 'min'), {
      files: ['moment.min.js'],
      destDir: 'moment'
    });


    return mergeTrees([a, b]);
  }
};
