const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {getData} = require("../Utils/Functions");

module.exports = {
    name: "interactionCreate",
    customEvent: false,
    run: async (interaction, client, container) => {
        if (!interaction.isButton()) return;
        let cmdName = interaction.customId;
        if (cmdName === "dog" || cmdName === "cat") {
            /* Reloads config */
            delete require.cache[require.resolve('../../Config')]
            let config = require('../../Config')

            let data = await getData("https://some-random-api.ml/animal/" + cmdName)
            let embed = new MessageEmbed()
                .setColor(config.pictureEmbed.color)
                .setImage(data.image);
            if (config.pictureEmbed.showTimestamp) embed.setTimestamp();
            if (config.showFact) embed.setTitle(data.fact)

            let row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("dog")
                    .setStyle("PRIMARY")
                    .setLabel("Generate a new dog image"),
                new MessageButton()
                    .setCustomId("cat")
                    .setStyle("PRIMARY")
                    .setLabel("Generate a new cat image")
            )

            if (config.pictureEmbed.ephemeral) interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
            else interaction.reply({ embeds: [embed], components: [row] })
        }
    }
}