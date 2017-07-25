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

  /**
   * @protected
   * @method init
   */
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
   * @private
   * @method buildSubscriptions
   * @param Object kalendae Kalendae instance
   */
  buildSubscriptions(kalendae) {
    kalendae.subscribe('change', this.didChange.bind(this));
    kalendae.subscribe('view-changed', this.didViewChanged.bind(this));
    kalendae.subscribe('date-clicked', this.didDateClicked.bind(this));
    this.pushInstanceAPI(kalendae);
  },

  /**
   * callback for `date-clicked` event
   *
   * @private
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
   * @private
   * @method didChange
   * @param Object date
   */
  didChange(date) {
    const onDidChange = this.get('onDidChange');

    if (typeOf(onDidChange) === 'function') {
      onDidChange(date, this.get('kalendae').getSelectedRaw());
    }
  },

  /**
   * callback for `view-changed` event
   *
   * @private
   * @method didViewChanged
   * @param Object date
   */
  didViewChanged(view) {
    const onDidViewChanged = this.get('onDidViewChanged');

    if (typeOf(onDidViewChanged) === 'function') {
      return onDidViewChanged(view);
    }
  },

  /**
   * Pushes current instance of kalendae thorough instance API
   *
   * @private
   * @method pushInstanceAPI
   * @param Object kalendae
   */
  pushInstanceAPI(kalendae) {
    const instanceAPI = this.get('instanceAPI');

    if (typeOf(instanceAPI) === 'function') {
      instanceAPI(kalendae);
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

    const instanceAPI = this.get('instanceAPI');

    if (typeOf(instanceAPI) === 'function') {
      instanceAPI(null);
    }
  },

  /**
   * Removes event callbacks previously registered with Kalendae
   *
   * @private
   * @method tearDownSubscriptions
   * @param Object kalendae Kalendae instance
   */
  tearDownSubscriptions(kalendae) {
    kalendae.unsubscribe('change', this.didChange.bind(this));
    kalendae.unsubscribe('view-changed', this.didViewChanged.bind(this));
    kalendae.unsubscribe('date-clicked', this.didDateClicked.bind(this));
  }
});
