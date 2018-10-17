import isFunction from 'dummy/utils/is-function';
import { module, test } from 'qunit';

module('Unit | Utility | is function', function() {
  test('it works as expected', function(assert) {
    let result = isFunction(function() {});
    assert.ok(result);

    result = isFunction(undefined);
    assert.strictEqual(result, false);
  });
});
