// // 引用linebot SDK
// var linebot = require('linebot');

// // 用於辨識Line Channel的資訊
// var bot = linebot({
//     channelId: '1557059411',
//     channelSecret: '3696ca91a8467bda329372c3fd5f3b13',
//     channelAccessToken: 'qdzy8O4OluZkTmqpAO/LzvNOnZQ5XNHm7G2XWj3eFGVoDeCMXO4kptPS3IWFc1S/g0wxDLZzRaVPtN4HTfvOgq+iJImuu3yIc7kHNB030JWLsGg++pT4K5GZgsAHbzr3CIH23OfOwcu4JzpTMSPakQdB04t89/1O/w1cDnyilFU='
// });

// // 當有人傳送訊息給Bot時
// bot.on('message', function (event) {
//     // event.message.text是使用者傳給bot的訊息
//     // 準備要回傳的內容
//     var replyMsg = `Hello你剛才說的是:${event.message.text}`;
//     // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
//     event.reply(replyMsg).then(function (data) {
//         // 當訊息成功回傳後的處理
//     }).catch(function (error) {
//         // 當訊息回傳失敗後的處理
//     });
// });

// // Bot所監聽的webhook路徑與port
// bot.listen('/linewebhook', 3000, function () {
//     console.log('[BOT已準備就緒]');
// });


var linebot = require('linebot');
// const line = require('@line/bot-sdk');
const express = require('express');
// const lineConfig = {
//   channelAccessToken: process.env.Channel_access_token,
//   channelSecret: process.env.Channel_secret
// };
const lineConfig = {
    channelId: '1557059411',
    channelAccessToken: 'qdzy8O4OluZkTmqpAO/LzvNOnZQ5XNHm7G2XWj3eFGVoDeCMXO4kptPS3IWFc1S/g0wxDLZzRaVPtN4HTfvOgq+iJImuu3yIc7kHNB030JWLsGg++pT4K5GZgsAHbzr3CIH23OfOwcu4JzpTMSPakQdB04t89/1O/w1cDnyilFU=',
    channelSecret:  '3696ca91a8467bda329372c3fd5f3b13'
}
//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = event.message.text;
    //收到文字訊息時，直接把收到的訊息傳回去
      event.reply(msg).then(function(data) {
        // 傳送訊息成功時，可在此寫程式碼 
        console.log(msg);
      }).catch(function(error) {
        // 傳送訊息失敗時，可在此寫程式碼 
        console.log('錯誤產生，錯誤碼：'+error);
      });
    }
  });
  
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log('目前的port是', port);
  });
















































