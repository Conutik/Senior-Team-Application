const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "accept",
    run: async(client, interaction, container) => {
        await interaction.deferReply()
        /* Reloads config */
        delete require.cache[require.resolve('../../../Config')]
        let config = require('../../../Config')
        let mongo = await client.mongo.db(config.mongo.db).collection("invites")
        let userData = await mongo.findOne({ _id: interaction.user.id })
        if(!userData) return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("Cannot find your data in the database.") ] });
        if(userData.acceptedInvite) return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("You have already accepted an invitation")]})
        let newEmbed = new MessageEmbed().setColor("GREEN").setTitle("ACCEPTED").setDescription("You have accepted the invitation congratulations!")
        interaction.editReply({ embeds: [ newEmbed ] })
        interaction.message.delete()
        client.channels.cache.get(config.invitationChannel).send({ embeds: [ new MessageEmbed().setColor("GREEN").setTitle("ACCEPTED").setDescription(`${interaction.user} has accepted his invitation. \nInvitation accepted at <t:${Math.floor(Date.now()/1000)}:F>`) ] })
        await mongo.updateOne({ _id: interaction.user.id }, { $set: { acceptedInvite: true, status: "Accepted", msgId: "", acceptedTime: Date.now() } })
    }
}