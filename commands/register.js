const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register/update a character for LFG lobbies.')
        .addStringOption(option =>
            option.setName('character-name')
                .setDescription('name of character')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('class')
                .setDescription('class of character')
                .setRequired(true)
                .addChoices(
                    { name: 'Berserker', value: 'Berserker' },
                    { name: 'Paladin', value: 'Paladin' },
                    { name: 'Gunlancer', value: 'Gunlancer' },
                    { name: 'Destroyer', value: 'Destroyer' },
                    { name: 'Striker', value: 'Striker' },
                    { name: 'Wardancer', value: 'Wardancer' },
                    { name: 'Scrapper', value: 'Scrapper' },
                    { name: 'Soulfist', value: 'Soulfist' },
                    { name: 'Glaivier', value: 'Glaivier' },
                    { name: 'Gunslinger', value: 'Gunslinger' },
                    { name: 'Artillerist', value: 'Artillerist' },
                    { name: 'Deadeye', value: 'Deadeye' },
                    { name: 'Sharpshooter', value: 'Sharpshooter' },
                    { name: 'Bard', value: 'Bard' },
                    { name: 'Sorceress', value: 'Sorceress' },
                    { name: 'Shadowhunter', value: 'Shadowhunter' },
                    { name: 'Deathblade', value: 'Deathblade' },
                ))
        .addIntegerOption(option =>
            option.setName('ilvl')
                .setDescription('item level of character')
                .setRequired(true)),
    async execute(db, interaction) {
        try {
            db.models.Character.create({
                disc_id: interaction.user.id,
                name: interaction.options.getString('character-name'),
                class: interaction.options.getString('class'),
                ilvl: interaction.options.getInteger('ilvl')
            });
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply({ content: 'That tag already exists.', ephemeral: true });
            }

            return interaction.reply({ content: 'Something went wrong with adding a tag.', ephemeral: true });
        }

        interaction.reply({ content: 'Successfully added character.', ephemeral: true });
    },
};