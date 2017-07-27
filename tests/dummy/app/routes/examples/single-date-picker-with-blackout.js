import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    willTransition() {
      this.controller.set('selectedStartDate', new Date());
      this.controller.set('selectedEndDate', new Date());
      this.controller.set('selectedStartDateFormatted', null);
      this.controller.set('selectedEndDateFormatted', null);
    }
  }
});
