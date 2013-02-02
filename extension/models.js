
// Tag Object
// Has a score to allow users to vote tag up or down.
// Tags with a score below -x should not be rendered.

var Tag = function( argObj ){
    console.log(argObj);
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
	if(tagImg.length){
		var imgWrapper = tagImg;

		if(!tagImg.parent().hasClass('sjImageWrap')){	
		
			// Wrap in relatively positioned span
			tagImg.wrap('<span class="sjImageWrap sj_off" />');
			imgWrapper = tagImg.parent();

			// Add absolutely positioned tag marker
			// replace with template

			var imgOffset = tagImg.offset();

			imgWrapper
			.append('<span class="sj_tag" style="left: ' + ( this.coords.x - imgOffset.left ) + 'px; top: ' + ( this.coords.y - imgOffset.top )+ 'px; z-index:100" ><a href="' + this.description + '">' + this.title + '</a></span>');
		}else{
			imgWrapper = tagImg.parent();
		}

		
		imgWrapper.toggleClass('sj_off');

		var tag = imgWrapper.find('.sj_tag');

		// Popup ease animation
		tag.show();
	}
}


Tag.prototype.unrender = function(){
	
	var imgWrapper = this.img.parent();

	imgWrapper.find('.sj_tag').hide();
	imgWrapper.toggleClass('sj_off');
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