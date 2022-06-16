const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {createEmbed} = require("../../../Utils/Functions");
const config = require("../../../../Config");
module.exports = {
    name: "cancel",
    ignoreFile: true,
    run: async(client, interaction, container, mongo) => {
        await interaction.deferReply({ ephemeral: true })
        let user = interaction.options.getUser("user");
        let data = await mongo.findOne({ _id: user.id })
        if(!data) return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("User doesn't' have an active invite!") ] });
        if(data.status === "Accepted") return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("User has already accepted the invitation")]})
        await mongo.deleteOne({ _id: user.id })
        let msgs = await user.createDM()
        await msgs.messages.delete(data.msgId)
        interaction.editReply({ content: "Cancelled invite" })
    }
}