
try {
    if (typeof $request != "undefined") {
        if ($request.url.indexOf("newsign/api/daily_sign_in") > -1) {
            var Cookie = $request.headers["Cookie"];
            $prefs.setValueForKey(Cookie, "Cookie");
            $notify("������ǩ��!", "���Cookie", Cookie);
        }
    }
    else {
        var url = 'https://youhui.95516.com/newsign/api/daily_sign_in';
        var method = 'POST';
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Origin': 'https://youhui.95516.com',
            'Cookie': $prefs.valueForKey("Cookie"),
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/sa-sdk-ios  (com.unionpay.chsp) (cordova 4.5.4) (updebug 0) (version 807) (UnionPay/1.0 CloudPay) (clientVersion 137) (language zh_CN)',
            'Referer': 'https://youhui.95516.com/newsign/public/app/index.html',
            'Accept-Language': 'zh-cn'
        };
        var body = '';

        var myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        $task.fetch(myRequest).then(function (response) {
            var obj = JSON.parse(response.body);
            if (!!obj.signedIn) {
                if (obj.signedIn == true) {
                    var days = 0;
                    for (var item in obj.days) {
                        if (obj.days[item] == 1) {
                            days++;
                        }
                    }
                    $notify("������ǩ���ɹ�!", "��ʼʱ��:" + obj.startedAt, "������ǩ��:" + days + "��!");
                }
            }
            else {
                $notify("������ǩ��ʧ��!", response.body, response.body);
            }
            console.log(response.statusCode + "\n\n" + response.body);
        }, function (reason) {
            $notify("������ǩ��ʧ��!", reason.error, reason.error);
            console.log(reason.error);
        });
    }

} catch (e) {
    console.log(e);
    $notify("������ǩ������!", e, e);
}
$done();

