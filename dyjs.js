
//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了

// [mitm]
// hostname = *.snssdk.com

//==========================Quantumultx=========================
// [task_local]
// */30 * * * * * https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, tag=抖音极速版刷音符, enabled=true

// [rewrite_local]
// snssdk.com/luckycat/aweme/v1/task/done/read? url script-request-header https://gitee.com/passerby-b/javascript/raw/master/dyjs.js

// =========================Loon=============================
// [Script]
// snssdk.com/luckycat/aweme/v1/task/done/read? script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, requires-body=true, timeout=10, tag=抖音极速版刷音符
// cron "*/30 * * * * *" script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js,tag=抖音极速版刷音符

var $tool = tool();
try {
    if (typeof $request != "undefined") {
        console.log("🍎抖音极速获取headers脚本开始!");
        var headers = $request.headers;
        var headlist = $tool.getkeyval("dyheadlist");
        $tool.setkeyval($request.url, "dyurl");
        if (!!headers) {
            if (!!headlist) {
                var list = JSON.parse(headlist);
                list.push(headers)
            } else {
                var list = [];
                list.push(headers)
            }
            $tool.notify("获取headers成功", "个数:" + list.length, "");
            $tool.setkeyval(JSON.stringify(list), "dyheadlist");
            console.log("✳️" + JSON.stringify(list))
        }
        $done()
    } else {
        console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本开始!\n");
        var headlist = $tool.getkeyval("dyheadlist");
        var thishead = $tool.getkeyval("thishead");
        if (!!headlist) {
            var index = 0;
            var list = JSON.parse(headlist);
            if (!!thishead) {
                for (var i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i]) == thishead) {
                        if (list.length - 1 == i) {
                            $tool.setkeyval(JSON.stringify(list[0]), "thishead")
                        } else {
                            $tool.setkeyval(JSON.stringify(list[i + 1]), "thishead");
                            index = i + 1
                        }
                        break
                    }
                }
            } else {
                $tool.setkeyval(JSON.stringify(list[0]), "thishead")
            }
            console.log("☢️开始刷第" + index + "个headers,共" + list.length + "个headers\n");
            var myRequest = {
                url: $tool.getkeyval("dyurl"),
                headers: JSON.parse($tool.getkeyval("thishead")),
                body: '{\n  "in_sp_time" : 0,\n  "task_key" : "read"\n}'
            };
            $tool.post(myRequest, function (e, r, d) {
                if (d.indexOf("成功") > -1) {
                    var dataobj = JSON.parse(d);
                    console.log("♥️获得" + dataobj.data['score_amount'] + "个音符!\n")
                }
                else if (d.indexOf("10009") > -1) {
                    if (index == list.length - 1) {
                        $tool.setkeyval(JSON.stringify(list[0]), "thishead")
                    } else {
                        $tool.setkeyval(JSON.stringify(list[index + 1]), "thishead")
                    }
                    list.splice(index, 1);
                    $tool.setkeyval(JSON.stringify(list), "dyheadlist");
                    console.log("❌删除此条header,还剩" + list.length + "个\n")
                }
                else {
                    console.log("✳️" + d + "\n");
                }

                try {
                    myRequest.url = "https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/page?_request_from=web&" + $tool.getkeyval("dyurl").split('?')[1];
                    $tool.get(myRequest, function (e, r, d) {
                        d = JSON.parse(d);
                        console.log("🎁总音符:" + d.data.income_data.amount1 + "个!");
                        console.log("🎁现金收益:" + Number(d.data.income_data.amount2) / 100 + "元!");
                        console.log("🎁累计收益" + Number(d.data.income_data.amount2_total) / 100 + "元!\n");
                    })
                } catch (e) { }

                if (!$tool.getkeyval("dycodesub")) {
                    try {
                        myRequest.url = "https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/done/post_invite_code?_request_from=web&" + $tool.getkeyval("dyurl").split('?')[1];
                        myRequest.body = '{\n  "in_sp_time" : 0,\n  "invite_code" : "8085708231"\n}';
                        $tool.post(myRequest, function (e, r, d) {
                            $tool.setkeyval("ok", "dycodesub");
                            console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本结束!\n");
                            $done()
                        })
                    } catch (e) {
                        console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本结束!\n");
                        $done()
                    }
                } else {
                    setTimeout(function () {
                        console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本结束!\n");
                        $done()
                    }, 500);
                }

            })
        } else {
            $tool.notify("请先刷视频获取headers", "多多益善", "");
            console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本结束!\n");
            $done()
        }
    }
} catch (e) {
    console.log("❌错误:" + e);
    console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本结束!\n");
    $done()
}
function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";
    var obj = {
        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["open-url"] = option
                    }
                    if (!!option.url) {
                        option_obj["open-url"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["media-url"] = option.img
                    }
                    $notify(title, subtitle, message, option_obj)
                } else {
                    $notify(title, subtitle, message)
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["openUrl"] = option
                    }
                    if (!!option.url) {
                        option_obj["openUrl"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["mediaUrl"] = option.img
                    }
                    $notification.post(title, subtitle, message, option_obj)
                } else {
                    $notification.post(title, subtitle, message)
                }
            }
        },
        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "GET";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                }, function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.get(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "POST";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                }, function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.post(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, "%u"))
        },
        decodeurl: function (str) {
            return decodeURIComponent(str)
        },
        json2str: function (obj) {
            return JSON.stringify(obj)
        },
        str2json: function (str) {
            return JSON.parse(str)
        },
        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key)
            }
            if (isLoon) {
                $persistentStore.write(value, key)
            }
        },
        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key)
            }
            if (isLoon) {
                return $persistentStore.read(key)
            }
        }
    };

    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else {
                if (response.statusCode) {
                    response["status"] = response.statusCode
                }
            }
        }
        return response
    }
    return obj
};

