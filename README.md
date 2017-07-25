# ember-cli-kalendae 

[![Build Status](https://travis-ci.org/shak/ember-cli-kalendae.svg?branch=master)](https://travis-ci.org/shak/ember-cli-kalendae)

Ember CLI wrpper for the excellent [Kalendae JS Datepicker](https://github.com/ChiperSoft/Kalendae).

## Setup

This component allows build config to be set under `ember-cli-build`

```javascript
// in ember-cli-build
let app = new EmberAddon(defaults, {
  ...
  emberCLIKalendae: {
    includeKalendae: true,
    includeMoment: true,
    useStandalone: false
  }
});
```

* `includeKalendae`

  This addon will attempt to install Kalendae to vendor unless told otherwise. To disable addon from adding Kalendae to your vendor i.e. when you already have Kalendae installed in your app and you don't want a duplicate, set `includeKalendae` to false.

  By default `includeKalendae` is set to `true`

* `includeMoment`

  Kalendae has dependency on `moment.js`. If you already have `moment.js` globally available then set `includeMoment` to `false` to prevent moment being imported to vendor.

  By default `includeMoment` is set to `true`

* `useStandalone`

  Finally, Kalendae ships with a standalone version which includes `moment.js`, to use standalone version, set `useStandalone` to `true`.

  By default `useStandalone` is set to `false`

## Usage

### Options

This component supports all basic options [currently being offered by Kalendae](https://github.com/ChiperSoft/Kalendae#options).

It also supports [all advance config options currently being offered by Kalendae](https://github.com/ChiperSoft/Kalendae#advanced-behavior-options)

```hbs
{{ember-cli-kalendae mode="range" months=2}}
```

Will set the mode to `range` and display `2` calendar panes for months.

### Events

This component exposes all standard [Kalendae events](https://github.com/ChiperSoft/Kalendae#kalendae-events) as Ember actions.

* `onDidChange`
  
  Triggered by Kalendae `change` event. The action is passed the following args:
  
  * dateLastClicked (moment)
  * selectedDates (Array)

* `onDateClicked`

  Triggered by Kalendae `date-clicked` event. The action is passed the following args:
  
  * dateLastClicked (moment)

* `onDidViewChanged`

  Triggered by Kalendae `view-changed` event. The action is passed the following args:
  
   * clickedButtonLabel (String)

For example:

```hbs
{{ember-cli-kalendae onDateClicked=(action 'onDateClicked')}}
```

```javascript
// controller
actions: {
  onDateClicked(date, range) {
    //
  }
}
```

### Kalendae instance

Kalendae instance can be retrieved programmitcally using jQuery by:

```javascript
$(selector).data('kalendae')
```

The component also allows the parent access to kalendae instance through instanceAPI.

```hbs
{{ember-cli-kalendae instanceAPI=(action (mut kalendae))}}
```

The controller will now get access to kalendae access on `kalendae` property.

The component also yields kalendae instance i.e.:

```hbs
{{#ember-cli-kalendae as |kalendae|}}
  ...
{{/ember-cli-kalendae}}
```

## License

ember-cli-kalendae is released under an MIT license and is freely distributable.
