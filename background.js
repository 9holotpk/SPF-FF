// DEV. EXTENTION BY iTON // => BACKGROUND.JS
// NOTE: Created new pinned tab.

var spotifyURL = "https://open.spotify.com/";
var clickCnt = 0;   // Click counter
var delay = 500;    // Maximum time (milliseconds) between clicks to be considered a double-click
var timer;

browser.browserAction.onClicked.addListener(function(tabs){
    clickCnt++; 
    if(clickCnt > 1){
        // Double-click detected
        browser.tabs.query({ url: spotifyURL + "*" }, function(tabs){
            if(tabs.length > 0){
                var winID = tabs[0].windowId;
                browser.tabs.remove(tabs[0].id);;
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
            browser.tabs.query({ url: spotifyURL + "*" }, function(tabs){
                if(tabs.length > 0){
                    var winID = tabs[0].windowId;
                    browser.windows.update(winID, { focused: true });   		
                    browser.tabs.update(tabs[0].id, { active: true });
                    tabID = tabs[0].id;
                }else{
                    browser.tabs.create({url: spotifyURL, pinned: true});
                    // console.log('log: Created new Window chat!');
                }
            });	
            clickCnt = 0;
        }, delay);
    }

    return true;
});

