const {EventEmitter} = require('events');

/* Base code */
class MusicPlayer extends EventEmitter {
    constructor(device) {
        super();
        setMusicListeners(this);
        this.playing = false;
        this.musicalDevice = device;
    }

    emit(eventName, data) {
        const events = this.eventNames()
        if (events.includes(eventName)) {
            return super.emit(eventName, data)
        } else {
            this.emit('error', `NO SUCH EVENT: ${eventName}`);
        }
        ;
    }
}

const audioDevice = {
    play: (song) => {
        console.log(`Devise started playing: ${song}`)
    },
    stop: (reason) => {
        console.log('Devise stopped playing.', reason ? `Reason: ${reason}` : '');
    }
}
const playSong = function (song) {
    this.playing = true;
    this.musicalDevice.play(song)
}
const setMusicListeners = function name(that) {
    /* Node event on adding listeners "newListener"*/
    that.on('newListener', (listener) => console.log(`Listener ADDED: ${listener}`));
    that.on('play', playSong) /* arguments are passed silently to play song, cool */
    that.on('stop', function () {
        this.playing = false;
        this.musicalDevice.stop()
    })
    that.on('play', () => console.log('MUSIC STARTED. And some other functionality...'))
    that.once('play', () => console.log(`Event triggered only once. First song played on ${new Date()}`))
    that.on('error', function (error) {
        console.log(`Something went wrong. Error: ${error}`);
        this.musicalDevice.stop(`Error appears. ${error}`)
    })
}
const player = new MusicPlayer(audioDevice)

/* Firing events */
player.emit('play', 'AC/DC - Let there be rock!')
player.emit('play', 'AC/DC - Shoot down in flames!')
console.log(player._events['play']);
console.log(`Listeners of 'play' event:`, player.listeners('play'));
player.removeListener('play', playSong); /* To remove listener */
player.emit('stop')
player.emit('error', new Error('HA-HA'));
player.emit('NOT_EXISTING_EVENT', 'Some data');
