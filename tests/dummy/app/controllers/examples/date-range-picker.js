import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onChange(date, selected) {
      if (selected.length > 1) {
        return this.set('selectedDateFormatted', `${selected[0].format('Do of MMMM YYYY')} to ${selected[1].format('Do of MMMM YYYY')}`);
      }

      this.set('selectedDateFormatted', null);
    }
  }
});
