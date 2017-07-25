import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
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
   * Returns current kalendae instance
   *
   * @property kalendae
   * @type Object | undefined Returns undefined if kalendae not found
   */
  kalendae: computed({
    get() {
      return this.$().data('kalendae');
    }
  }).volatile(),

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, 'initKalendae')
  },

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

    this.buildSubscriptions(this.get('kalendae'));
  },

  /**
   * Registers event callbacks with Kalendae
   *
   * @method buildSubscriptions
   * @param Object kalendae Kalendae instance
   */
  buildSubscriptions(kalendae) {
    kalendae.subscribe('date-clicked', this.didDateClicked.bind(this));
    kalendae.subscribe('change', this.didChange.bind(this));
  },

  /**
   * callback for `date-clicked` event
   *
   * @method didDateClicked
   * @param Object date
   */
  didDateClicked(date) {
    const onDateClicked = this.get('onDateClicked');

    if (typeOf(onDateClicked) === 'function') {
      onDateClicked(date);
    }
  },

  /**
   * callback for `change` event
   *
   * @method didChange
   * @param Object date
   */
  didChange(date) {
    const onDidChange = this.get('onDidChange');

    if (typeOf(onDidChange) === 'function') {
      onDidChange(date);
    }
  },

  /**
   * Removes kalendae subscriptions
   *
   * @protected
   * @method willDestroyElement
   */
  willDestroyElement() {
    this.tearDownSubscriptions(this.get('kalendae'));

    this._super(...arguments);
  },

  /**
   * Removes event callbacks previously registered with Kalendae
   *
   * @method tearDownSubscriptions
   * @param Object kalendae Kalendae instance
   */
  tearDownSubscriptions(kalendae) {
    kalendae.unsubscribe('date-clicked', this.didDateClicked.bind(this));
    kalendae.unsubscribe('change', this.didChange.bind(this));
  }
});
