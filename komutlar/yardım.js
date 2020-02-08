const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x36393E)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
    .setDescription('DM kutuna bilgileri yolladım.');
    message.channel.sendEmbed(ozelmesajkontrol) }
    const pingozel = new Discord.RichEmbed()
    
    .setTitle('**Komut Listesi**')
    .setDescription(':white_small_square: Mod Komutları İçin :: !yetkili \n :white_small_square: Üye Komutları İçin :: !kullanıcı \n :white_small_square: Eğlence Komutları İçin :: !eğlence')

    
    .setThumbnail(`https://cdn.pixabay.com/photo/2013/07/12/12/40/help-146073_960_720.png`)
    .setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
    
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım', 'help', 'y', 'h'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Yardım Eder.',
  usage: 'yardım'
};
