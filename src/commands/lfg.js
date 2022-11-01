const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Create a LFG lobby.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('input custom message for the lobby')
                .setRequired(true)
        ),
    async execute(db, interaction) {
        try {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Welcome to LFG Bot.')
                // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                .setDescription('Choose from the list below which content you would like to open a recruitment lobby for.')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setImage('https://i.imgur.com/AfFp7pu.png');

            const message = interaction.options.getString('message');
            const selectMenu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select-lobby-menu')
                        .setPlaceholder('Nothing selected')
                        .addOptions([
                            {
                                label: 'Argos Raid',
                                // description: 'Min ilvl 1370',
                                value: `Argos ${message}`,
                            },
                            {
                                label: 'Valtan Raid',
                                // description: 'Min ilvl 1415',
                                value: `Valtan ${message}`,
                            },
                            {
                                label: 'Vykas Raid',
                                // description: 'Min ilvl 1430',
                                value: `Vykas ${message}`,
                            },
                        ]),
                );

            // Create an account within database if the discord user does not already have one
            const account_id = interaction.user.id;
            const account = await db.models.Account.findOne({ where: { account_id: account_id } });
            if (!account) await db.models.Account.create({ account_id: account_id });

            const name = interaction.user.tag;
            const iconURL = interaction.user.displayAvatarURL();
            embed.setAuthor({ name: name, iconURL: iconURL });
            await interaction.reply({ embeds: [embed], components: [selectMenu], ephemeral: true }); // fetchReply needed?
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with posting the lfg command.', ephemeral: true });
        }
    },
};