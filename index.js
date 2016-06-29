const ImportTemplate = require('domoto/importTemplate');
const StoveController = require('./stoveController');
const ItemMenu = require('domoto/itemMenu');
const EventEmitter = require('events');
const path = require('path');

module.exports = class installView extends EventEmitter {
  constructor() {
    super();

    this.controller = null;
    this.body = new ImportTemplate(path.resolve(__dirname, './view.html'));
    this.itemMenu = new ItemMenu('domoto-mia-cucina').setHeader('Mia cucina', {left: 'power_settings_new'});

    this.body.on('load', element => this._init(element));
  }

  _init() {
    this.controller = new StoveController(ImportTemplate);
    this.emit('ready', this);
  }
};
