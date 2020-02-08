const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;











const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};














client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};














client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};








client.on("message", msg => {
  let izinli = ["673259388282208298"]
  if (!izinli.includes(msg.channel.id)) return
  if (msg.author.id === client.user.id) return
  if (msg.author.bot) return
  if (!msg.attachments.size) return
  if (msg.attachments.size > 0) {
  const channel1 = msg.guild.channels.find(r => r.name === "izinli-foto");
  const channel2 = msg.guild.channels.find(r => r.name === "logogo");
  const files = (channel1.lastMessage.attachments).map(attachment => attachment.url)
  console.log(files)
  channel2.send(`Bu Fotoğraf ${msg.author} Tarafından Gönderildi. **Logged by Tokuchi**`, {files});
  }
  });





client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannelanan = newMessage.guild.channels.find(c => c.name === "logs")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content)
  .addField("Yeni Mesaj", newMessage.content)
  .addField("Kanal Adı", newMessage.channel.name)
  .addField("Mesaj ID", newMessage.id, true)
  .addField("Kullanıcı ID", newMessage.author.id, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannelanan.send(embed)
});
client.on("messageDelete", async (deletedMessage) => {
if(deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let sChannelanan = deletedMessage.guild.channels.find(c => c.name === "logs")
  let embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
  .addField("Kullanıcı", deletedMessage.author)
  .addField("Silinen Mesaj", deletedMessage.content)
  .addField("Kanal Adı", deletedMessage.channel.name)
  .addField("Mesaj ID", deletedMessage.id, true)
  .addField("Kullanıcı ID", deletedMessage.author.id, true)
  .setThumbnail(deletedMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours()+3}:${deletedMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannelanan.send(embed)
});
   













//eval

client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'st!eval client.token' || msg.content.toLowerCase() === 'st!eval bot.token' || msg.content.toLowerCase() === 'st!eval guild.token' || msg.content.toLowerCase() === 'st!eval') {
    msg.channel.send("```Kusura Bakma Yapımcım Dışında Kimseye Gösteremem```")
  }
});



//oto değişen oynuyor
var oyun = [
  `FATAL İyi Günler Diler`,
  `Aerofocus Network için özel yapılmıştır`];

setInterval(function() {

  var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

  client.user.setGame(oyun[random], "https://www.twitch.tv/fatalwaccle");
  }, 50000);

//sunucu paneli
//async function panel(){
   // let k1 = client.channels.get("529413765842731009");
    //let k2 = client.channels.get("529413828937646100");
    //let k3 = client.channels.get("529413848961253377");
//k1.setName(`${client.channels.size}➡️Kanal`)
//k2.setName(`${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}➡️Kullanıcı`) 
//k3.setName(`${client.guilds.size}➡️Sunucu`)
    //}; 
//setInterval(panel, 30000);


//döviz komudu
  

client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(`***DOLAR*** \nDolar satış » **${info.selling}** \nDolar alış » **${info.buying}** \n\n***EURO*** \nEuro satış » **${euro.selling}**TL \nEuro alış » **${euro.buying}**TL`)    }
})
    }
})
    }
});


//sa as


client.on('message', message => {
  if (message.content.toLowerCase() ===  "selamın aleyküm") {
      var sans = [`Aleyküm Selam ${message.author} Hoş Geldin`, `Ve Aleyküm Selam ${message.author} İyi Eğlenceler`];
      var sonuc = sans[Math.floor((Math.random() * sans.length))];
      const embed = new Discord.RichEmbed()
      .addField(`**Hoşgeldin İyi İnsan**`, `${sonuc}`)
      return message.channel.sendEmbed(embed);
  }
  });


  client.on('message', message => {
    if (message.content.toLowerCase() ===  "sa") {
        var sans = [`Aleyküm Selam ${message.author} Hoş Geldin`, `Ve Aleyküm Selam ${message.author} İyi Eğlenceler`];
        var sonuc = sans[Math.floor((Math.random() * sans.length))];
        const embed = new Discord.RichEmbed()
        .addField(`**Hoşgeldin İyi İnsan**`, `${sonuc}`)
        return message.channel.sendEmbed(embed);
    }
    });







