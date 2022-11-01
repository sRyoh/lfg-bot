const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Account', {
        account_id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true,
        },
        message: { type: Sequelize.TEXT },
    }, { timestamps: false });
};