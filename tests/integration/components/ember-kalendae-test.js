import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-kalendae', 'Integration | Component | ember kalendae', {
  integration: true
});

test('it allows block usage', function(assert) {
  this.render(hbs`
    {{#ember-kalendae}}
      template block text
    {{/ember-kalendae}}
  `);
  assert.ok(this.$().text().trim().indexOf('template block text') >= 0);
});
