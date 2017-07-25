import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-kalendae', 'Integration | Component | ember kalendae', {
  integration: true
});

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
