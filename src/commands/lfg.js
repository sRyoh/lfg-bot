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
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to Kyoto Bot.')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setDescription('Choose from the list below which content you would like to open a recruitment lobby for.')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setImage('https://i.imgur.com/AfFp7pu.png');

        const selectMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select-raid-menu')
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

        try {
            const message = interaction.options.getString('message');
            const disc_id = interaction.user.id;
            const account = await db.models.Account.findOne({ where: { disc_id: disc_id } });

            // Create an account within database if the discord user does not already have one
            if (!account) await db.models.Account.create({ disc_id: disc_id });

            await db.models.Account.update({ message: message }, { where: { disc_id: disc_id } });

            embed.setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            await interaction.reply({ embeds: [embed], components: [selectMenu], ephemeral: true, fetchReply: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with posting the lfg command.', ephemeral: true });
        }
    },
};