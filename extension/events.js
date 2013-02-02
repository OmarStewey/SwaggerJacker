
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){

  // Reset Icon
  chrome.browserAction.setIcon({
          path: 'icon.png'
  });

  // Run SJ
  if(changeInfo.status == 'complete'){
    chrome.tabs.executeScript(null, {file: "background.js"});
  }

});

chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
      
      // Yes
      // Change extension icon
      if ( !!request.tagsFound ) {
          chrome.browserAction.setIcon({
              path: 'tags_found_icon.png'
          });
      }
      else {
          chrome.browserAction.setIcon({
              path: 'icon.png'
          });
      }
  });

// Add Extension Button Click Event 
chrome.browserAction.onClicked.addListener(function (tab) {

  chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(tab.id, { req: "func" }, function (response) {
          
      });
  });

});