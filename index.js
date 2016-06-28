const path = require('path');
const ImportTemplate = require('domoto/importTemplate');
const ItemMenu = require('domoto/itemMenu');
const EventEmitter = require('events');

module.exports = class installView extends EventEmitter {
  constructor() {
    super();

    this.itemMenu = new ItemMenu('domoto-mia-cucina').setHeader('Mia cucina', {left: 'power_settings_new'});
    this.body = new ImportTemplate(path.resolve(__dirname, './view.html'));
    this.body.on('load', element => this._init(element));
  }

  _init() {
    this.emit('ready', this);
  }
};
