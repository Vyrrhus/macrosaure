var TEXT = {
	init: function(ctx) {
		this.CONTEXT = ctx;
		this.IMAGE = IMAGE.FILES.TEXT;
		this.text_list = [];
		
	},
	add_text: function(sentence, size, x, y) {
		var new_text = new text(this.IMAGE, sentence, size, x, y, true);
		this.text_list.push(new_text);
		console.log(this.text_list);
	},
	animate: function(fps) {
		if (!this.text_list) {
			return
		}
		for (var i = 0 ; i < this.text_list.length ; i++) {
			console.log(this.text_list[i].text);
			this.text_list[i].draw(this.CONTEXT);
			
			this.text_list[i].set_opacity(fps);
			if (this.text_list[i].opacity == 0) {
				this.text_list.splice(i, 1);
			} else {
				this.text_list[i].draw(this.CONTEXT);
			}
		}
	},
	add_random: function(size, x, y) {
		console.log(1 - SETTINGS.TEXT.likelihood);
		console.log(this.text_list);
		if (Math.random() > 1 - SETTINGS.TEXT.likelihood && this.text_list.length == 0) {
			var sentence = SETTINGS.TEXT.content[getRandom(1, SETTINGS.TEXT.content.length)-1];
			this.add_text(sentence, size, x, y);
		}
	}
}

function text(image, text, size, x, y, in_bubble, options) {
	
	// Self
	var self = this;
	
	// Parameters
	this.text = ' ' + text.toUpperCase() + ' ';
	this.image = image;
	this.size = size;
	this.position = {
		x: x,
		y: y
	}
	
	// Animation
	this.opacity = 1;
	this.speed = 0.25	// decay/s
	this.acc = 0.25		// decay/s²
	
	// Bull
	this.in_bubble = in_bubble;
	if (options === undefined) {
		options = {};
	}
	
	// Font coefficients
	this.font = {
		height: 0.625,		// 16 PX ==> 10 PX de hauteur
		width: 0.125		// conversion pour 1 unité
	};
	
	// Text length
	this.get_length = function() {
		var length = 0;
		for (var i = 0 ; i < this.text.length ; i++) {
			var letter = this.text[i];
			if (i > 0) {
				length += this.font.width * this.size;
			}
			if (letter == ' ' || letter == ',') {
				length += this.font.width * 2 * this.size;
			} else if (letter == '.' || letter == '!' || letter == "'") {
				length += this.font.width * this.size; 
			} else if (letter == 'I' || letter == 'T') {
				length += this.font.width * 3 * this.size;
			} else if (letter == 'M' || letter == 'W') {
				length += this.font.width * 5 * this.size;
			} else {
				length += this.font.width * 4 * this.size;
			}
		}
		return length;
	}
	this.length = this.get_length();
	
	
	// Methods
	this.draw_text = function(ctx) {
		ctx.font = this.size.toString() + 'px pixel';
		ctx.fillText(this.text, this.position.x, this.position.y);
	};
	this.draw_bubble = function(ctx) {
		var sw = 4 * this.size / 16;
		var sh = 20 * this.size / 16;
		var y = this.position.y - this.size * this.font.height / 2 - sh / 2;
		var x = this.position.x;
		
		// Body
		while (x < this.position.x + this.length) {
			ctx.drawImage(this.image,
						  5, 0, 4, 20,
						  x, y, sw, sh);
			x += sw;
		}
		
		// Front
		ctx.drawImage(this.image,
					  0, 0, 4, 20,
					  this.position.x - sw, y, sw, sh);
		
		// Back
		ctx.drawImage(this.image,
					  10, 0, 4, 20,
					  x, y, sw, sh);
	};
	this.draw = function(ctx) {
		ctx.save();
		ctx.globalAlpha = this.opacity;
		this.draw_text(ctx);
		if (this.in_bubble) {
			this.draw_bubble(ctx);
		}
		ctx.restore();
	};
	this.set_opacity = function(fps) {
		var time = 1 / fps;
		this.speed += this.acc * time;
		this.opacity -= this.speed * time;
		if (this.opacity < 0) {
			this.opacity = 0;
		}
	}
}