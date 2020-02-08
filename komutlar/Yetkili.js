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
    
    .setTitle('**Yetkili Komutları**')
    .setDescription(':white_small_square: Ban :: Seçtiğiniz Kişiyi Sunucudan Banlar\n :white_small_square: Mute :: Seçtiğiniz Kişiyi Süresiz Olarak Susturur \n :white_small_square: Unmute :: Seçtiğiniz Kişinin Mutesini Açar.\n :white_small_square: Kick :: Seçtiğiniz Kişiyi Sunucudan Uzaklaştırır \n :white_small_square: Temizle :: Yazdığınız Rakam Kadar Mesaj Temizler Max 100! \n :white_small_square: Uyar :: Seçtiğiniz Kişiyi Uyarır \n :white_small_square: Otorol :: Seçtiğiniz Rolü Sunucuya Gelene Otomatik Verir \n :white_small_square: Uyarı :: !uyarı1 @kişi sebep yazarak o kişiye uyarı 1 rolü verebilirsiniz. \n :white_small_square: Uyarı :: !uyarı2 @kişi sebep yazarak o kişiye uyarı 2 rolü verebilirsiniz. ')

    
    .setThumbnail(`https://images-ext-2.discordapp.net/external/8Dx7sQFwec4-Mi1BaKMA4RC1wPbx4IvaMpi_XayB_fw/https/csgoplugin.center/images/plugin/56.png`)
    .setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
    
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili', 'Yetkili', 'Mod', 'mod'],
  permLevel: 0
};

exports.help = {
  name: 'mod',
  description: 'Mod komutlarını Gösterir',
  usage: 'mod'
};
