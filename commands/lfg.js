const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create a LFG lobby.'),
    async execute(db, interaction) {
        const lfgEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to Kyoto Bot.')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setDescription('Choose from the list below which content you would like to open a recruitment lobby for.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setImage('https://i.imgur.com/AfFp7pu.png');

        const menu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Argos Raid',
                            // description: 'Min ilvl 1370',
                            value: 'argos',
                        },
                        {
                            label: 'Valtan Raid',
                            // description: 'Min ilvl 1415',
                            value: 'valtan',
                        },
                    ]),
            );

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('post')
                    .setLabel('Post')
                    .setStyle('PRIMARY'),
            );


        lfgEmbed.setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        const message = await interaction.reply({ embeds: [lfgEmbed], components: [menu], ephemeral: true, fetchReply: true });

        const selectMenuCollector = message.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });

        selectMenuCollector.on('collect', async smInteraction => {
            const buttonCollector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

            if (smInteraction.user.id === interaction.user.id && smInteraction.values[0] === 'valtan') {
                await smInteraction.update({ embeds: [lfgEmbed], components: [button], ephemeral: true });
            } else if (smInteraction.user.id === interaction.user.id && smInteraction.values[0] === 'argos') {
                await smInteraction.update({ embeds: [lfgEmbed], components: [button], ephemeral: true });
            }

            buttonCollector.on('collect', async buttonInteraction => {
                if (buttonInteraction.user.id === interaction.user.id && buttonInteraction.customId === 'post') {
                    interaction.channel.send('posted lfg lobby');
                    buttonInteraction.update({ content: "Successfully posted your lobby.", embeds: [], components: [], ephemeral: true });
                    buttonCollector.stop();
                    selectMenuCollector.stop();
                }
            });
        });
    },
};