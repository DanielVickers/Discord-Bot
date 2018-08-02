const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();

	const deleteCount = parseInt(args[0], 10);
	    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
    
    return message.reply("Please provide a number greater than 0 but lower than 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount+1});
    message.channel.bulkDelete(fetched)

    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'Deletes a defined amount of messages.',
  usage: 'purge [1-99]'
};
