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

    const header = template.querySelector('.card-content');
    this._iconFire = header.children[1];
    this._iconCloud = header.children[2];

    this._client.on('status', status => this._statusChange(status));
    this._turnOn.addEventListener('click', e => this.toggleTurnOn(e));
  }

  get temperature() {
    return this._temperatures.find(temperature => temperature.checked).value;
  }

  set temperature(value) {
    const input = this._temperatures.find(temperature => temperature.value === value);
    if (input)
      input.checked = true;
  }

  get isOn() {
    return this._turnOn.checked;
  }

  set _isOn(value) {
    this._turnOn.checked = value;
    this._iconFire.innerText = value ? 'whatshot' : '';
    this.disabled = this.disabled;
  }

  get isConnected() {
    return this._iconCloud.innerText === 'cloud';
  }

  set _isConnected(value) {
    this._iconCloud.innerText = value ? 'cloud' : 'cloud_off';
  }

  get time() {
    return parseInt(this._time.value, 10);
  }

  set time(value) {
    this._time.value = value;
  }

  get disabled() {
    return this.isOn;
  }

  set disabled(value) {
    this._temperatures.forEach(input => { input.disabled = value; });
    this._time.disabled = value;
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

  _statusChange(status) {
    this._isOn = status.isOn;
    this.temperature = status.temperature;

    if (status.minutes)
      this.time = status.minutes;
  }
};
