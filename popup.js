
var spotifyURL = "https://open.spotify.com/";
function gotoweb() {
  chrome.tabs.query({ url: spotifyURL + "*" }, function(tabs){
    if(tabs.length > 0){
      var winID = tabs[0].windowId;
    chrome.windows.update(winID, { focused: true });   		
        chrome.tabs.update(tabs[0].id, { active: true });
        tabID = tabs[0].id;
        // exto(tabs);
        var readTitle = tabs[0].title;
        console.log(readTitle);
        var detail = document.getElementById('now');
        detail.textContent = readTitle;
        chrome.browserAction.setTitle({title: readTitle})
    }else{
        chrome.tabs.create({url: spotifyURL, pinned: true});
      // console.log('log: Created new Window chat!');
    }
});	
}
document.getElementById('goto').addEventListener('click', gotoweb);