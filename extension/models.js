
// Tag Object
// Has a score to allow users to vote tag up or down.
// Tags with a score below -x should not be rendered.

var Tag = function( argObj ){

	this.Id = argObj.Id;

	this.img = $( 'img[src="' + argObj.Img + '"]' ); // jQuery wrapped <img> tag.

	this.coords = {
		x: argObj.Coords.x,
		y: argObj.Coords.y
	};

	this.title = argObj.Title;
	this.description = argObj.Description;

	this.url = argObj.Url;

	this.score = argObj.Score;
}

// Tag methods
Tag.prototype.render = function(){
	
	// Get image
	var tagImg = this.img;
	var imgWrapper = tagImg.parent();

	// Check if wrapped
	if( !imgWrapper.hasClass('sjImageWrap') ){

		// Wrap in relatively positioned span
		imgWrapper = tagImg.wrap('<span class="sjImageWrap" />');
	}

	// Add absolutely positioned tag marker
	// replace with template
	imgWrapper
		.append('<span class="sj_tag" style="left: ' + this.coords.x + '; top: ' + this.coords.y + '" >' + tag.title + '</span>');
}

Tag.prototype.delete = function(){
	// remove tag from interface
}

Tag.prototype.upvote = function(){
	this.score -= 1;
	this.upate();
}

Tag.prototype.downvote = function(){
	this.score += 1;
	this.upate();
}

Tag.prototype.update = function(){

	// send to server (PUT)
	// only submit id and new score
	$.ajax({
		url: SwaggerJacker.config.updateUrl,
		
		data: {
			tagId: this.Id,
			score: this.score
		},

		type: 'put'
	}).done( function( data ){
		
		// Do stuff after updating score

	} );
}