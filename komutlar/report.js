const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Kullanıcıyı Bulamıyorum.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("#15f153")
    .addField("Şikayet Edilen", `${rUser} / ID: ${rUser.id}`)
    .addField("Şikayet Eden", `${message.author} / ID: ${message.author.id}`)
    .addField("Yazı-Kanalı", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("`logs` adında bir kanal bulamıyorum");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
 
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rep', 'report', 'şikayet'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'report',
    description: 'Report Etmenizi Sağlar',
    usage: 'report'
  };
  
