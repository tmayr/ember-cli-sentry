/* global Raven */
import config from '../config/environment';
import Ember from 'ember';

export function initialize() {
  if(config.sentry.development){
    return;
  }

  Raven.config(config.sentry.dsn, {
    release: config.APP.version,
    whitelistUrls: config.sentry.whitelistUrls
  }).install();

  if(!config.sentryBundle){
    var _onerror = Ember.onerror;

    Ember.onerror = function(error){
      Raven.captureException(error);
      if (typeof _onerror === 'function') {
        _onerror.call(this, error);
      }
    }

    Ember.RSVP.on('error', function (reason) {
      if (reason instanceof Error) {
        Raven.captureException(reason, {extra: {context: 'Unhandled Promise error detected'}});
      } else {
        Raven.captureMessage('Unhandled Promise error detected', {extra: {reason: reason}});
      }
    });
  }
}

export default {
  name: 'sentry-setup',
  initialize: initialize
};