//küfür reklam engelleme

    client.on('message', message => { 

      if (message.channel.type == "dm") return;
      if (message.member.hasPermission('KICK_MEMBERS')) return;

      const channel = message.guild.channels.find(channel => channel.name === 'logs');
    
 
        const yasaklikelimeler = ["discord.gg", "discord", "dc", "discord.io", "discord.me", "discord.li"];
        if (yasaklikelimeler.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.channel.send(`Dostum ${message.author}! Onlar Yasaklı Kelimeler Kullanamazsın`).then(m => m.delete(3000)); 
            embed = new Discord.RichEmbed() 
            .setAuthor(' Discord | Reklam', `   https://cdn.iconscout.com/public/images/icon/free/png-128/discord-logo-3176a652a0327604-128x128.png`)
            embed.setDescription('Bir Kullanıcının mesajında **reklam** içeren kelime bulundu  \n\n **Bulunan Kanal »** '+ message.channel) 
            embed.setColor(0xff0000) 
            embed.addField(name="Mesaj »", value=message.content) 
            embed .addField('Yazan Kişi »', `${message.author}`)
            embed.setFooter(name=`Yazan Kişini İD'si » ${message.author.id}`)
            embed.setTimestamp()

            let Channel = message.guild.channels.find(`name`, "logs");
            if (!Channel) return message.channel.send('*logs* adında bir yazı kanalı oluşturmalısın yoksa logları bir yere yazamam!**')

            channel.send(embed)

          }
    }); 


    client.on('message', message => { 

      if (message.channel.type == "dm") return;
      if (message.member.hasPermission('KICK_MEMBERS')) return;

      const channel = message.guild.channels.find(channel => channel.name === 'logs');
    
 
        const yasaklikelimeler = ["Facebook.com", "facebook.com", "facebook","facebook.net", "Facebook.net" ,"İnstagram.net", "instagram.net", "instagram.com", "İnstagram.com", "fb.com", "fb.net"];
        if (yasaklikelimeler.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.channel.send(`Dostum ${message.author}! Onlar Yasaklı Kelimeler Kullanamazsın`).then(m => m.delete(3000)); 
            embed = new Discord.RichEmbed() 
            .setAuthor(' Face İnsta | Reklam', `   https://static.birgun.net/resim/haber-detay-resim/2018/02/17/reklam-olsa-bir-dert-olmasa-bir-dert-428760-5.jpg`)
            embed.setDescription('Bir Kullanıcının mesajında **Face İnsta** içeren kelime bulundu  \n\n **Bulunan Kanal »** '+ message.channel) 
            embed.setColor(0xff0000) 
            embed.addField(name="Mesaj »", value=message.content) 
            embed .addField('Yazan Kişi »', `${message.author}`)
            embed.setFooter(name=`Yazan Kişini İD'si » ${message.author.id}`)
            embed.setTimestamp()

            let Channel = message.guild.channels.find(`name`, "logs");
            if (!Channel) return message.channel.send('*logs* adında bir yazı kanalı oluşturmalısın yoksa logları bir yere yazamam!**')

            channel.send(embed)

          }
    }); 




    client.on('message', message => { 

      if (message.channel.type == "dm") return;
      if (message.member.hasPermission('KICK_MEMBERS')) return;

      const channel = message.guild.channels.find(channel => channel.name === 'logs');
    
 
        const yasaklikelimeler = [
        "aq",
        "amq", 
        "amk", 
        "ağzına sıçıyım", 
        "ağzına sıçayım", 
        "annesiz", 
        "anan", 
        "ananın", 
        "annanın", 
        "babasız", 
        "bacı", 
        "baci", 
        "ebeni", 
        "eben", 
        "ebesini", 
        "ejdadını", 
        "ejtadını", 
        "ezdadını", 
        "eztadını", 
        "ecdat", 
        "ecdatını", 
        "ecdatının", 
        "sikik", 
        "yavşak", 
        "yavsak", 
        "kahpe", 
        "pezevenk", 
        "kaltak", 
        "oç", 
        "piç", 
        "orrospu", 
        "orrospuçocu", 
        "kürt", 
        "kürdo", 
        "kürdi", 
        "zenci", 
        "nigga", 
        "niga", 
        "siyahi", 
        "zenci", 
        "ateist",
        "Amını sikem",
        "amına koyam",
        "baban olam",
        "dinsiz",
        "fuck you",
        "fuck",
        "motherfucker",
        "motherfuck",
        "bitch",
        "idiots",
        "puşt",
        "pezevenk",
        "doğmamış çocuğunu sikem",
        "deli orospu",
        "deli orospu çocuğu"
        ,"fahişe",
        "pıttık",
        "olmayan beynine sokam"
        ,"amina koyiiym",
        "bacini skiim",
        "kerhaneci pezevenk",
        "yıkık oç",
        "yıkık orospu çocuğu",
        "piçin doğurduğu",
        "skiim",
        "siikm",
        "sikiyim"
      ];
        if (yasaklikelimeler.some(word => message.content.toLowerCase().includes(word))) {
            message.delete();
            message.channel.send(`Dostum ${message.author}! Onlar Yasaklı Kelimeler Kullanamazsın`).then(m => m.delete(3000)); 
            embed = new Discord.RichEmbed() 
            .setAuthor(' Yasaklı | Kelime', `https://www.iconsdb.com/icons/preview/black/letter-k-xxl.png`)
            embed.setDescription('Bir Kullanıcının mesajında **Küfür** içeren kelime bulundu  \n\n **Bulunan Kanal »** '+ message.channel) 
            embed.setColor(0xff0000) 
            embed.addField(name="Mesaj »", value=message.content) 
            embed .addField('Yazan Kişi »', `${message.author}`)
            embed.setFooter(name=`Yazan Kişini İD'si » ${message.author.id}`)
            embed.setTimestamp()

            let Channel = message.guild.channels.find(`name`, "logs");
            if (!Channel) return message.channel.send('*logs* adında bir yazı kanalı oluşturmalısın yoksa logları bir yere yazamam!**')

            channel.send(embed)

          }
    }); 






