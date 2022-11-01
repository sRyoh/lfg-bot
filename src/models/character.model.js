const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Character', {
        character_id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: Sequelize.STRING },
        class: { type: Sequelize.STRING },
        ilvl: { type: Sequelize.INTEGER },
    }, { timestamps: false });
};
