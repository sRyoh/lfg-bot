const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('RaidMember', {
        rm_id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        role: { type: Sequelize.STRING },
    }, { timestamps: false });
};