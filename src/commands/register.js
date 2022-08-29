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
            const disc_id = interaction.user.id;
            const name = interaction.options.getString('character-name');
            const _class = interaction.options.getString('class');
            const ilvl = interaction.options.getInteger('ilvl');
            const character = await db.models.Character.findOne({ where: { name: name, disc_id: disc_id } });

            if (character) {
                await db.models.Character.update({ class: _class, ilvl: ilvl }, { where: { name: name, disc_id: disc_id } });
                await interaction.reply({ content: 'Successfully edited character.', ephemeral: true });
            } else {
                const account = await db.models.Account.findOne({ where: { disc_id: disc_id } });

                // Create an account within database if the discord user does not already have one
                if (!account) await db.models.Account.create({ disc_id: disc_id });

                await db.models.Character.create({ disc_id: disc_id, name: name, class: _class, ilvl: ilvl });
                await interaction.reply({ content: 'Successfully added character.', ephemeral: true });
            }
        }
        catch (error) {
            console.log(error);
            return interaction.reply({ content: 'Something went wrong with adding/editing a character.', ephemeral: true });
        }
    },
};