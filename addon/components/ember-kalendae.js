import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/ember-kalendae';

export default Component.extend({
  layout,

  mode: 'single',
  months: '1',
  weekStart: '0',
  direction: 'any',
  directionScrolling: true,
  blackout: null,
  viewStartDate: null,
  dateClassMap: {},
  dayOutOfMonthClickable: false,
  dayHeaderClickable: false,
  useYearNav: true,
  side: 'bottom',
  columnHeaderFormat: 'dd',
  titleFormat: 'MMMM, YYYY',
  dayNumberFormat: 'D',
  dayAttributeFormat: 'YYYY-MM-DD',
  parseSplitDelimiter: /,\s*|\s*-\s*/,
  rangeDelimiter: ' - ',
  multipleDelimiter: ', ',
  selected: new Date(),

  /**
   * Setups and initialises kalendae
   *
   * @private
   * @method initKalendae
   */
  initKalendae() {
    this.$().kalendae(
      this.getProperties(
        'mode',
        'months',
        'weekStart',
        'direction',
        'directionScrolling',
        'blackout',
        'viewStartDate',
        'dateClassMap',
        'dayOutOfMonthClickable',
        'dayHeaderClickable',
        'useYearNav',
        'side',
        'columnHeaderFormat',
        'titleFormat',
        'dayNumberFormat',
        'dayAttributeFormat',
        'parseSplitDelimiter',
        'rangeDelimiter',
        'multipleDelimiter',
        'selected'
      )
    );
  },

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, 'initKalendae')
  }
});
