const {EventEmitter} = require('events');

function operation() {
    const event = new EventEmitter();
    process.nextTick(() => event.emit('MyEvent'));
    return event;
}

operation().on('MyEvent', () => console.log('Event emitted'));
