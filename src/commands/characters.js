const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('characters')
        .setDescription('View characters associated with current Discord account.'),
    async execute(db, interaction) {
        try {
            const name = interaction.user.tag;
            const iconURL = interaction.user.displayAvatarURL();
            const charactersEmbed = new MessageEmbed()
                .setColor('#9900aa')
                .setTitle('List of characters:')
                .setAuthor({ name: name, iconURL: iconURL });

            const account_id = interaction.user.id;
            const chars = await db.models.Character.findAll({
                attributes: ['name', 'class', 'ilvl'],
                where: { account_id: account_id }
            });

            chars.forEach(character => {
                charactersEmbed.addFields({
                    name: `${character.name}`,
                    value: `ilvl: ${character.ilvl}
                class: ${character.class}`,
                    inline: true
                });
            });

            await interaction.reply({ embeds: [charactersEmbed], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong fetching characters.', ephemeral: true });
        }
    },
}
