const request = require("request");
//步骤一种的cookie值
const KEY = "pt_pin=jd_4d738e6ad9663;pt_key=AAJiuZb4ADCMrfwMbDKYE8kGfrv6tznheiWkFo3vljRGAhF2GgDROBhyrByeDaDSwhelDrDTdyk;";
// post通用函数
const postMethod = (options, callback) => {
  // 补上通用的headers
  options.headers["User-Agent"] =
    "JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)";
  if (options.body) {
    options.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  request.post(options, (error, response, body) => {
    callback(error, response, body);
  });
};
//先去查询用户基本情况 预签到接口
// key:活动关键字 用去区分多种活动  title: 活动标题   acData: 活动编码    ask：加密活动秘钥（非必须）
function JDUserSignPre(key, title, acData, ask) {
  return new Promise((resolve, reject) => {
    const JDUrl = {
      url: "https://api.m.jd.com/?client=wh5&functionId=qryH5BabelFloors",
      headers: {
        Cookie: KEY,
      },
      //京东接口要求的业务字段 需要去自行爬接口哦
      opts: {
        filter:
          'try{var od=JSON.parse(body);var params=(od.floatLayerList||[]).filter(o=>o.params&&o.params.match(/enActK/)).map(o=>o.params).pop()||(od.floorList||[]).filter(o=>o.template=="signIn"&&o.signInfos&&o.signInfos.params&&o.signInfos.params.match(/enActK/)).map(o=>o.signInfos&&o.signInfos.params).pop();var tId=(od.floorList||[]).filter(o=>o.boardParams&&o.boardParams.turnTableId).map(o=>o.boardParams.turnTableId).pop();var page=od.paginationFlrs;return JSON.stringify({qxAct:params||null,qxTid:tId||null,qxPage:page||null})}catch(e){return `=> 过滤器发生错误: ${e.message}`}',
      },
      //京东接口要求的业务字段 需要去自行爬接口哦
      body: `body=${encodeURIComponent(
        `{"activityId":"${acData}"${
          ask ? `,"paginationParam":"2","paginationFlrs":"${ask}"` : ``
        }}`
      )}`,
    };
    postMethod(JDUrl, async function (error, response, data) {
      try {
        if (error) {
          throw new Error(error);
        } else {
          const resultData = JSON.parse(data || "{}");
          if (data.match(/enActK/)) {
            // 含有签到数据
            console.log(
              `${title}活动查询成功，含有签到数据, 此处可以集中存储${key}用于统一统计活动情况`
            );
            const params =
              resultData.qxAct ||
              (resultData.floatLayerList || [])
                .filter((o) => o.params && o.params.match(/enActK/))
                .map((o) => o.params)
                .pop();
            resolve({
              params: params,
            }); // 执行签到处理
          }
        }
      } catch (eor) {
        reject();
      }
    });
  });
}
//签到接口
function JDUserSign(title, body) {
  const JDUrl = {
    url: "https://api.m.jd.com/client.action?functionId=userSign",
    headers: {
      Cookie: KEY,
    },
    body: `body=${body}&client=wh5`,
  };
  postMethod(JDUrl, function (error, response, data) {
    try {
      if (error) {
        throw new Error(error);
      } else {
        // 签到成功！
        if (data.match(/签到成功/)) {
          console.log(`\n${title}签到成功(1)`);
          if (data.match(/\"text\":\"\d+京豆\"/)) {
            const count = data.match(/\"text\":\"(\d+)京豆\"/)[1];
            console.log("成功领取京豆数量为：" + count);
          }
        } else {
          console.log("签到失败");
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
}

// 正式开始执行签到
const key = "JDComputer";
const title = "京东电脑-数码";
const acData = "31HbNBjr6YLyZfJtR5biFFc9ZYXN";
JDUserSignPre(key, title, acData)
  .then((checkRes) => {
    JDUserSign(title, checkRes);
  })
  .catch((err) => {
    console.log("预查询活动是否可以签到失败", err);
  });
