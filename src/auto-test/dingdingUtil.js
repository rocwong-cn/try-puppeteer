const request = require('request');

function pushDingding(pageTitle, picUrl, pageUrl){
  const url = 'https://oapi.dingtalk.com/robot/send?access_token=ACCESS_TOKEN';
  const data = {
    "msgtype": "markdown",
    "markdown": {
        "title":"⚠️ 报警：售卖页出现故障",
        "text": `### [【${pageTitle}】](${pageUrl})页出现故障 \n> ![screenshot](${picUrl})\n> `
    },
     "at": {
        "isAtAll": true
     }
  };

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: "POST",
      json: true,
      headers: {
          "content-type": "application/json",
      },
      body: data
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve();
        }
    });
  });
};

module.exports = {
  pushDingding,
}