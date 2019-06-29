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

// group ID
var allIDs = [
  'C9b8eec334a494490e84e21a736ebd196', //A
  'Cac9b057386d3a2b7c7c795e1db0b1b98', // B
  'C516266dd76bfcd49c07f2f61002fd989', // C
  'U3b90812bccb505e9a03722a0a772c894' // kuei
]

// 本地環境測試
// var localConfig = require('./localConfig.json')
var localConfig
if (localConfig) {
  // bot = linebot({
  //   channelId: localConfig[0].channelId,
  //   channelAccessToken: localConfig[0].channelAccessToken,
  //   channelSecret:  localConfig[0].channelSecret
  // })
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

//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function (event) {
  console.log(event.message.text,event.source.groupId)
  // 沒有此 group id 就新增
  // if (event.source.groupId && allIDs.indexOf(event.source.groupId) === -1) {
  //   allIDs.push(event.source.groupId)
  // }

  if (event.message.type = 'text') {

    // 關鍵字回覆
    try {
      keyList.forEach(key => {
        if (event.message.text.indexOf(key) > -1) {
          console.log('key', key)
          // 關鍵字回覆
          db.ref(`data/${key}`).on('value', function (snapshot) {
            rtnMsg(snapshot.val());
          })
        }
      });
    }
    catch (e) {
      console.log(e) // 把例外物件傳給錯誤處理器
    }

    // 寫檔 - key in 新關鍵字、內容給機器人
    // new
    try {
      if (event.message.text[0] === '>') {
        // 字串切割 -> 切三份
        var textAry = event.message.text.split(" ", 4)

        // 寫入檔案
        if(textAry.length===3){
          db.ref(`data/${textAry[1]}`).set(textAry[2]);
        }

        if (textAry.length===4 && textAry[3] === 'img') {
          var obj = {}
          obj.originalContentUrl = textAry[2]
          obj.previewImageUrl = textAry[2]
          obj.type = 'image'
        }
        db.ref(`data/${textAry[1]}`).set(obj);

      }
    }
    catch (e) {
      console.log(e) // 把例外物件傳給錯誤處理器
    }

    // 主動po文
    // try {
    //   if (event.message.text.slice(0, 4) === 'push') {

    //     // 字串切割 -> 切三份
    //     var textAry = event.message.text.split(" ", 4)
    //     console.log(textAry)
    //     if (textAry.length === 2) {
    //       post(textAry[1])
    //     }

    //     // TODO: 幾月幾號要發布
    //     // if (textAry.length === 3) {
    //     //   // 參數切割
    //     //   // 061012 六月十號12點
    //     //   // .toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
    //     //   var currentTime = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    //     //   var targetTime = new Date(2019, parseInt(textAry[2].slice(0, 2))-1, parseInt(textAry[2].slice(2, 4)), parseInt(textAry[2].slice(4, 6))-8, parseInt(textAry[2].slice(6, 8))).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    //     //   // var targetTime = new Date(2019, parseInt(textAry[2].slice(0, 2))-1, parseInt(textAry[2].slice(2, 4)), parseInt(textAry[2].slice(4, 6)), parseInt(textAry[2].slice(6, 8)))

          
    //     //   console.log(currentTime,targetTime)
    //     //   console.log('targetTime-currentTime', GetDateDiff(currentTime,targetTime,"seond"))

    //     //   postByTime(textAry[1], GetDateDiff(currentTime,targetTime,"seond"))
    //     // }

    // //     // TODO: 每隔多久要發一次，到何時結束
    // //     if (textAry.length === 4) {
    // //       // 發幾次 
    // //       var n = +(textAry[3])

    // //       // 加限制確定不會發太多次 -> 至多五次
    // //       if(n>5){
    // //         n = 5
    // //       }

    // //       var duration = textAry[2] * 1000 * 60 * 60 / n

    // //       // 1h 3次
    // //       for (var i = 1; i <= n; i++) {
    // //         var waitTime = duration * i;
    // //         npostInTime(textAry[1], waitTime)
    // //       }

    // //     }

    //   }
    // } catch (e) {
    //   console.log(e) // 把例外物件傳給錯誤處理器
    // }

    // TODO: 比對學習


    function rtnMsg(rtn) {
      event.reply(rtn).then(function (data) {
        // 傳送訊息成功時，可在此寫程式碼 
        console.log(data);
      }).catch(function (error) {
        // 傳送訊息失敗時，可在此寫程式碼 
        console.log('錯誤產生，錯誤碼：' + error);
      });
    }

  }

});

// 計算時間差
// function GetDateDiff(startTime, endTime, diffType) {
//   //將xxxx-xx-xx的時間格式，轉換為 xxxx/xx/xx的格式 
//   startTime = startTime.replace(/\-/g, "/");
//   endTime = endTime.replace(/\-/g, "/");
//   //將計算間隔類性字元轉換為小寫 
//   diffType = diffType.toLowerCase();
//   var sTime = new Date(startTime); //開始時間 
//   var eTime = new Date(endTime); //結束時間 
//   //作為除數的數字 
//   var divNum = 1;
//   switch (diffType) {
//     case "second":
//       divNum = 1000;
//       break;
//     case "minute":
//       divNum = 1000 * 60;
//       break;
//     case "hour":
//       divNum = 1000 * 3600;
//       break;
//     case "day":
//       divNum = 1000 * 3600 * 24;
//       break;
//     default:
//       break;
//   }
//   return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
// }

// 主動發送訊息
function post(msg) {
  allIDs.forEach(id => {
    bot.push(id, [msg]);
  });
}

// 多少時間內發多少次訊息
function npostInTime(sendMsg, waitTime) {
  setTimeout(function () {
    // var userId = 'C4dbfa6899586434e80ec17ed161598ea';
    // // var sendMsg = "push hands up ";
    // bot.push(userId, [sendMsg]);
    post(sendMsg)
  }, waitTime);
}

function postByTime(sendMsg, waitTime) {
  setTimeout(function () {
    // var userId = 'U3b90812bccb505e9a03722a0a772c894';
    // bot.push(userId, [sendMsg]);
    post(sendMsg)
  }, waitTime);
}

// 監聽 firebase 資料庫
// 每一次資料庫有更新這邊都能偵測
// 更新清單資料以利使用
db.ref('data').on('value', function (snapshot) {
  var dataKeys = Object.keys(snapshot.val())
  keyList = dataKeys

})

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);



// Bot所監聽的webhook路徑與port
// for local test

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('目前的port是', port);
});
















































