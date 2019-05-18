var linebot = require('linebot');
// const line = require('@line/bot-sdk');
var express = require('express');
// 取得檔案
var data = require('./data.json')
// console.log(data[0]['合成'])
var fs = require('fs');

var bot

// 本地環境測試
// var localConfig = require('./localConfig.json')
var localConfig
if (localConfig) {
  bot = linebot({
    channelId: localConfig[0].channelId,
    channelAccessToken: localConfig[0].channelAccessToken,
    channelSecret:  localConfig[0].channelSecret
  })
// 遠端機台
} 
else{
  bot = linebot({
    channelId: process.env.channelId,
    channelAccessToken: process.env.ChannelAccessToken,
    channelSecret:  process.env.ChannelSecret
  })
}

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {

  if (event.message.type = 'text') {
    console.log('test',event.message.text[0])

    // 關鍵字回覆
    rtnMsg(data[0][event.message.text]);

    // 寫檔 - key in 新關鍵字、內容給機器人
    if (event.message.text[0]==='>'){
      // 字串切割 -> 切三份
      var textAry = event.message.text.split(" ",3)

      // 寫入檔案
      data[0][textAry[1]] = textAry[2]

      fs.writeFile("./data.json", JSON.stringify(data), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
      });
    }

    // TODO: 比對學習

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
















































