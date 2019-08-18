const { EventEmitter } = require('events');

function operation() {
  const event = new EventEmitter();
  process.nextTick(() => event.emit('MyEvent'));
  return event;
}

operation().on('MyEvent', () => console.log('Event emitted'));

/*The EventEmitter class is an implementation of the observer pattern. A related pattern
is publish/subscribe, where publishers send messages that are characterized into
classes to subscribers without knowing the details of the subscribers themselves.
The publish/subscribe pattern is often useful in cases where horizontal scaling is
required. If you need to run multiple Node processes on multiple servers, then technologies
like AMQP and ØMQ can help implement this.*/

/*The observer pattern is a software design pattern in which an object, called the subject,
 maintains a list of its dependents, called observers,
 and notifies them automatically of any state changes, usually by calling one of their methods. */

/*In ‘Publisher-Subscriber’ pattern, senders of messages, called publishers,
 do not program the messages to be sent directly to specific receivers, called subscribers. */

/*
1. In the Observer pattern, the Observers are aware of the Subject,
also the Subject maintains a record of the Observers.
Whereas, in Publisher/Subscriber, publishers and subscribers don’t need to know each other.
They simply communicate with the help of message queues or broker or event channel
Publisher publish event to it, and subscriber listens for that event on channel, 
so there no direct connection between pub and sub - which is useful in some cases.

2. In Publisher/Subscriber pattern, components are loosely coupled as opposed to Observer pattern.

3. Observer pattern is mostly implemented in a synchronous way,
i.e. the Subject calls the appropriate method of all its observers when some event occurs.
The Publisher/Subscriber pattern is mostly implemented in an asynchronous way (using message queue).

4. Observer pattern needs to be implemented in a single application address space.
On the other hand, the Publisher/Subscriber pattern is more of a cross-application pattern. */