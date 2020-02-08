const Discord = require('discord.js');
exports.run = function(client, message, args) {
  let start = Date.now(); message.channel.send(message.channel.id, 'Pong! ').then(message => {
  let diff = (Date.now() - start);
  let API = (client.ping).toFixed(2)

      let embed = new Discord.RichEmbed()
      .setTitle(`🔔 Ping Bilgileri!`)
      .setColor(0xff2f2f)
      .addField("📶 Gecikme", `${diff}ms`, true)
      .addField("💻 Bot Ping", `${API}ms`, true)
      message.edit(embed);

  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
