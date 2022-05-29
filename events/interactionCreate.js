module.exports = {
    name: "interactionCreate",
    async execute(db, interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an ${interaction.type}.`);

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(db, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}