module.exports = class StoveClient {
  constructor(client) {
    this.client = client;
    this.send = this.client.send.bind(this.client);
    this.emit = this.client.emit.bind(this.client);
    this.on = this.client.on.bind(this.client);
  }

  get name() {
    return this.client.name;
  }

  get url() {
    return this.client.url;
  }

  turnOn(data) {
    return this.send({
      url: '/api/turnOn',
      method: 'POST',
      data: data,
    });
  }

  turnOff() {
    return this.send({
      url: '/api/turnOff',
      method: 'POST',
    });
  }

  status() {
    return this.send({ url: '/api/status' });
  }
};
