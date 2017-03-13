const Domoto = require('domoto');
const StoveController = require('./stoveController');
const viewPath = require('path').resolve(__dirname, './view.html');

module.exports = class DomotoMiaCucina extends Domoto {
  constructor() {
    super('domoto-mia-cucina');

    this.description = 'Mia cucina';
    const view = this.addView(viewPath, StoveController, this.itemMenu);
    this.itemMenu.on('click', this.viewManager.show(view));
  }
};
