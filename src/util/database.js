const Sequelize = require('sequelize');
const { db_connection_url } = require('../../config.json');
const applyExtraSetup = require('./extra-setup');

const sequelize = new Sequelize(db_connection_url);

const modelDefiners = [
    require('../models/account.model'),
    require('../models/character.model'),
    require('../models/lobby-member.model'),
    require('../models/lobby.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
