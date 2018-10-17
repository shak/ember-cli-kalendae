import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TriggerEvent from '../../helpers/ember-kalendae/trigger-event';

module('Integration | Component | ember kalendae', function(hooks) {
  setupRenderingTest(hooks);

  test('it allows block usage', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#ember-kalendae}}
        template block text
      {{/ember-kalendae}}
    `);
    assert.ok(find('*').textContent.trim().indexOf('template block text') >= 0);
  });

  test('it initialises correctly without any config', async function(assert) {
    assert.expect(1);

    this.set('kalendae', null);
    await render(hbs`{{ember-kalendae instanceAPI=(action (mut kalendae))}}`);

    // it should initialise to today
    assert.equal(
      this.get('kalendae').getSelected(),
      new Date().toISOString().slice(0,10)
    );
  });

  test('it triggers date changed event correctly and passes the selected date through', async function(assert) {
    assert.expect(1);

    this.set('onDateClicked', (date) => {
      const expected = this.$().find('.k-active:first').data('date');
      assert.equal(
        date.format('YYYY-MM-DD'),
        expected
      );
    });

    await render(hbs`{{ember-kalendae onDateClicked=(action onDateClicked)}}`);
    TriggerEvent(this.$().find('.k-active:first')[0], 'mousedown');
  });

  test('it triggers changed event correctly and passes the selected date through', async function(assert) {
    assert.expect(1);

    this.set('onDidChange', (date) => {
      const expected = this.$().find('.k-active:first').data('date');

      assert.equal(
        date.format('YYYY-MM-DD'),
        expected
      );
    });

    await render(hbs`{{ember-kalendae onDidChange=(action onDidChange)}}`);
    TriggerEvent(this.$().find('.k-active:first')[0], 'mousedown');
  });

  test('it triggers changed event correctly and passes all the selected dates through', async function(assert) {
    assert.expect(2);

    this.set('onDidChange', (date, raw) => {
      if (raw.length > 1) {
        assert.equal(
          raw[0].format('YYYY-MM-DD'),
          this.$().find('.k-active:first').data('date')
        );

        assert.equal(
          raw[1].format('YYYY-MM-DD'),
          new Date().toISOString().slice(0,10)
        );
      }
    });

    await render(hbs`{{ember-kalendae mode='range' onDidChange=(action onDidChange)}}`);
    TriggerEvent(this.$().find('.k-active:first')[0], 'mousedown');
  });

  test('it triggers view changed event correctly and passes new view through', async function(assert) {
    assert.expect(1);

    this.set('onDidViewChanged', (view) => {
      assert.equal(
        view,
        'next-month'
      );
    });

    await render(hbs`{{ember-kalendae onDidViewChanged=(action onDidViewChanged)}}`);
    TriggerEvent(this.$().find('.k-btn-next-month')[0], 'mousedown');
  });

  test('it passes mode through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('mode', 'range');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        mode=mode
      }}`);

    assert.equal(
      this.get('kalendae').settings.mode,
      this.get('mode')
    );
  });

  test('it passes months through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('months', '2');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        months=months
      }}`);

    assert.equal(
      this.get('kalendae').settings.months,
      this.get('months')
    );
  });

  test('it passes weekStart through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('weekStart', '2');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        weekStart=weekStart
      }}`);

    assert.equal(
      this.get('kalendae').settings.weekStart,
      this.get('weekStart')
    );
  });

  test('it passes direction through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('direction', 'past');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        direction=direction
      }}`);

    assert.equal(
      this.get('kalendae').settings.direction,
      this.get('direction')
    );
  });

  test('it passes directionScrolling through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('directionScrolling', false);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        directionScrolling=directionScrolling
      }}`);

    assert.equal(
      this.get('kalendae').settings.directionScrolling,
      this.get('directionScrolling')
    );
  });

  test('it passes blackout through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('blackout', '20170725T132629Z');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        blackout=blackout
      }}`);

    assert.equal(
      this.get('kalendae').settings.blackout,
      this.get('blackout')
    );
  });

  test('it passes viewStartDate through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('viewStartDate', '20170725T132629Z');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        viewStartDate=viewStartDate
      }}`);

    assert.equal(
      this.get('kalendae').settings.viewStartDate,
      this.get('viewStartDate')
    );
  });

  test('it passes dateClassMap through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('dateClassMap', { foo: 'bar' });

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        dateClassMap=dateClassMap
      }}`);

    assert.deepEqual(
      this.get('kalendae').settings.dateClassMap,
      this.get('dateClassMap')
    );
  });

  test('it passes dayOutOfMonthClickable through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('dayOutOfMonthClickable', true);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        dayOutOfMonthClickable=dayOutOfMonthClickable
      }}`);

    assert.equal(
      this.get('kalendae').settings.dayOutOfMonthClickable,
      this.get('dayOutOfMonthClickable')
    );
  });

  test('it passes dayHeaderClickable through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('dayHeaderClickable', true);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        dayHeaderClickable=dayHeaderClickable
      }}`);

    assert.equal(
      this.get('kalendae').settings.dayHeaderClickable,
      this.get('dayHeaderClickable')
    );
  });

  test('it passes useYearNav through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('useYearNav', false);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        useYearNav=useYearNav
      }}`);

    assert.equal(
      this.get('kalendae').settings.useYearNav,
      this.get('useYearNav')
    );
  });

  test('it passes side through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('side', 'top');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        side=side
      }}`);

    assert.equal(
      this.get('kalendae').settings.side,
      this.get('side')
    );
  });

  test('it passes columnHeaderFormat through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('columnHeaderFormat', 'd');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        columnHeaderFormat=columnHeaderFormat
      }}`);

    assert.equal(
      this.get('kalendae').settings.columnHeaderFormat,
      this.get('columnHeaderFormat')
    );
  });

  test('it passes titleFormat through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('titleFormat', 'MMMM');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        titleFormat=titleFormat
      }}`);

    assert.equal(
      this.get('kalendae').settings.titleFormat,
      this.get('titleFormat')
    );
  });

  test('it passes dayNumberFormat through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('dayNumberFormat', 'MMMM');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        dayNumberFormat=dayNumberFormat
      }}`);

    assert.equal(
      this.get('kalendae').settings.dayNumberFormat,
      this.get('dayNumberFormat')
    );
  });

  test('it passes dayAttributeFormat through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('dayAttributeFormat', 'MMMM');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        dayAttributeFormat=dayAttributeFormat
      }}`);

    assert.equal(
      this.get('kalendae').settings.dayAttributeFormat,
      this.get('dayAttributeFormat')
    );
  });

  test('it passes parseSplitDelimiter through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('parseSplitDelimiter', null);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        parseSplitDelimiter=parseSplitDelimiter
      }}`);

    assert.equal(
      this.get('kalendae').settings.parseSplitDelimiter,
      this.get('parseSplitDelimiter')
    );
  });

  test('it passes rangeDelimiter through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('rangeDelimiter', '-');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        rangeDelimiter=rangeDelimiter
      }}`);

    assert.equal(
      this.get('kalendae').settings.rangeDelimiter,
      this.get('rangeDelimiter')
    );
  });

  test('it passes multipleDelimiter through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('multipleDelimiter', ',');

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        multipleDelimiter=multipleDelimiter
      }}`);

    assert.equal(
      this.get('kalendae').settings.multipleDelimiter,
      this.get('multipleDelimiter')
    );
  });

  test('it passes selected through to kalendae correctly', async function(assert) {
    assert.expect(1);

    this.set('selected', null);

    await render(hbs`
      {{ember-kalendae
        instanceAPI=(action (mut kalendae))
        selected=selected
      }}`);

    assert.equal(
      this.get('kalendae').settings.selected,
      this.get('selected')
    );
  });
});




