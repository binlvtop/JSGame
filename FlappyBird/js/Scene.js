(function () {
    var Scene = window.Scene = function(){
        //当前的场景的编号
        this.sceneNumber = 1;
        this.init(this.sceneNumber);
        this.bindEvent();
    };
    Scene.prototype.init = function(number){
    switch (number){

        case 1:
            this.background = new Background();
            this.land = new Land();
            // 初始化title位置
            this.titleY = -48;
            // 初始button的位置
            this.buttonY = game.canvas.height + 70;
            // 小鸟的初始位置
            this.birdY = 185;
            this.birdDirection = "down";
            break;
        case 2:
            this.background = new Background();
            this.land = new Land();
            this.readyY = -62;
            this.tutorialOpacity = 1;
            this.tutorialOpacityDirection = "down";
            break;
        case 3:
            this.background = new Background();
            this.land = new Land();
            this.bird = new Bird();
            break;
        case 4:
            // 小鸟死亡的爆炸动画，初始图片的编号
            this.boom = 0;
            break;
        }
    }
        Scene.prototype.render = function(){
        switch (this.sceneNumber){

            case 1:
                // 渲染和更新、背景 类
                this.background.render();
                this.background.update();
                this.land.render();
                this.land.update();
                // 渲染title
                game.ctx.drawImage(game.res["title"],(game.canvas.width - 178) /2 ,this.titleY);
                // 让title动起来 让button也动起来
                this.titleY += 2;
                if( this.titleY > 115){
                    this.titleY = 115;
                };
                this.buttonY -= 5;
                if( this.buttonY < 330){
                    this.buttonY = 330;
                }
                // 渲染button
                 game.ctx.drawImage(game.res["button_play"],(game.canvas.width - 116) /2 ,this.buttonY);
                 // 小鸟不停的上下动
                 if( this.birdDirection == "down"){
                    this.birdY+=1.2;
                    if( this.birdY > 205){
                        this.birdDirection = "up"
                    }
                 }else if (  this.birdDirection == "up"){
                    this.birdY-=1.2;
                    if( this.birdY < 185 ){
                        this.birdDirection = "down"
                    }
                 };
                 game.ctx.drawImage(game.res["bird0_0"],(game.canvas.width - 48) /2 , this.birdY);
                break;
            case 2:
                //教学场景动画
                this.background.render();
                this.background.update();
                this.land.render();
                this.land.update();

                this.readyY += 2;
                if( this.readyY > 180){
                    this.readyY = 180;
                    game.ctx.drawImage(game.res["bird0_0"],100,146);
                }
                game.ctx.drawImage(game.res["text_ready"],(game.canvas.width - 196 )/2,this.readyY);
                // 让一个物体闪烁的方法
                if(this.tutorialOpacityDirection == "down"){
                    this.tutorialOpacity -= 0.03;
                    if(  this.tutorialOpacity <= 0.03){
                        this.tutorialOpacityDirection = "up"
                    }
                }else if(this.tutorialOpacityDirection == "up"){
                    this.tutorialOpacity += 0.03;
                    if(  this.tutorialOpacity >= 1){
                        this.tutorialOpacityDirection = "down"
                    }
                }
                // globalAlpha 改变透明度
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.res["tutorial"],(game.canvas.width - 114) /2 , 250);
                game.ctx.restore();

                break;
            case 3:
                // 渲染和更新、背景 类
                this.background.render();
                this.background.update();
                this.land.render();
                this.land.update();
                game.f % 100 == 0 && new Pipe();
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                    game.pipeArr[i].update();
                };
                this.bird.render();
                this.bird.update();
                break;
            case 4:
                // 让所有的物体静止（update不要调用啦）
                this.background.render();
                this.land.render();
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                };
                this.bird.render();
                // 让鸟急速下滑
                this.bird.y += 20;
                // 保证小鸟的头是垂直向下的
                this.bird.deg += 0.5;
                if( this.bird.deg > 1.57){
                    this.bird.deg = 1.57
                }
                // 爆炸动画
                if( this.bird.y > game.canvas.height - 140){
                    this.bird.y = game.canvas.height - 140
                    game.f % 3 == 0 && this.boom++;
                    if( this.boom >= 11){
                        // 清空管子数组，为下一回做准备
                        game.pipeArr = [];
                        this.sceneNumber = 1;
                        this.init(1);

                    }
                    game.ctx.drawImage(game.res["b"+this.boom],this.bird.x ,this.bird.y - 90)
                }
                break;
        }
     }
    Scene.prototype.bindEvent = function(){
    var self = this;
    game.canvas.onmousedown = function(event){
        switch(self.sceneNumber){
            case 1:
                var zuo = (game.canvas.width - 116) / 2;
                var you = zuo + 116;
                var shang = 330;
                var xia = 400;
                if(self.buttonY == 330) {
                    if(event.offsetX >= zuo && event.offsetX <= you && event.offsetY <= xia && event.offsetY >= shang){
                            // 点击进入场景2
                            self.sceneNumber = 2;
                            self.init(self.sceneNumber);
                    }
                }
                break;
             case 2:
                var zuo = (game.canvas.width - 114) /2;
                var you = zuo + 114;
                var shang = 250;
                var xia = shang + 98;
                if(event.offsetX >= zuo && event.offsetX <= you && event.offsetY <= xia && event.offsetY >= shang){
                        // 点击进入场景3
                        self.sceneNumber = 3;
                        self.init(self.sceneNumber);
                }
                break;
            case 3:
                    self.bird.fly();
                break;
            case 4:
                break;
        }
    }
    }
})()