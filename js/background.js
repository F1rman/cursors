chrome.tabs.onUpdated.addListener(callback);
chrome.tabs.onActivated.addListener(callback);
chrome.tabs.onCreated.addListener(callback);


//Change in 2 places
cursor_array_ids = ["cursor0001", "cursor0002", "cursor0003", "cursor0004","cursor0005","cursor0006","cursor0007", "cursor0008", "cursor0009", "cursor0010","cursor0011","cursor0012","cursor0013","cursor0014","cursor0015","cursor0016","cursor0017","cursor0018","cursor0019","cursor0020","cursor0021","cursorthings_0001","cursorthings_0002","cursorthings_0003","cursorthings_0004","cursorthings_0005","cursorthings_0006","cursorthings_0007","cursorthings_0008","cursorthings_0009","cursorthings_0010","cursorthings_0011","cursorthings_0012","cursorthings_0013","cursorthings_0014","cursorthings_0015","cursorthings_0016","cursorthings_0017","cursorthings_0018","cursorthings_0019","cursorthings_0020","cursorthings_0021"];

remove_class_str='';

for(i=0;i<cursor_array_ids.length;i++){
    remove_class_str+='"'+cursor_array_ids[i]+'"';
    if(i!=cursor_array_ids.length-1)
        remove_class_str+=',';

}

class Cursor {

    cursorON(tab,cursor_id) {
        if (tab && tab.url.indexOf('http') === 0) {
            chrome.tabs.executeScript(tab.id,{
                code: 'document.body.classList.remove('+remove_class_str+'); document.body.classList.add("'+cursor_array_ids[cursor_id]+'");',
                "allFrames" : true
            });
        }
    }

    allOFF(tab) {
        if (tab && tab.url.indexOf('http') === 0) {
            chrome.tabs.executeScript(tab.id,{
                code: 'document.body.classList.remove('+remove_class_str+');',
                "allFrames" : true
            });
        }
    }
}

function callback() {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var tab = arrayOfTabs[0];
        chrome.storage.sync.get(["selected_cursor_id"], function (items) {
            var current_cursor_id = items.selected_cursor_id;

            if(typeof current_cursor_id !== 'undefined')
                new Cursor().cursorON(tab,current_cursor_id);
            else {
                new Cursor().allOFF(tab);
            }
        });
    });
}
