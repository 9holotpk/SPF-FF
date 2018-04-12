// DEV. EXTENTION BY iTON // => BACKGROUND.JS
// NOTE: Created new pinned tab.

var spotifyURL = "https://open.spotify.com/";
var clickCnt = 0;   // Click counter
var delay = 500;    // Maximum time (milliseconds) between clicks to be considered a double-click
var timer;

chrome.browserAction.onClicked.addListener(function(tabs){
    clickCnt++; 
    if(clickCnt > 1){
        // Double-click detected
        chrome.tabs.query({ url: spotifyURL + "*"}, function(tabs){
            if(tabs.length > 0){
                var winID = tabs[0].windowId;
                chrome.tabs.update(tabs[0].id, {pinned: false},  function(tabs) {
                    tabs.pinned = false;
                });
                chrome.tabs.remove(tabs[0].id);
                // console.log('remove: ', winID);
            }else{
            }
        });
        // console.log('Double-click');
        clickCnt = 0;
        clearTimeout(timer)
    }else{
        timer = setTimeout(function(){  
            // No clicked detected within (delay)ms, so consider this a single click 
            // console.log('Single-click');
            chrome.tabs.query({ url: spotifyURL + "*" }, function(tabs){
                if(tabs.length > 0){
                    var winID = tabs[0].windowId;
                    chrome.windows.update(winID, { focused: true });   		
                    chrome.tabs.update(tabs[0].id, { active: true });
                    tabID = tabs[0].id;
                }else{
                    chrome.tabs.create({url: spotifyURL, pinned: true});
                    // console.log('log: Created new Window chat!');
                }
            });	
            clickCnt = 0;
        }, delay);
    }

    return true;
});

