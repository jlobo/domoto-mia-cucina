const io = require('socket.io-client');
const EventEmitter = require('events');

module.exports = class StoveClient extends EventEmitter {
  constructor(url = 'http://mia-cucina.herokuapp.com') {
    super();

    this.url = url;
    this.socket = io(url);
    this.socket.on('status', response => this.emit('status', response));
    this.socket.on('toggleOnOff', isOn => this.emit('toggleOnOf', isOn));
    this.socket.on('connect', (uno, dos, tres) => this.emit('connect', uno, dos, tres));
  }

  turnOn(data) {
    return $.ajax({
      url: this._getUrl('/api/turnOn'),
      method: 'POST',
      data: data,
      dataType: 'json',
    });
  }

  turnOff() {
    return $.ajax({
      url: this._getUrl('/api/turnOff'),
      method: 'POST',
      dataType: 'json',
    });
  }

  status() {
    return $.getJSON(this._getUrl('/api/status'));
  }

  _getUrl(path) {
    return `${this.url}${path}`;
  }
};
