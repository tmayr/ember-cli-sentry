/* jshint node: true */
'use strict';
var semver = require('semver');

module.exports = {

  name: 'ember-cli-sentry',

  contentFor: function(type, config){
    var bundle;

    /*
    * 1.1.19 is the version where sentry started including
    * the correct ember debug version, if we're using a
    * greater version than 1.1.19, we just use their version
    */
    if(semver.gte(config.sentry.version, '1.1.19')){
      config.sentryBundle = true;
      bundle = 'ember,jquery,native';
    } else {
      config.sentryBundle = false;
      bundle = 'jquery,native';
    }

    if (type === 'body' && !config.sentry.skipCdn && !config.sentry.development) {
      return '<script src="' + config.sentry.cdn + '/' + config.sentry.version + '/' + bundle + '/raven.min.js"></script>';
    }
  }

};
