(function() {
	var Game = window.Game = function() {
		this.init();
		this.bindEvent();
	}
	Game.prototype.init = function() {
		// 【第一步】得到画布
		this.canvas = document.getElementById("mycanvas");
		this.ctx = this.canvas.getContext("2d");
		// 【第二步】创建资源管理器
		this.res = {
			"bg_day": "images/background.png",
			"hero0": "images/hero0.png",
			"name": "images/name.png"
		};
		var self = this;
		var length = Object.keys(this.res).length;
		var count = 0;
		for (var i in this.res) {
			var image = new Image();
			image.src = this.res[i];
			this.res[i] = image;
			image.onload = function() {
				count++;
				// self.clear();
				// self.ctx.save();
				// self.ctx.font = "18px 微软雅黑";
				// self.ctx.fillStyle = "blue";
				self.ctx.fillText(`加载中${count}/${length}`, self.canvas.width / 2, 80);
				// self.ctx.restore();
				if (count == length) {
					// 加载完成，做主循环中的所有的业务
					self.start();
				}
			}
		};

	}
	Game.prototype.bindEvent = function() {
		var self = this,
			isLeft = 0,
			isRight = 0;
		//按键的timer
		// this.keyLeftTimer=0;this.keyRightTimer = 0;
		this.direction = "";
		$(document).keydown(function(event) {
			var event = event || window.event;
			// event.preventDefault();
			console.log(event);
			// console.log(KeyboardEvent.repeat);
			if (event.keyCode == 37) {
				// if(isLeft == 0){
				// 	 isLeft=1;
				// 	// self.keyLeftTimer = setInterval(function(){	
				// 	// 	game.plane.left();
				// 	// },30)
				// 	// self.direction= "left";
				// }
				self.direction = "left";
			} else if (event.keyCode == 39) {
				// if(isRight == 0){
				// 	// console.log(222);
				// 	isRight=1;
				// 	// self.keyRightTimer = setInterval(function(){
				// 	// 	game.plane.right();
				// 	// },30);
				// 	// self.direction="right"
				// }
				self.direction = "right"
			}
		});
		// $(document).keyup(function(){isLeft=0;isRight=0;clearInterval(self.keyLeftTimer);clearInterval(self.keyRightTimer);});
		$(document).keyup(function(event) {
			// event.preventDefault();
			self.direction = "";
		});
	}
	Game.prototype.start = function() {
		this.frame = 0;
		this.background = new Background();
		this.plane = new Plane();
		var self = this;
		this.timer = setInterval(function() {
			self.frame++;
			game.background.render();
			game.plane.render();
			if (self.direction == "left") {
				game.plane.left();
			} else if (self.direction == "right") {
				game.plane.right();
			}
			self.ctx.font = "16px 微软雅黑";
			self.ctx.fillText(self.frame, 10, 20);
		}, 16);

	}

})();