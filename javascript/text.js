var TEXT = {
	init: function(ctx) {
		this.ctx = ctx;
		this.position = {
			x: 0,
			y: 0
		}
	},
	draw_text: function() {
		this.ctx.font = this.size + 'px test';
		this.ctx.fillText(this.text, this.position.x, this.position.y);
	},
	set_text: function(text, x, y, size) {
		this.text = text;
		this.size = size.toString();
		this.position.x = x;
		this.position.y = y;
	},
	reset_text: function() {
		this.text = '';
	}
}