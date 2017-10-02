var localData;
/**
 * 获取本地储存的数据
 * @param restoredSettings
 */
function getLocalData(restoredSettings) {
    localData = restoredSettings || {};
    console.log("获取本地数据显示列表：")
    console.log(localData);
}
function onError(e) {
    console.error(e);
}

/**
 * 显示工具栏的那些表单数据列表
 */
function showData() {
    var _html = "";
    for (var key in localData) {
        var data = localData[key];
        _html += getAllHtml(data, key);
    }
    $("#container").html(_html);
}
function getAllHtml(data, key) {
    var _html_title = '<div class="title" title="' + key + '">' + data.source_title + '</div>';
    var _html_detail = getDetalHtml(data);
    var _html = '<div class="item">' + _html_title + _html_detail + '</div>';
    return _html;
}
function getDetalHtml(data) {
    var _html_detail =  '<div class="detail">\n' +
                        '<table class="table">\n' +
                        '<tbody>';
    for (var key in data) {
        if (key == "source_title") { //source_title是自定义的网页title 就不在数据列表里显示
            continue;
        }
        var tmp = '<tr>\n' +
            '                    <td>' + key + '</td>\n' +
            '                    <td>' + data[key] + '</td>\n' +
            '                </tr>';
        _html_detail += tmp;
    }
    _html_detail += "</tbody></table></div>";
    return _html_detail;
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(getLocalData, onError).then(showData);