//otorol

client.on("guildMemberAdd", member => {
    let otorol = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
  
    var role = otorol[member.guild.id].role;
  const rol = member.guild.roles.find('name', role);
    if (!rol)
    member.addRole(role);
});



client.on('guildMemberAdd', async (member, guild) => {
    
  let userinfo = {};
    userinfo.dctarih = moment.utc(member.user.createdAt).format('DD/MM/YYYY HH:mm')
    userinfo.id = member.id;

    userinfo.status = member.user.presence.status.toString()
    .replace("dnd", `Rahatsız etmeyin.`)
    .replace("online", `Çevrimiçi.`)
    .replace("idle", `Boşta.`)
    .replace("offline", `Çevrimdışı.`)  
  
    let avatar = member.user.avatarURL || member.user.defaultAvatarURL; 
    var embed = new Discord.RichEmbed()
    .setTitle(`Yeni Katılan Kişini Güvenlik Sonuçları`)
    .addField(`Discord Kullanıcı Adı:`, member.user.username) 
    .addField(`ID:`, userinfo.id) 
    .addField(`Discord'a katılım tarihi:`, userinfo.dctarih) 
    .addField(`Durum:`, userinfo.status) 
    .addField('Şu an oynadığı oyun;', member.user.presence.game ? member.user.presence.game.name : 'Şu an oyun oynamamakta.')
    .setColor('RED') 
    .setTimestamp()
    .setThumbnail(avatar)
    client.channels.get("675703118289174599").send(embed)
  
  })















//giriş çıkış


 





var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(process.env.BOT_TOKEN);
