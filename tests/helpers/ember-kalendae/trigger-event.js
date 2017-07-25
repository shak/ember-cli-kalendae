//taken from http://jsfiddle.net/mendesjuan/rHMCy/4/
export default function(node, eventName) {
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
}
