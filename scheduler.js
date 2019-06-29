var linebot = require('linebot');

var bot
// 全域清單
// [key, key, key]
// var keyList = []

// group ID
var allIDs = [
//   'Cac9b057386d3a2b7c7c795e1db0b1b98', // B
//   'C516266dd76bfcd49c07f2f61002fd989', // C
  'U3b90812bccb505e9a03722a0a772c894', // kuei
  'C4dbfa6899586434e80ec17ed161598ea' // 洪順
]

// 本地環境測試
// var localConfig = require('./localConfig.json')
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

post('test')

// 主動發送訊息
function post(msg) {
  allIDs.forEach(id => {
    bot.push(id, [msg]);
  });
}

// 多少時間內發多少次訊息
function npostInTime(sendMsg, waitTime) {
  setTimeout(function () {
    post(sendMsg)
  }, waitTime);
}

function postByTime(sendMsg, waitTime) {
  setTimeout(function () {
    post(sendMsg)
  }, waitTime);
}

















































