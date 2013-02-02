var SwaggerJacker = function () {

    var baseUrl = 'http://www.omarstewey.com/sj/api/Tags/';

    return {

        debug: true,

        config: {

            fetchUrl: baseUrl + 'Index',

            submitUrl: baseUrl + 'New',

            updateUrl: baseUrl + 'Update',

            minImageHeight: 30,

            minImageWidth: 30,

            overlayClass: '.sj_overlay',

            overlayMarkup: '<div class="sj_overlay" />'
        },

        active: -1,

        tags: [],

        addTag: function (tagInfo) {

            // Post new tag
            $.ajax({
                url: this.config.submitUrl,
                type: 'post',
                context: this,
                data: {
                    Url: tagInfo.url,

                    Title: tagInfo.title,

                    Description: tagInfo.description,

                    Coords: {
                        x: tagInfo.coords.x,
                        y: tagInfo.coords.y
                    },

                    Img: tagInfo.img,

                    Score: 0
                }

            }).done(function (data) {

                var newTag = new Tag({
                    Url: data.Url,

                    Title: data.Title,

                    Description: data.Description,

                    Coords: data.Coords,

                    Img: data.Img,

                    Score: data.Score
                });

                newTag.render();
            });
        },

        fetchTags: function () {
            
            this.log('Fetching tags for: ' + location.href);

            var status = $.Deferred();

            $.ajax({

                url: this.config.fetchUrl,

                data: {
                    url: location.href
                },

                context: this,

                type: 'get',

                dataType: 'json'

            }).done(function (pageTags) {

                this.log(pageTags);
                for (var i = 0; i < pageTags.length; i++) {
                    this.tags.push(new Tag(pageTags[i]));
                }
                status.resolve();
            });

            return status;
        },

        loadControls: function () {

            var sjRef = this;

            var pageImages = $('img').filter(function () {
                return (this.width > sjRef.config.minImageWidth && this.height > sjRef.config.minImageHeight)
            });

            pageImages.hover(function () {

                var img = $( this );
                var positioning = img.css('position');

                if( positioning != 'absolute' ){
                     img.css('position', 'relative');
                }
                $(this).addClass('sjTaggable');
            }, function () {
                $(this).removeClass('sjTaggable');
            });


            pageImages.click(function (e) {

            if( e.which == 1 )
            {
                e.preventDefault();

                var win = $(window);

                var currentImage = $(this);

                if (currentImage.hasClass('sjTaggable')) {


                    sjRef.addTag({
                        title: "Tag Title",

                        description: "Tag Description",

                        img: currentImage.attr("src"),

                        coords: { x: e.clientX + win.scrollLeft() , y: e.clientY + win.scrollTop() },

                        url: location.href
                    });
                }
            }
            })
        },

        unloadControls: function(){

            var sjRef = this;

            var pageImages = $('img').filter(function () {
                            return (this.width > sjRef.config.minImageWidth && this.height > sjRef.config.minImageHeight)
                        });

            pageImages.unbind('mouseenter mouseleave click');
        },

        render: function () {
            this.log('Rendering Swagger Jacker interface.');


            // Render overlay
            this.loadOverlay();

            // Show Tags
            if (this.tags.length > 0) {
                this.showTags();
            }

            this.loadControls();

            this.active *= -1;
        },


        loadOverlay: function(){
            this.log('Loading overlay');

            $('body')
                .append(this.config.overlayMarkup)
                .end().find(this.config.overlayClass).height($(document).height());
        },

        removeOverlay: function(){
            this.log('Removing overlay');
            $(this.config.overlayClass).remove();
        },

        showTags: function () {
            this.log('Rendering ' + this.tags.length + ' tags.');

            // Each tag should render itself

            for (var i = 0; i < this.tags.length; i++) {
                this.tags[i].render();
            }
        },

        unrender: function (tab) {
            this.log('Un-Rendering Swagger Jacker interface.');
            
            this.removeOverlay();

            this.unloadControls();

            if (this.tags.length > 0) {
                this.hideTags();
            }

        },

        hideTags: function (tab) {
            this.log('Un-Rendering ' + this.tags.length + ' tags.');

            // Each tag should un-render itself
            for (var i = 0; i < this.tags.length; i++) {
                this.tags[i].unrender();
            };
        },          

        deactivate: function () {
            this.unrender();
            this.active *= -1;
        },

        log: function (msg) {

            if (this.debug) {
                console.log('sj_debugger: ' + msg);
            }
        }
    }
};
