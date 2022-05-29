module.exports = function applyExtraSetup(sequelize) {
    const { Character, Raid, RaidMember } = sequelize.models;

    Raid.hasMany(RaidMember, {
        foreignKey: 'raid_id',
    });

    Character.hasMany(RaidMember, {
        foreignKey: 'char_id',
    });
}