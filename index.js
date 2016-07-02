const ImportTemplate = require('domoto/importTemplate');
const StoveController = require('./stoveController');
const ItemMenu = require('domoto/itemMenu');
const EventEmitter = require('events');
const path = require('path');

module.exports = class installView extends EventEmitter {
  constructor() {
    super();

    this.controller = null;

    this.itemMenu = new ItemMenu('domoto-mia-cucina');
    this.itemMenu.description = 'Mia cucina';
    this.itemMenu.addLeftIcon('power_settings_new');
    this.itemMenu.setRemoveBody();

    this.body = new ImportTemplate(path.resolve(__dirname, './view.html'));
    this.body.on('load', element => this._init(element));
  }

  _init() {
    this.controller = new StoveController(this.body, this.itemMenu);
    this.emit('ready', this);
  }
};
