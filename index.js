var linebot = require('linebot');
var express = require('express');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FirebaseKey)),
  // credential: admin.credential.cert(require("./sabot-dca8c-firebase-adminsdk-mqrmy-1c07d286ac.json")),
  databaseURL: "https://sabot-dca8c.firebaseio.com"
});

// 建立 db 連線
var db = admin.database()
var bot
// 全域清單
// [key, key, key]
var keyList = []

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

    // 關鍵字回覆
    try{
      keyList.forEach(key => {
        if(event.message.text.indexOf(key)>-1){
          console.log('key',key)
          // 關鍵字回覆
          db.ref(`data/${key}`).on('value',function(snapshot){
            rtnMsg(snapshot.val());
          })
        }
      });
    }
    catch(e){
      console.log(e) // 把例外物件傳給錯誤處理器
    }

    // 寫檔 - key in 新關鍵字、內容給機器人
    try{
      if (event.message.text[0]==='>'){
        // 字串切割 -> 切三份
        var textAry = event.message.text.split(" ",3)

        // 寫入檔案
        db.ref(`data/${textAry[1]}`).set(textAry[2]);

      }
    }
    catch(e) {
      console.log(e) // 把例外物件傳給錯誤處理器
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
// 監聽 firebase 資料庫
// 每一次資料庫有更新這邊都能偵測
// 更新清單資料以利使用
db.ref('data').on('value',function(snapshot){
  var dataKeys = Object.keys(snapshot.val())
  keyList = dataKeys
  
})

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);



// Bot所監聽的webhook路徑與port
// for local test

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});
















































