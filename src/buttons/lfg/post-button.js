
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'post-button',
    },
    async execute(db, interaction) {
        const embed = new MessageEmbed()
            .setColor('#0399af')
            .setTitle('Lobby')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setDescription('Lobby for X raid')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setImage('https://i.imgur.com/AfFp7pu.png')

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('join-button')
                    .setLabel('Join')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('leave-button')
                    .setLabel('Leave')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('kick-button')
                    .setLabel('Kick')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('delete-button')
                    .setLabel('Delete')
                    .setStyle('PRIMARY'),
            );

        try {
            // msg is used as future interactions will be based off of the msg's id
            const msg = await interaction.channel.send({ embeds: [embed], components: [buttons], ephemeral: true });

            const raid_id = msg.id;
            const disc_id = interaction.user.id;
            const account = await db.models.Account.findOne({
                attributes: ['message'],
                where: { disc_id: disc_id }
            });

            embed.addFields({
                name: 'Info',
                value: account.message
            });

            await db.models.Raid.create({ raid_id: raid_id, disc_id: disc_id, message: account.message });
            interaction.update({ content: "Successfully posted your lobby.", embeds: [], components: [], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with posting the LFG lobby.' })
        }
    },
};