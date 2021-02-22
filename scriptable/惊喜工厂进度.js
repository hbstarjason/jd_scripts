//京东水果成熟进度
//var token = args.widgetParameter;

var cookies = [
  {
    "name": "",
    "cookie": ''
  },
  {
    "name": "",
    "cookie": ""
  }

];


let widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentLarge()
}
Script.setWidget(widget)
Script.complete()
async function createWidget() {
  let title = "惊喜工厂进度"
  let w = new ListWidget()
  bg = new LinearGradient()
  bg.locations = [0, 1]
  bg.colors = [
    //new Color("#6fa8dc"),
    //new Color("#a4c2f4")
    new Color('ffffff')
  ]

  w.backgroundGradient = bg
  w.addSpacer(8)

  // 显示图标和标题
  let titleStack = w.addStack()
  titleStack.addSpacer(4)
  let titleElement = titleStack.addText(title)
  titleElement.textColor = Color.orange();
  titleElement.font = Font.mediumSystemFont(15)
  w.addSpacer(8)

  let msgstr = "", sharecode = "";
  for (var i = 0; i < cookies.length; i++) {
    let data = await getData(cookies[i].cookie);
    //console.log("🍎🍎🍎" + JSON.stringify(data));
    msgstr = cookies[i].name + ":";
    if (!!data.ret && data.ret == "10001") {
      msgstr = cookies[i].name + ": cookie失效";
    }
    if (!!data.data.productionList && !!data.data.productionList[0].investedElectric) {
      msgstr = cookies[i].name + ": " + ((data.data.productionList[0].investedElectric / data.data.productionList[0].needElectric) * 100).toFixed(2) + "%";
      //msgstr=data.data.productionList[0].needElectric.toString();
      //console.log("🍓🍓🍓🍓"+data.data.productionList[0].needElectric);
      //console.log(data.data.user.encryptPin);
      sharecode += data.data.user.encryptPin + "@";
    }
    
    let date1 = w.addText(msgstr)
    date1.font = Font.semiboldSystemFont(12);
    //date1.textColor = Color.white()
    date1.textColor = Color.black();
    w.addSpacer(5)

  }
  console.log("/submit_activity_codes jxfactory " + sharecode.substr(0, sharecode.length - 1));

  // 更新时间
  let gx = '更新' + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  let body = w.addText(gx)
  body.font = Font.mediumRoundedSystemFont(9)
  body.textColor = Color.blue()
  w.addSpacer(15)
  return w
}
async function getData(cookie) {
  var url = 'https://m.jingxi.com/dreamfactory/userinfo/GetUserInfo?zone=dream_factory&pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&sceneval=2&g_login_type=1&_time=1612776575878&_=1612776575878';

  var req = new Request(url)

  req.headers = {
    "Cookie": cookie,
    "Host": "m.jingxi.com",
    "Connection": "keep-alive", "User-Agent": "jdpingou;iPhone;3.14.4;14.0;ae75259f6ca8378672006fc41079cd8c90c53be8;network/wifi;model/iPhone10,2;appBuild/100351;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/62;pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Accept-Language": "zh-cn", "Referer": "https://wqsd.jd.com/pingou/dream_factory/index.html", "Accept-Encoding": "gzip, deflate, br"
  }
  req.method = 'GET';
  //req.body = "body=version:4&appid=wh5&clientVersion=9.1.0";
  //console.log(req);
  var data = await req.loadJSON();
  //console.log(data);
  return data
}
