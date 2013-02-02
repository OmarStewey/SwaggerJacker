

if(typeof jQuery == 'function'){

        // On page load
        var swaggerJacker = new SwaggerJacker();

        // If library loaded
        if (typeof (swaggerJacker) == "object") {

            swaggerJacker.log('SJ Loaded.');

            // Fetch Tags
            $.when(swaggerJacker.fetchTags()).done(function () {

                swaggerJacker.log(swaggerJacker.tags.length + ' Tags found.')
                // Update icon if page has tags
                chrome.extension.sendMessage({ tagsFound: swaggerJacker.tags.length }, function (response) {
                });


            });


            // Handle extension click
            chrome.extension.onRequest.addListener(
                function (request, sender, sendResponse) {
                    
                 if (swaggerJacker.active != true ) {
                    
                     // Show Tagging Interface
                     swaggerJacker.render();

                     // Tagging interface should allow user to:

                     // Create new Tag


                 }
                 else {

                     // Toggle ui
                     swaggerJacker.deactivate();

                 }

             });


        }
    
}
else{
    console.error('jQuery not loaded.')
}