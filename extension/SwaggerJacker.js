var SwaggerJacker = function () {

    var baseUrl = 'http://localhost:1042/api/Tags/';

    return {

        debug: true,

        config: {

            fetchUrl: baseUrl + 'Index',

            submitUrl: baseUrl + 'New',

            updateUrl: baseUrl + 'Update',

            minImageHeight: 30,

            minImageWidth: 30
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
                $(this).addClass('sjTaggable');
            }, function () {
                $(this).removeClass('sjTaggable');
            });


            pageImages.mousedown(function (e) {

                var currentImage = $(this);

                if (currentImage.hasClass('sjTaggable')) {

                    sjRef.addTag({
                        title: "Tag Title",

                        description: "Tag Description",

                        img: currentImage.attr("src"),

                        coords: { x: e.clientX, y: e.clientY },

                        url: location.href
                    });
                }
            })
        },

        render: function () {
            this.log('Rendering Swagger Jacker interface.');

            // Show Tags
            if (this.tags.length > 0) {
                this.showTags();
            }

            this.loadControls();

            this.active *= -1;
        },

        showTags: function () {
            this.log('Rendering ' + this.tags.length + ' tags.');

            // Each tag should render itself

            for (var i = 0; i <= this.tags.length; i++) {
                //this.renderTag(this.tags[i]);

            }
        },

        unrender: function (tab) {
            this.log('Un-Rendering Swagger Jacker interface.');
            if (this.tags.length > 0) {
                this.hideTags();
            }
        },

        hideTags: function (tab) {
            this.log('Un-Rendering ' + this.tags.length + ' tags.');

            // Each tag should un-render itself
            for (var i = 0; i <= this.tags.length; i++) {
                this.tags[i].unrender();
            };
        },

        renderTag: function (tag) {
            // Get image
            var tagImg = tag.img;
            var imgWrapper = tag.img;

            if (imgWrapper.parent().eq(0).tagName != "body")
                imgWrapper = imgWrapper.parent();

            // Check if wrapped
            if (!imgWrapper.hasClass('sjImageWrap')) {

                // Wrap in relatively positioned span
                imgWrapper = tagImg.wrap('<span class="sjImageWrap" />');
            }

            // Add absolutely positioned tag marker
            // replace with template
            imgWrapper
                .append('<span title="' + tag.title + '" class="sj_tag" style="left: ' + tag.coords.x + 'px; top: ' + tag.coords.y + 'px;">' + tag.title + '</span>');
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
