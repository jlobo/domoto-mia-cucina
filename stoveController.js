const StoveClient = require('./stoveClient');

module.exports = class StoveController {
  constructor(template) {
    this._client = new StoveClient();
    this._temperatures = null;
    this._time = template.getElementById('tiempo');
    this._turnOn = template.getElementById('encender');
    this._temperatures = [template.getElementById('high'),
      template.getElementById('medium'),
      template.getElementById('low')];

    this._turnOn.addEventListener('click', e => this.toggleTurnOn(e));
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
    this._client.turnOn({ minutes: this.time, temperature: this.temperature });
  }

  turnOff() {
    this._client.turnOff();
  }

  toggleTurnOn() {
    this.isOn ? this.turnOn() : this.turnOff();
  }
};
