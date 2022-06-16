module.exports = {
    /* Most values can be changed without restarting the bot! This won't work for token, activity, and mongo values */
    developers: [], // IDS of the bot owners.
    token: "", // Bot login token
    activity: "Beep Boop", // Bot's activity status
    mongo: {
        uri: "", // Mongo URI to connect to database
        db: "bot", // Database to use
    },
    invitationEmbed: { // Embed that will be sent when someone is invited
        title: "TEST",
        author: "Conutik Bot",
        authorImage: "https://cdn.discordapp.com/attachments/924376718528090212/952632415044644924/Aiko.png",
        color: "#5655ff",
        image: "https://cdn.discordapp.com/attachments/924376718528090212/952632415044644924/Aiko.png",
        thumbnail: "https://cdn.discordapp.com/attachments/924376718528090212/952632415044644924/Aiko.png",
        showTimestamp: true,
        footer: "This is an example Footer!",
        fields: [
            {
                title: "Test1",
                text: "This is text of Test1"
            },
            {
                title: "Test1",
                text: "This is text of Test1"
            }
        ],
        body: "You have been invited to join the special club in {guild.name}" // variables that can be found in the interaction object (interaction.---) can be defined here.
    },
    showFact: true, // Show a fact about the animal when /pic command is used
    pictureEmbed: { // Simple configuration for how the embed would look
        color: "RANDOM",
        showTimestamp: true,
        ephemeral: false // Should the embed be shown as a public image or a private image?
    },
    invitationChannel: "" // Channel which sends whether an invitation was accepted or denied.
}