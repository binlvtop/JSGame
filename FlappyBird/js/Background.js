(function () {
    var Background = window.Background = function(){
        this.image = game.res["bg_day"];
        this.x = 0;
    }
    Background.prototype.render = function(){
        game.ctx.save();
        game.ctx.fillStyle = "#4ec0ca";
        game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height-512);
        game.ctx.fill();
        game.ctx.restore();
        game.ctx.drawImage(this.image,this.x,game.canvas.height - 512);
        game.ctx.drawImage(this.image,this.x+288,game.canvas.height - 512);
        game.ctx.drawImage(this.image,this.x+288*2,game.canvas.height - 512);
    }
    Background.prototype.update = function(){
        this.x--;
        if( this.x < -288){
            this.x = 0;
        }
    }
})();