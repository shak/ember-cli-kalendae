import Controller from '@ember/controller';
import jQuery from 'jquery';
import { next } from '@ember/runloop';

export default Controller.extend({
  blah: 'test',
  selected1: new Date(),
  selected2: new Date(),

  actions: {
    showCalendar(calendar) {
      this.set(calendar, true);
    },

    hideCalendar(calendar) {
      this.set(calendar, false);
    },

    onDidChange1(date) {
      this.set('selected1', date);
      this.set('selectedValue1', date.format('YYYY-MM-DD'));
      next(
        () => {
          this.send('hideCalendar', 'showCalendar1');
          jQuery('input[name="calendar1"]').blur();
        }
      );
    },

    onDidChange2(date) {
      this.set('selected2', date);
      this.set('selectedValue2', date.format('YYYY-MM-DD'));
      next(
        () => {
          this.send('hideCalendar', 'showCalendar2');
          jQuery('input[name="calendar2"]').blur();
        }
      );
    }
  }
});
