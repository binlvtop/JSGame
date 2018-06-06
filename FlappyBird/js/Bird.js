(function () {
    var Bird = window.Bird = function(){
        this.image = [game.res["bird0_0"],game.res["bird0_1"],game.res["bird0_2"]];
        this.y = 100;
        this.x = 100;
        // 下降的增量
        this.dy = 0.2;
        // 旋转的角度
        this.deg = 0;
        // 拍打翅膀
        this.wing = 0;
    }
    Bird.prototype.render = function(){
        // 改变鸟原点x,y 进行旋转
        game.ctx.save();
        //先把canvas原点坐标平移到小鸟的几何中心上。
        game.ctx.translate(this.x+24,this.y+24);
        game.ctx.rotate(this.deg);
        game.ctx.drawImage(this.image[this.wing],-24,-24);
        game.ctx.restore();

        // game.ctx.fillText(this.x1,this.x-20,this.y+30);
        // game.ctx.fillText(this.x2,this.x+40,this.y+30);
        // game.ctx.fillText(this.y1,this.x+10,this.y+5);
        // game.ctx.fillText(this.y2,this.x+10,this.y+55);
    };
    Bird.prototype.update = function(){
        // this.dy += 0.88;
        this.dy += 0.68;
        this.deg += 0.06;
        this.y += this.dy;
        game.f % 2 == 0 && this.wing++;
        if( this.wing > 2 ){
            this.wing = 0;
        }

        // 鸟的包围盒
        this.x1 = ~~(this.x + 6);
        this.x2 = ~~(this.x + 42);
        this.y1 = ~~(this.y + 10);
        this.y2 = ~~(this.y + 38);
        console.log(this.x1,this.x2,this.y1,this.y2);
    }
    Bird.prototype.fly = function(){
        // 小鸟向上飞
        this.dy = -10;
        this.deg = -1.28;
    }
})();

