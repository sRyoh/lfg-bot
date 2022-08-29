const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    data: {
        name: 'join-button',
    },
    async execute(db, interaction) {
        console.log(interaction.message.id);

        const selectMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select-char-menu')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Join with no character',
                            description: 'All values will be shown as none',
                            value: 'none'
                        }
                    ])
            );

        const chars = await db.models.Character.findAll({
            attributes: ['char_id', 'name', 'class', 'ilvl'],
            where: { disc_id: interaction.user.id }
        });

        chars.forEach(character => {
            selectMenu.components[0].addOptions([
                {
                    label: `${character.name}`,
                    description: `${character.class} - ${character.ilvl}`,
                    value: `${character.char_id}`
                }
            ]);
        });

        try {
            await interaction.reply({ content: ' ', components: [selectMenu], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.repy({ content: 'Something went wrong with joining the lobby.', ephemeral: true });
        }
    },
};