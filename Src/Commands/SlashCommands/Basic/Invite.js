const {createEmbed, getData} = require("../../../Utils/Functions");
const config = require("../../../../Config");
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
    name: "invite",
    options: [{
        name: "send",
        description: "Send invite to user",
        type: "SUB_COMMAND",
        options: [{
            name: "user",
            type: "USER",
            description: "User to invite",
            required: true
        }]
    }, {
        name: "cancel",
        description: "Cancel an invite that was sent to a user",
        type: "SUB_COMMAND",
        options: [{
            name: "user",
            type: "USER",
            description: "User to revoke invite from",
            required: true
        }]
    }],
    description: "Invite user!",
    run: async (client, interaction, container) => {
        /* Reloads config */
        delete require.cache[require.resolve('../../../../Config')]
        let config = require('../../../../Config')
        let sub = interaction.options.getSubcommand()
        let mongo = await client.mongo.db(config.mongo.db).collection("invites")
        if (sub === "send") await require("../Subcommands/SendInvite").run(client, interaction, container, mongo)
        else if (sub === "cancel") await require("../Subcommands/CancelInvite").run(client, interaction, container, mongo)
    }
}