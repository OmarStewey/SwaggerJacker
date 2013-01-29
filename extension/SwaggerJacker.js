var Swagger_Jacker = {

	config: {

		baseUrl: 'http://www.site.com/swaggerjacker/api/',

		fetchUrl: this.baseUrl + 'Tags',

		submitUrl: this.baseUrl + 'New',
		
		updateUrl: this.baseUrl + 'Update',
	},

	active: -1,

	tags: [],

	addTag: function( tagInfo ){

		// Post new tag
		$.ajax( {
			url: this.submitUrl,
			type: 'post',
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

		} ).done( function( data ){
			
			var newTag = new Tag({
				url: data.url,

				title: data.title,

				coords: data.coords,

				img: data.img,

				score: data.score 
			} );

			newTag.render();
		});
	},

	render: function( tab ){
		this.log( 'Rendering Swagger Jacker interface.' );

		// Show Tags
		this.showTags( tab );		

		this.active *= -1;
	},

	showTags: function( tab ){
		this.log( 'Rendering ' + this.tags.length + ' tags.' );

		// Each tag should render itself
		for (var i = 0; i <= this.tags.length; i++) {
			this.tags[i].render();	
		});	
	},
	
	unrender: function( tab ){
		this.log( 'Un-Rendering Swagger Jacker interface.' );		

		this.hideTags();
	},

	hideTags: function( tab ){
		this.log( 'Un-Rendering ' + this.tags.length + ' tags.' );

		// Each tag should un-render itself
		for (var i = 0; i <= this.tags.length; i++) {
			this.tags[i].unrender();	
		});		
	},

	deactivate: function(){
		this.unrender();
		this.active *= -1;
	},

	log: function( msg ){

		if( this.debug ){
			console.log( 'sj_debugger: ' + msg );
		}
	}
};
