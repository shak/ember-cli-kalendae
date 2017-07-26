import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('examples', function() {
    this.route('single-date-picker');
    this.route('single-date-picker-with-blackout');
    this.route('date-range-picker');
  });
});

export default Router;
