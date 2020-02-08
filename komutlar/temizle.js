const Discord = require('discord.js');




module.exports.run = async (client, message, args) => {


  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Üzgünüm Ama Sende  **Mesajları Yönet** Yetkisi Yok .')
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('Benim **Mesajları Yönet** Yetkim Yok.');

  if (!args[0]) return message.channel.send('Silmem İçin Sayı Girmelisin.');
  if (args[0] < 1) return message.channel.send('En Düşük 1 Mesaj Silebilirim.');
  if (args[0] > 100) return message.channel.send('Maximum 100 Adet Mesaj Silebilirim.');
  if (isNaN(args[0])) return message.channel.send('Düzgün Sayı Gir.');

  message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`**${args[0]}** Adet Mesaj Silindi 🗑.`).then(message => message.delete(3000));
  }).catch().catch((e) => message.channel.send('14 Günü Geçmiş Mesajları Silemem.'));

};

  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 3
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
