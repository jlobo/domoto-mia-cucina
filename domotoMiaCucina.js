const Domoto = require('domoto');
const StoveController = require('./stoveController');
const templatePath = require('path').resolve(__dirname, './view.html');

module.exports = class DomotoMiaCucina extends Domoto {
  constructor() {
    super('domoto-mia-cucina', templatePath, StoveController);
  }

  get _itemMenuDescription() {
    return 'Mia cucina';
  }
};
