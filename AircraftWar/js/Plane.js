(function () {
	var Plane = window.Plane = function () {
		this.plane = game.res["hero0"];
		this.x = (game.canvas.width - 100) / 2;
	}
	//把背景图显然到canvas中
	Plane.prototype.render = function () {
		game.ctx.drawImage(this.plane,this.x,game.canvas.height - 124 - 20);
	}
	//飞机左移
	Plane.prototype.left = function () {
		this.x -=5;
		if(this.x <= 0){
			this.x = 0;
		}
		console.log("left");
	}
	//飞机右移
	Plane.prototype.right = function () {
		this.x +=5;
		if(this.x >= game.canvas.width - 100){
			this.x = game.canvas.width - 100;
		}
		console.log("right");

	}

})();