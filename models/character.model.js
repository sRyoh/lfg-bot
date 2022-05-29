const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Character', {
        char_id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        disc_id: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        class: { type: Sequelize.STRING },
        ilvl: { type: Sequelize.INTEGER },
    }, { timestamps: false });
};
