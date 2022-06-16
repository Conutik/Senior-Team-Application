const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {createEmbed} = require("../../../Utils/Functions");
const get = require('lodash.get');
module.exports = {
    name: "send",
    ignoreFile: true,
    run: async(client, interaction, container, mongo) => {
        /* Reloads config */
        delete require.cache[require.resolve('../../../../Config')]
        let config = require('../../../../Config')
        await interaction.deferReply({ ephemeral: true })
        let user = interaction.options.getUser("user");
        let data = await mongo.findOne({ _id: user.id })
        if(data && data.acceptedInvite) return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("User has already accepted an invite!") ] })
        if(data) return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("User has already been sent an invite!") ] })
        let message = config.invitationEmbed.body;
        message = message.split(" ")
        let newMessage = [];
        message.forEach(m => {
            if(m.includes("{") && m.includes("}")) {
                let ms = m.replaceAll("{", "")
                ms = ms.replaceAll("}", "")
                let variable = get(interaction, ms)
                if(variable) newMessage.push(variable)
                else newMessage.push(m)
            } else {
                newMessage.push(m)
            }
        })
        config.invitationEmbed.body = newMessage.join(" ")
        let embed = await createEmbed(config.invitationEmbed)
        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("accept")
                .setStyle("SUCCESS")
                .setLabel("Accept"),
            new MessageButton()
                .setCustomId("deny")
                .setStyle("DANGER")
                .setLabel("Deny")
        )
        let ms = await user.send({ embeds: [embed], components: [row] }).catch(e => {
            return interaction.editReply({ embeds: [ new MessageEmbed().setColor("RED").setTitle("ERROR").setDescription("Cannot send user a message") ] })
        })
        await mongo.updateOne({ _id: user.id }, { $set: { msgId: ms.id, acceptedInvite: false, status: "Waiting" } }, { upsert: true })
        interaction.editReply({ content: "Sent an invite!" })
    }
}