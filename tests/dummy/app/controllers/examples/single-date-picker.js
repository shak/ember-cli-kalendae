import Controller from '@ember/controller';
import jQuery from 'jquery';
import { next } from '@ember/runloop';

export default Controller.extend({
  selectedStartDate: new Date(),
  selectedEndDate: new Date(),

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
          jQuery('#startDate').blur();
        }
      );
    },

    onEndDateDidChange(date) {
      this.set('selectedEndDate', date.toDate());
      this.set('selectedEndDateFormatted', date.format('Do of MMMM YYYY'));
      next(
        () => {
          this.send('hideCalendar', 'endDatePicker');
          jQuery('#endDate').blur();
        }
      );
    }
  }
});
