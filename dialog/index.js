var alloff;
var alloptions;
var isSwitchedOff = false;
// var randomSwitch = false;
var body;
var changeHoverClassTimer;
var isDisplayingHoverCursor=false;

current_cursor_id = -1;
cursor_array_elements=[];

//Change in 2 places
cursor_array_ids = ["cursor0001", "cursor0002", "cursor0003", "cursor0004","cursor0005","cursor0006","cursor0007", "cursor0008", "cursor0009", "cursor0010","cursor0011","cursor0012","cursor0013","cursor0014","cursor0015","cursor0016","cursor0017","cursor0018","cursor0019","cursor0020","cursor0021","cursorthings_0001","cursorthings_0002","cursorthings_0003","cursorthings_0004","cursorthings_0005","cursorthings_0006","cursorthings_0007","cursorthings_0008","cursorthings_0009","cursorthings_0010","cursorthings_0011","cursorthings_0012","cursorthings_0013","cursorthings_0014","cursorthings_0015","cursorthings_0016","cursorthings_0017","cursorthings_0018","cursorthings_0019","cursorthings_0020","cursorthings_0021"];
remove_class_str='';
remove_class_str_with_spaces='';

for(i=0;i<cursor_array_ids.length;i++){
    remove_class_str_with_spaces+=cursor_array_ids[i];
    remove_class_str+='"'+cursor_array_ids[i]+'"';
    if(i!=cursor_array_ids.length-1){
        remove_class_str+=',';
        remove_class_str_with_spaces+=" ";
    }

}
$(document).ready(()=>{
  var html =  function(){
    if(Math.random() > 0.5) {
      return '<a target="_blank" href="https://bit.ly/3ceYEy4" class="rete">☆☆☆ Mass delete inactive friends in 1 click ☆☆☆ </a>';
    }
    else {
    return  '<a target="_blank" href="https://chrome.google.com/webstore/detail/style-cursor/njbgkalfmgkchikknmaimfjmfjpnbnpm/reviews" class="rete">☆☆☆ Rate Me ☆☆☆</a>'
    }
  }
  $('.rate_link').html(html)

})

var Popup = {
    updateIcon: function(cursor_id) {
        if(cursor_id<0)
            return;
        chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
            var tab = arrayOfTabs[0];
            var i;
            for (i = 0; i < alloptions.length; i++) {
                alloptions[i].classList.remove("selected");
            }

            cursor_array_elements[cursor_id].classList.add("selected");
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
            Popup.cursorON(tab,cursor_id);
            // Popup.allOffOff();


        });
    },
    showError: function(tab) {
      console.log(chrome.tabs);
        chrome.tabs.getSelected(null,function(tab) {
            var tablink = tab.url;
            if( tablink.startsWith("chrome")  || tablink.startsWith("https://chrome.google.com/webstore/")) {
                body.classList.add("notAllowed")
            }

        });
    },


    cursorClick: function(cursor_id) {
        chrome.storage.sync.set({ "selected_cursor_id": cursor_id}, function () {});

        $('body').removeClass(remove_class_str_with_spaces);
        $('body').addClass(cursor_array_ids[cursor_id]);

        Popup.updateIcon(cursor_id);
    },

    alloffClick: function() {
        isSwitchedOff=!isSwitchedOff;
        if(isSwitchedOff){
            current_cursor_id = -1;
            chrome.storage.sync.set({ "selected_cursor_id": current_cursor_id }, function () {});
            document.getElementsByClassName("wrapper")[0].classList.add("alloff");

            chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                var tab = arrayOfTabs[0];
                var i;
                Popup.allOFF(tab);
            });
            Popup.allOffOn();

            $('body').removeClass(remove_class_str_with_spaces);

            for (i = 0; i < alloptions.length; i++) {
                alloptions[i].classList.remove("selected");
            }
        }
        else{
            Popup.allOffOff();
        }

    },

    allOffOn: function(){
        document.getElementsByClassName("wrapper")[0].classList.add("alloff");
        alloff.innerHTML = "Use Custom Cursor";
        alloff.classList.add("offOn");
        isSwitchedOff = true;
        // randomSwitch = false;
    },

    allOffOff: function(){
        // if(!randomSwitch){
            document.getElementsByClassName("wrapper")[0].classList.remove("alloff");
        // }
        alloff.innerHTML = "Use Default Cursor";
        alloff.classList.remove("offOn");
        isSwitchedOff = false;
    },

    cursorON : function(tab,cursor_id) {
        if (tab && tab.url.indexOf('http') === 0) {
            chrome.tabs.executeScript({
                code: ' document.body.classList.remove('+remove_class_str+'); document.body.classList.add("'+cursor_array_ids[cursor_id]+'");',
                "allFrames" : true
            });
        }
    },

    allOFF : function(tab) {
        if (tab && tab.url.indexOf('http') === 0) {
            chrome.tabs.executeScript({
                code: ' document.body.classList.remove('+remove_class_str+')',
                "allFrames" : true
            });
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    body = document.getElementsByTagName("body")[0];
    for (var i = 0; i < cursor_array_ids.length; i++) {
        cursor_array_elements.push(document.getElementById(cursor_array_ids[i]));
    }


    alloptions = document.getElementsByClassName("options");
    alloff = document.getElementById("alloff");


    for (var i = 0; i < cursor_array_elements.length-1; i++) {
        cursor_array_elements[i].addEventListener('click', Popup.cursorClick.bind(null,i));
    }

    alloff.addEventListener('click', Popup.alloffClick );

    chrome.storage.sync.get(["selected_cursor_id"], function(items) {
        current_cursor_id = items.selected_cursor_id;
        if(typeof current_cursor_id !== 'undefined' && current_cursor_id>=0){

            $('body').removeClass(remove_class_str_with_spaces);
            $('body').addClass(cursor_array_ids[current_cursor_id]);

            cursor_array_elements[current_cursor_id].classList.add("selected");
            Popup.updateIcon(current_cursor_id);

        }
    });

    $(".cursor").hover(
        function(){
            that = this;
            addCursorHoverClass(that);
            changeHoverClassTimer = setInterval(function(){changeHoverHandler(that);}, 750);

        },
        function(){
            removeCursorHoverClass(this);
            clearInterval(changeHoverClassTimer);
        });
});

Popup.showError();

function changeHoverHandler(elem){
    if(!isDisplayingHoverCursor)
        addCursorHoverClass(elem);
    else
        removeCursorHoverClass(elem);
}
function addCursorHoverClass(elem){
    $(elem).addClass('cursorsHover');
    isDisplayingHoverCursor=true;
}
function removeCursorHoverClass(elem){
    $(elem).removeClass('cursorsHover');
    isDisplayingHoverCursor=false;
}
