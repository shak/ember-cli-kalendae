import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
