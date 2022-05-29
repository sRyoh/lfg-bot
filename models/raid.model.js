const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Raid', {
        raid_id: {
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        disc_id: { type: Sequelize.STRING },
        message: { type: Sequelize.TEXT },
        // num_supp: { type: Sequelize.INTEGER },
        // num_dps: { type: Sequelize.INTEGER },
    }, { timestamps: false });
}; 