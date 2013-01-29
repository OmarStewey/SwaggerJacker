// On page load
var swaggerJacker = new SwaggerJacker();

// If library loaded
if (typeof (swaggerJacker) == "object") {

    // Fetch Tags
    $.when( swaggerJacker.fetchTags() ).done(function () {

        // Does page have tags
        if (swaggerJacker.tags.length > 0) {

            // Yes
            // Change extension icon
            chrome.browserAction.setIcon({
                path: 'tags_found_icon.png'
            });
        }
    });

    // Add Extension Button Click Event 
    chrome.browserAction.onClicked.addListener(function (tab) {

        if (!swaggerJacker.active) {

            // Load jQuery
            chrome.tabs.executeScript(tab, { file: 'jquery.min.js', allFrames: false }, function () {

                // Show Tagging Interface
                swaggerJacker.render(currentTab);

                // Tagging interface should allow user to:

                // Create new Tag
            });

        }
        else {

            // Toggle ui
            swaggerJacker.deactivate();

        }
    });
}