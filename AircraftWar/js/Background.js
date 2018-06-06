(function () {
	var Background = window.Background = function (argument) {
		this.background = game.res["bg_day"];
		this.x = 0;
	}
	//把背景图显然到canvas中
	Background.prototype.render = function (argument) {
		game.ctx.drawImage(this.background,0,0);
	}

})();