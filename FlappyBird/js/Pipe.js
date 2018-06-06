(function () {
    var Pipe = window.Pipe = function(){
        // 两种管子，上管和下管
        this.pipeDown = game.res["pipe_down"];
        this.pipeUp = game.res["pipe_up"];
        this.x = game.canvas.width;
        // 上管子的高度是随机的
        this.pipeDownHeight = ~~(Math.random()*251)+50; //[50,300]
        // 间隙
        this.kongxi = 120;
        // 下管子的高度
        this.pipeUpHeight = game.canvas.height - 112 - this.pipeDownHeight - this.kongxi;
        game.pipeArr.push(this);
    }
    Pipe.prototype.render = function(){
        game.ctx.drawImage(this.pipeDown,
            0,
            400-this.pipeDownHeight,
            52,
            this.pipeDownHeight,
            this.x,
            0,
            52,
            this.pipeDownHeight
        );
        game.ctx.drawImage(this.pipeUp,
            0,
            0,
            52,
            this.pipeUpHeight,
            this.x,
            this.pipeDownHeight + this.kongxi,
            52,
            this.pipeUpHeight
        );
        // game.ctx.fillText(this.x1,this.x - 30 ,this.pipeDownHeight + 70);
        // game.ctx.fillText(this.x2,this.x + 50 ,this.pipeDownHeight + 70);
        // game.ctx.fillText(this.y1,this.x + 10 ,this.pipeDownHeight - 5);
        // game.ctx.fillText(this.y2,this.x + 10 ,this.pipeDownHeight + 135);
    }
    Pipe.prototype.update = function(){
        // 更新管子
        this.x -=  2;
        if( this.x < -300){
            // 释放数组中没有用的管子了
           for (var i = 0; i < game.pipeArr.length; i++) {

                if( game.pipeArr[i] == this){

                    game.pipeArr.splice(i,1);
                }
           };
        }

        // 管子的包围盒
        this.x1 = ~~(this.x);
        this.x2 = ~~(this.x + 52);
        this.y1 = ~~(this.pipeDownHeight);
        this.y2 = ~~(this.pipeDownHeight + this.kongxi);
        // 碰撞检测
        if( game.scene.bird.x2 > this.x1 && (game.scene.bird.y1 < this.y1 || game.scene.bird.y2 > this.y2) && game.scene.bird.x1 < this.x2 || game.scene.bird.y2 > game.canvas.height - 112){
                // 死亡之后，调用4号场景，小鸟下坠
                game.scene.sceneNumber = 4;
                game.scene.init(4);
        }
    }
})()