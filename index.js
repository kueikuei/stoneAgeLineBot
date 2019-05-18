var linebot = require('linebot');
// const line = require('@line/bot-sdk');
var express = require('express');
// 取得檔案
var data = require('./data.json')
// console.log(data[0]['合成'])

var bot

// 本地環境測試
// var localConfig = require('./localConfig.json')
if (localConfig) {
  bot = linebot({
    channelId: localConfig[0].channelId,
    channelAccessToken: localConfig[0].channelAccessToken,
    channelSecret:  localConfig[0].channelSecret
  })
// 遠端機台
} else{
  bot = linebot({
    channelId: process.env.channelId,
    channelAccessToken: process.env.ChannelAccessToken,
    channelSecret:  process.env.ChannelSecret
  })
}

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {

  if (event.message.type = 'text') {

    switch (event.message.text) {
      case event.message.text:
        rtnMsg(data[0][event.message.text]);
        break;
      // TODO: 比對學習
      default:
        console.log('沒有符合的關鍵字');
    }

    function rtnMsg(rtn){
      event.reply(rtn).then(function(data) {
        // 傳送訊息成功時，可在此寫程式碼 
        console.log(data);
      }).catch(function(error) {
        // 傳送訊息失敗時，可在此寫程式碼 
        console.log('錯誤產生，錯誤碼：'+error);
      });
    }

  }
});
  
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

// Bot所監聽的webhook路徑與port
// for local test

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});
















































