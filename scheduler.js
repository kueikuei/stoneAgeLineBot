var linebot = require('linebot');
// var line = require('@line/bot-sdk');


var bot
// 全域清單
// [key, key, key]
// var keyList = []

// group ID
var allIDs = [
    'C9b8eec334a494490e84e21a736ebd196', //A
    'Cac9b057386d3a2b7c7c795e1db0b1b98', // B
    // 'U3b90812bccb505e9a03722a0a772c894', // kuei
    'C516266dd76bfcd49c07f2f61002fd989', // C
    'C4dbfa6899586434e80ec17ed161598ea' // 洪順
]


// 本地環境測試
// var localConfig = require('./localConfig.json')

// var client = new line.Client({
//     channelAccessToken: localConfig[1].channelAccessToken
// });
var localConfig
if (localConfig) {
  bot = linebot({
    channelId: localConfig[1].channelId,
    channelAccessToken: localConfig[1].channelAccessToken,
    channelSecret: localConfig[1].channelSecret
  })
  // 遠端機台
}
else {
  bot = linebot({
    channelId: process.env.channelId,
    channelAccessToken: process.env.ChannelAccessToken,
    channelSecret: process.env.ChannelSecret
  })
}

// 主動發送訊息
function post(msg) {
    // console.log('msg',[msg])
    allIDs.forEach(id => {
        console.log('id',id)
        bot.push(id, [msg]);
    });

    // client.pushMessage(id, [msg])
    // .then((res) => {
    //     console.log(res)
    // })
    // .catch((err) => {
    //     console.log(err)
    // });
    // bot.push('C9b8eec334a494490e84e21a736ebd196', [msg]);
    // bot.push('Cac9b057386d3a2b7c7c795e1db0b1b98', [msg]);
    // bot.push('C516266dd76bfcd49c07f2f61002fd989', [msg]);
}

var ad = '《玩家贊助方式0624 NEW》\n1.支付寶 / Visa Mastercard \nhttp:lovesa138.com/ps\n2.7391繳款方式（台灣/香港/澳門）支持ATM,超商\n\n《限時八天 每日消費回饋 ❤有機會獲得白色雷龍 》\nhttp://bit.ly/2NvEi8W'
// var ad = 'test'

// var message = {
//     type: 'text',
//     text: ad
//   };
  

post(ad)


  


// 多少時間內發多少次訊息
// function npostInTime(sendMsg, waitTime) {
//   setTimeout(function () {
//     post(sendMsg)
//   }, waitTime);
// }

// function postByTime(sendMsg, waitTime) {
//   setTimeout(function () {
//     post(sendMsg)
//   }, waitTime);
// }

















































