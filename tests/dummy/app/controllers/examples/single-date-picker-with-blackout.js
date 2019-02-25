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

  isDateBefore(query, date) {
    return query.toDate().getTime() < date.getTime();
  },

  actions: {
    showCalendar(calendar) {
      this.set(calendar, true);
    },

    hideCalendar(calendar) {
      this.set(calendar, false);
    },

    isStartDateBlocked(date) {
      return this.isDateBefore(date, new Date());
    },

    isEndDateBlocked(date) {
      return this.isDateBefore(date, this.get('selectedStartDate'));
    },

    onStartDateDidChange(date) {
      this.set('selectedStartDate', date.toDate());
      this.set('selectedStartDateFormatted', date.format('Do of MMMM YYYY'));
      next(
        () => {
          this.set('selectedEndDate', this.get('selectedStartDate'));
          this.set('selectedEndDateFormatted', this.get('selectedStartDateFormatted'));

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
