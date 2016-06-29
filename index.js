const ImportTemplate = require('domoto/importTemplate');
const StoveClient = require('./stoveClient');
const ItemMenu = require('domoto/itemMenu');
const EventEmitter = require('events');
const path = require('path');

module.exports = class installView extends EventEmitter {
  constructor() {
    super();

    this._time = null;
    this._turnOn = null;
    this._temperatures = null;
    this.client = new StoveClient();
    this.body = new ImportTemplate(path.resolve(__dirname, './view.html'));
    this.itemMenu = new ItemMenu('domoto-mia-cucina').setHeader('Mia cucina', {left: 'power_settings_new'});

    this.body.on('load', element => this._init(element));
  }

  get temperature() {
    return this._temperatures.find(temperature => temperature.checked).value;
  }

  get isOn() {
    return this._turnOn.checked;
  }

  get time() {
    return parseInt(this._time.value, 10);
  }

  turnOn() {
    if (!this.isOn)
      return this.client.turnOff();

    const status = { minutes: this.time, temperature: this.temperature };
    this.client.turnOn(status);
  }

  _init() {
    this._time = this.body.document.getElementById('tiempo');
    this._turnOn = this.body.document.getElementById('encender');
    this._temperatures = [this.body.document.getElementById('high'),
      this.body.document.getElementById('medium'),
      this.body.document.getElementById('low')];

    this._turnOn.addEventListener('click', e => this.turnOn(e));
    this.emit('ready', this);
  }
};
