var localData = {};
var url =  window.location.host + window.location.port + window.location.pathname;
/**
 * 往input中填充帐号密码
 * @param values
 */
function fillValue(values) {
    for(var key in values) {
        var input = $("[name=" + key + "]");
        if (input == undefined) {
            console.log("找不到对应input");
        }
        input.val(values[key]);
    }
}

/**
 * 判断这个页面是否保存过帐号密码信息，并进行填充
 */
function fillStart() {
    var startMsg = "开始自动填充 => " + url;
    console.log(startMsg);
    console.log(localData[url]);
    if (localData[url] != undefined) {
        console.log(localData[url]);
        fillValue(localData[url]);
    }
}

/**
 * 获取本地储存的数据
 * @param restoredSettings
 */
function getLocalData(restoredSettings) {
    localData = restoredSettings || {};
    console.log("获取本地数据：")
    console.log(localData);
}

function onError(e) {
    console.error(e);
}

/**
 * 将新的账户密码保存到本地储存中
 */
function saveData() {
    console.log("开始保存表单数据 => " + url);
    getData();
    browser.storage.local.set(localData);
    console.log(localData);
}
/**
 * 获取本页面的表单信息
 */
function getData() {
    var data = {"name":"value"};
    $("input").each(function () {
        var type = $(this).attr("type");
        if (type == "text" || type =="password" || type == "" || type==undefined) {
            var name = $(this).attr("name");
            var value = $(this).val();
            data[name] = value;

        }
    });
    console.log($("input"));
    console.log("储存表单数据：");
    console.log(data);
    localData[url] = data;
}
$("input").on("change", saveData);
/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(getLocalData, onError).then(fillStart);
