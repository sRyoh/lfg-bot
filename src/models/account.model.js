const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Account', {
        disc_id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true,
        },
        message: { type: Sequelize.TEXT },
    }, { timestamps: false });
};