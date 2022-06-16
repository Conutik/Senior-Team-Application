const {createEmbed, getData} = require("../../../Utils/Functions");
const config = require("../../../../Config");
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
    name: "pic",
    options: [{
        name: "type",
        type: "STRING",
        description: "What gif to get",
        required: true,
        choices: [
            { name: "Dog", value: "dog"},
            { name: "Cat", value: "cat"}
        ]
    }],
    description: "Search for a random animal image!",
    run: async (client, interaction, container) => {
        /* Reloads config */
        delete require.cache[require.resolve('../../../../Config')]
        let config = require('../../../../Config')

        if(config.pictureEmbed.ephemeral) await interaction.deferReply({ephemeral: true})
        else await interaction.deferReply()

        let type = interaction.options.getString("type")

        let data = await getData("https://some-random-api.ml/animal/" + type)

        let embed = new MessageEmbed()
            .setColor(config.pictureEmbed.color)
            .setImage(data.image);
        if(config.pictureEmbed.showTimestamp) embed.setTimestamp();
        if(config.showFact) embed.setTitle(data.fact)

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
        interaction.editReply({ embeds: [embed], components: [row] })
    }
}