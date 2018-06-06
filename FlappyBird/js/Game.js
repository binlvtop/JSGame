(function() {
    var Game = window.Game = function  () {
        // 游戏的帧数
        this.f = 0;
        this.init();
        this.pipeArr = [];
        // this.bindEvent();
    }
    Game.prototype.init = function () {
        // 【第一步】得到画布
        this.canvas = document.getElementById("mycanvas");
        this.ctx = this.canvas.getContext("2d");
        // 【第二步】创建资源管理器
        this.res = {
            "bg_day":"images/bg_day.png",
            "land":"images/land.png",
            "pipe_down":"images/pipe_down.png",
            "pipe_up":"images/pipe_up.png",
            "bird0_0":"images/bird0_0.png",
            "bird0_1":"images/bird0_1.png",
            "bird0_2":"images/bird0_2.png",
            "title":"images/title.png",
            "button_play":"images/button_play.png",
            "tutorial":"images/tutorial.png",
            "text_ready":"images/text_ready.png",
            "b0":"images/b0.png",
            "b1":"images/b1.png",
            "b2":"images/b2.png",
            "b3":"images/b3.png",
            "b4":"images/b4.png",
            "b5":"images/b5.png",
            "b6":"images/b6.png",
            "b7":"images/b7.png",
            "b8":"images/b8.png",
            "b9":"images/b9.png",
            "b10":"images/b10.png",
            "b11":"images/b11.png"


        };
        var self = this;
        var length = Object.keys(this.res).length;
        var count = 0;
        for (var i in this.res) {
            var image = new Image();
            image.src = this.res[i];
            this.res[i] = image;
            image.onload = function () {
                count++;
                self.clear();
                self.ctx.save();
                self.ctx.font = "18px 微软雅黑";
                self.ctx.fillStyle = "blue";
                self.ctx.fillText(`加载中${count}/${length}`,self.canvas.width/2,80);
                self.ctx.restore();
                if(count == length){
                    // 加载完成，做主循环中的所有的业务
                    self.start();
                }
            }
        };
    };
    Game.prototype.clear = function () {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    };
    // Game.prototype.bindEvent = function(){
    //     var self = this;
    //     this.canvas.onmousedown = function(){
    //         self.bird.fly();
    //     }
    // }
    Game.prototype.start = function () {
        // 游戏的主体开始
        var self = this;
        // new背景类
        // this.background = new Background();
        // this.land = new Land();
        // this.bird = new Bird();
        this.scene = new Scene();
        this.timer = setInterval(function(){
            self.f++;
            self.clear();
            // 渲染和更新、背景 类
            // self.background.render();
            // self.background.update();
            // self.land.render();
            // self.land.update();
            // self.f % 100 == 0 && new Pipe();
            // for (var i = 0; i < self.pipeArr.length; i++) {
            //     self.pipeArr[i].render();
            //     self.pipeArr[i].update();
            // };
            // self.bird.render();
            // self.bird.update();
            self.scene.render();
            self.ctx.font = "16px 微软雅黑";
            self.ctx.fillText(self.f,10,20);
        },20)
    }
})()

// canvas中的图片是一层层的覆盖的。