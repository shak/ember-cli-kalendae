/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
// see https://github.com/miguelcobain/ember-leaflet/blob/master/index.js
module.exports = {
  name: 'ember-cli-kalendae',
  getConfig(app) {
    const options = typeof app.options === 'object' ? app.options : {};

    return options['emberCLIKalendae'] || { useStandalone: false, includeMoment: true, includeKalendae: true, includeStyles: true };
  },

  included(app) {
    this._super.included.apply(this, arguments);

    const config = this.getConfig(app);

    if (config.includeKalendae) {
      const kalendaePath = path.join(this.app.project.root, 'node_modules', 'kalendae', 'build');

      if (config.includeMoment) {
        app.import(path.join(this.app.project.root, 'node_modules', 'moment', 'min', 'moment.min.js'));
      }

      if (config.useStandalone) {
        app.import(path.join(kalendaePath, 'kalendae.standalone.min.js'));
      } else {
        app.import(path.join(kalendaePath, 'kalendae.min.js'));
      }
    }

    if (config.includeStyles) {
      // include the css from vendor where it has already been exported to
      app.import(path.join('vendor/kalendae.css'));
    }
  },

  treeForStyles() {
    const config = this.getConfig(this.app);

    if (config.includeStyles) {
      return new Funnel(path.join(this.app.project.root, 'node_modules', 'kalendae', 'build'), {
        files: ['kalendae.css'],
        destDir: 'vendor'
      });
    }
  }
};
