import Controller from '@ember/controller';
import jQuery from 'jquery';
import { next } from '@ember/runloop';

export default Controller.extend({
  selectedStartDate: new Date(),
  selectedEndDate: new Date(),

  isDateBefore(query, date) {
    if (query.year() < date.getFullYear()) {
      return true;
    }

    if (query.month() < date.getMonth()) {
      return true;
    }

    if (query.date() < date.getDate()) {
      if (query.month() <= date.getMonth()) {
        return true;
      }
    }

    return false;
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
