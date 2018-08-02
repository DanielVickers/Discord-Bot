const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = client => {
  client.user.setActivity("Rocket Raids Grow!", {type:"WATCHING"});
  console.log(chalk.bgGreen.black(`Logged in and connected!`));
};
