const Domoto = require('domoto');
const StoveClient = require('./stoveClient');
const StoveController = require('./stoveController');
const restFactory = require('domoto/restFactory').instance;
const viewPath = require('path').resolve(__dirname, './view.html');

module.exports = class DomotoMiaCucina extends Domoto {
  constructor() {
    super('domoto-mia-cucina');

    this.description = 'Mia cucina';
    const client = restFactory.create('stove', { url: 'http://mia-cucina.herokuapp.com', socket: '/' });
    const stove = new StoveClient(client);
    this.exportModule(stove);

    const view = this.addView(viewPath, StoveController, this.itemMenu, stove);
    this.itemMenu.on('click', this.viewManager.show(view));
  }
};
