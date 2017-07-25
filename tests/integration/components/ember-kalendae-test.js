import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-kalendae', 'Integration | Component | ember kalendae', {
  integration: true
});

// taken from http://jsfiddle.net/mendesjuan/rHMCy/4/
const fireEvent = function(node, eventName) {
   if (node.dispatchEvent) {
    // Gecko-style approach (now the standard) takes more work
    let eventClass = "";

    // Different events have different event classes.
    // If this switch statement can't map an eventName to an eventClass,
    // the event firing is going to fail.
    switch (eventName) {
      case 'click': // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
      case 'mousedown':
      case 'mouseup':
        eventClass = 'MouseEvents';
        break;

      case 'focus':
      case 'change':
      case 'blur':
      case 'select':
        eventClass = 'HTMLEvents';
        break;

      default:
        throw `fireEvent: Couldn't find an event class for event '${eventName}.`;
    }
    var event = node.ownerDocument.createEvent(eventClass);
    event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.
    event.synthetic = true; // allow detection of synthetic events
    // The second parameter says go ahead with the default action
    node.dispatchEvent(event, true);
  }
};

test('it allows block usage', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#ember-kalendae}}
      template block text
    {{/ember-kalendae}}
  `);
  assert.ok(this.$().text().trim().indexOf('template block text') >= 0);
});

test('it initialises correctly without any config', function(assert) {
  assert.expect(1);

  this.set('kalendae', null);
  this.render(hbs`{{ember-kalendae instanceAPI=(action (mut kalendae))}}`);

  // it should initialise to today
  assert.equal(
    this.get('kalendae').getSelected(),
    new Date().toISOString().slice(0,10)
  );
});

test('it triggers date changed event correctly and passes the selected date through', function(assert) {
  assert.expect(1);

  this.set('onDateClicked', (date) => {
    const expected = this.$().find('.k-active:first').data('date');
    assert.equal(
      date.format('YYYY-MM-DD'),
      expected
    );
  });

  this.render(hbs`{{ember-kalendae onDateClicked=(action onDateClicked)}}`);
  fireEvent(this.$().find('.k-active:first')[0], 'mousedown');
});

test('it passes mode through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('mode', 'range');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      mode=mode
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.mode,
    this.get('mode')
  );
});

test('it passes months through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('months', '2');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      months=months
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.months,
    this.get('months')
  );
});

test('it passes weekStart through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('weekStart', '2');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      weekStart=weekStart
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.weekStart,
    this.get('weekStart')
  );
});

test('it passes direction through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('direction', 'past');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      direction=direction
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.direction,
    this.get('direction')
  );
});

test('it passes directionScrolling through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('directionScrolling', false);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      directionScrolling=directionScrolling
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.directionScrolling,
    this.get('directionScrolling')
  );
});

test('it passes blackout through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('blackout', '20170725T132629Z');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      blackout=blackout
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.blackout,
    this.get('blackout')
  );
});

test('it passes viewStartDate through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('viewStartDate', '20170725T132629Z');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      viewStartDate=viewStartDate
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.viewStartDate,
    this.get('viewStartDate')
  );
});

test('it passes dateClassMap through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('dateClassMap', { foo: 'bar' });

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      dateClassMap=dateClassMap
    }}`
  );

  assert.deepEqual(
    this.get('kalendae').settings.dateClassMap,
    this.get('dateClassMap')
  );
});

test('it passes dayOutOfMonthClickable through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('dayOutOfMonthClickable', true);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      dayOutOfMonthClickable=dayOutOfMonthClickable
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.dayOutOfMonthClickable,
    this.get('dayOutOfMonthClickable')
  );
});

test('it passes dayHeaderClickable through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('dayHeaderClickable', true);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      dayHeaderClickable=dayHeaderClickable
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.dayHeaderClickable,
    this.get('dayHeaderClickable')
  );
});

test('it passes useYearNav through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('useYearNav', false);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      useYearNav=useYearNav
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.useYearNav,
    this.get('useYearNav')
  );
});

test('it passes side through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('side', 'top');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      side=side
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.side,
    this.get('side')
  );
});

test('it passes columnHeaderFormat through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('columnHeaderFormat', 'd');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      columnHeaderFormat=columnHeaderFormat
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.columnHeaderFormat,
    this.get('columnHeaderFormat')
  );
});

test('it passes titleFormat through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('titleFormat', 'MMMM');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      titleFormat=titleFormat
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.titleFormat,
    this.get('titleFormat')
  );
});

test('it passes dayNumberFormat through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('dayNumberFormat', 'MMMM');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      dayNumberFormat=dayNumberFormat
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.dayNumberFormat,
    this.get('dayNumberFormat')
  );
});

test('it passes dayAttributeFormat through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('dayAttributeFormat', 'MMMM');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      dayAttributeFormat=dayAttributeFormat
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.dayAttributeFormat,
    this.get('dayAttributeFormat')
  );
});

test('it passes parseSplitDelimiter through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('parseSplitDelimiter', null);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      parseSplitDelimiter=parseSplitDelimiter
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.parseSplitDelimiter,
    this.get('parseSplitDelimiter')
  );
});

test('it passes rangeDelimiter through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('rangeDelimiter', '-');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      rangeDelimiter=rangeDelimiter
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.rangeDelimiter,
    this.get('rangeDelimiter')
  );
});

test('it passes multipleDelimiter through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('multipleDelimiter', ',');

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      multipleDelimiter=multipleDelimiter
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.multipleDelimiter,
    this.get('multipleDelimiter')
  );
});

test('it passes selected through to kalendae correctly', function(assert) {
  assert.expect(1);

  this.set('selected', null);

  this.render(hbs`
    {{ember-kalendae
      instanceAPI=(action (mut kalendae))
      selected=selected
    }}`
  );

  assert.equal(
    this.get('kalendae').settings.selected,
    this.get('selected')
  );
});




