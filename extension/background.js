// On page load

// Load SwaggerJacker library
chrome.tabs.executeScript( tab, { file:'SwaggerJacker.min.js', allFrames:false }, function(){

// If library loaded
if( typeof ( SwaggerJacker ) == "object" ){

		// Fetch Tags
		SwaggerJacker.fetchTags ( currentTab.Url );

			// Does page have tags
			if( SwaggerJacker.Tags.length > 0 ){
				
				// Yes
				// Change extension icon
				chrome.browserAction.setIcon({
				  path: 'tags_found_icon.png'
				});
			}

				// Add Extension Button Click Event 
				chrome.browserAction.onClicked.addListener( function( tab ) {
					
					if ( !SwaggerJacker.active ){
					
					// Load jQuery
				    chrome.tabs.executeScript( tab, { file:'jquery.min.js', allFrames:false }, function(){

				    		// Show Tagging Interface
				    		SwaggerJacker.render( currentTab );

				    		// Tagging interface should allow user to:

				    			// Create new Tag
				    });

				    }
					else{

						// Toggle ui
						SwaggerJacker.deactivate();

					}
				});
			}
	}
});