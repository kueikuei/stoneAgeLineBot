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



const line = require('@line/bot-sdk');
const express = require('express');
// const lineConfig = {
//   channelAccessToken: process.env.Channel_access_token,
//   channelSecret: process.env.Channel_secret
// };
const lineConfig = {
    channelAccessToken: 'qdzy8O4OluZkTmqpAO/LzvNOnZQ5XNHm7G2XWj3eFGVoDeCMXO4kptPS3IWFc1S/g0wxDLZzRaVPtN4HTfvOgq+iJImuu3yIc7kHNB030JWLsGg++pT4K5GZgsAHbzr3CIH23OfOwcu4JzpTMSPakQdB04t89/1O/w1cDnyilFU=',
    channelSecret:  '3696ca91a8467bda329372c3fd5f3b13'
}
const client = new line.Client(lineConfig);
const app = express();

app.listen(3000, function() {
    console.log('App now running on port', this.address().port);
});

app.post('/', line.middleware(lineConfig), function(req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(function(result) {
            res.json(result);
        });
});


function handleEvent(event) {
    switch (event.type) {
      case 'join':
      case 'follow':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: '你好請問我們認識嗎?'
        });   
      case 'message':
        switch (event.message.type) {
          case 'text':
            return client.replyMessage(event.replyToken, {
              type: 'text',
              text: (event.message.text+'~*')
            });
        }
    }
  }
















































