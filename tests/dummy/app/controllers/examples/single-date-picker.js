import Controller from '@ember/controller';
import { next } from '@ember/runloop';

export default Controller.extend({
  selectedStartDate: null,
  selectedEndDate: null,

  init() {
    this._super(...arguments);

    this.setProperties({
      selectedStartDate: new Date(),
      selectedEndDate: new Date()
    });
  },

  actions: {
    showCalendar(calendar) {
      this.set(calendar, true);
    },

    hideCalendar(calendar) {
      this.set(calendar, false);
    },

    onStartDateDidChange(date) {
      this.set('selectedStartDate', date.toDate());
      this.set('selectedStartDateFormatted', date.format('Do of MMMM YYYY'));
      next(
        () => {
          this.send('hideCalendar', 'startDatePicker');
          document.querySelector('.start-date').blur();
        }
      );
    },

    onEndDateDidChange(date) {
      this.set('selectedEndDate', date.toDate());
      this.set('selectedEndDateFormatted', date.format('Do of MMMM YYYY'));
      next(
        () => {
          this.send('hideCalendar', 'endDatePicker');
          document.querySelector('.end-date').blur();
        }
      );
    }
  }
});
