var SwaggerJacker = function(){

    var baseUrl =  'http://localhost:1042/api/';
    
    return {

        debug: true,

        config: {

            fetchUrl: baseUrl + 'Tags',

            submitUrl: this.baseUrl + 'New',

            updateUrl: this.baseUrl + 'Update',
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
                    url: tagInfo.url,

                    title: tagInfo.title,

                    coords: {
                        x: tagInfo.coords.x,
                        y: tagInfo.coords.y
                    },

                    img: tagInfo.img,

                    score: 0
                }

            }).done(function (data) {

                var newTag = new Tag({
                    url: data.url,

                    title: data.title,

                    coords: data.coords,

                    img: data.img,

                    score: data.score
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

        render: function () {
            this.log('Rendering Swagger Jacker interface.');

            // Show Tags
            this.showTags();

            this.active *= -1;
        },

        showTags: function () {
            this.log('Rendering ' + this.tags.length + ' tags.');

            // Each tag should render itself
            for (var i = 0; i <= this.tags.length; i++) {
                this.renderTag(this.tags[i]);
            }
        },

        unrender: function (tab) {
            this.log('Un-Rendering Swagger Jacker interface.');

            this.hideTags();
        },

        hideTags: function (tab) {
            this.log('Un-Rendering ' + this.tags.length + ' tags.');

            // Each tag should un-render itself
            for (var i = 0; i <= this.tags.length; i++) {
                this.tags[i].unrender();
            };
        },

        renderTag: function( tag ){
            // Get image
            var tagImg = tag.img;
            var imgWrapper = tag.img;

            if (imgWrapper.parent().eq(0).tagName != "body")
                imgWrapper = imgWrapper.parent();

            // Check if wrapped
            if( !imgWrapper.hasClass('sjImageWrap') ){

                // Wrap in relatively positioned span
                imgWrapper = tagImg.wrap('<span class="sjImageWrap" />');
            }

            // Add absolutely positioned tag marker
            // replace with template
            imgWrapper
                .append('<span title="'+ tag.title +'" class="sj_tag" style="left: ' + tag.coords.x + 'px; top: ' + tag.coords.y + 'px;">' + tag.title + '</span>');
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
