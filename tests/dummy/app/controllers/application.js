import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onDateClicked(date) {
      console.log('date clicked', date);
    }
  }
})
