const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "!";

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === "ping") {
        message.channel.send("pong!");
    }
    if (command === "unmod") {
        let user = args[0]
        message.reply(`Yes, ${message.author.username}, we should unmod ${user}`);
    }
    if (command === "asl") {
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    }
    if (command === "weather") {
        var request = require("request");
        let query_url = "http://api.openweathermap.org/data/2.5/weather?zip="
        let zip_code = args[0];
        let query_ending = ",us&appid=25bc90a1196e6f153eece0bc0b0fc9eb&units=imperial";
        query_url += zip_code;
        query_url += query_ending;
        request.get(query_url, (error, response, body) => {
            let json = JSON.parse(body);
            console.log(json);
            console.log(query_url);
            console.log(
                `City:${json.name}`
            );
            message.reply(` the temperature in ${json.name} is ${json.main.temp}, the conditions are ${json.weather[0].main} and ${json.weather[0].description}. The high for today is ${json.main.temp_max}, and the low is ${json.main.temp_min}.`)
        })
    }
    if (command === "moon") {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        
        if (dd < 10) {
            dd = '0' + dd
        }
        
        if (mm < 10) {
            mm = '0' + mm
        }
        
        today = mm + '/' + dd + '/' + yyyy;
        console.log(today);
        let city =args[0];
        let state = args[1];
        var request = require("request");
        var query_url = "http://api.usno.navy.mil/rstt/oneday?date="+today+"&loc="+city+state
        console.log(city);
        console.log(state);
        console.log(query_url);
        request.get(query_url, (error, response,body) =>{
            let json = JSON.parse(body);
            message.reply(` the moon phase closest for today in ${json.city},${json.state} is ${json.closestphase.phase} and that was on ${json.closestphase.date}. The current phase is ${json.curphase} at ${json.fracillum}`)
        })
    }

});

client.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
    member.guild.channels.get("heythere").send(`"${member.user.username}" has joined this server`);
});

client.on("error", (e) => console.error(e));
client.login("NDI4Mjk5OTY2MTA1MjU1OTQ3.DZxMBQ.MI2TkzCEOp8oKeU_pgphfsNH8hk");