const io = require('socket.io-client');

module.exports = class StoveClient {
  constructor(url = 'http://mia-cucina.herokuapp.com') {
    this.url = url;
    this._socket = io(url);
  }

  on(event, listener) {
    this._socket.on(event, listener);
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
