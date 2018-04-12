(function() {
    var Game = window.Game = function() {
            //创建背景，为一个表格，用table tr td 
            this.table = null;
            //创建食物
            this.food = null;
            //获得分数
            this.score = 0;
            //初始化创建表格
            this.init();
            //创建Snake实例
            this.snake = new Snake();
            //开启主循环函数
            this.start();
        }
        //在Snack的update中调用，用于创建新食物
    Game.prototype.createNewFood = function() {
            //首先删除当前食物
            this.changeHTML(this.food.row, this.food.col, "");
            //然后创建新的食物
            this.food = new Food();
        }
        //Game 的初始化方法，用于创建表格上树
    Game.prototype.init = function() {
            //创建大表格
            this.table = document.createElement("table");
            document.body.appendChild(this.table);
            //给表格添加tr和td上树，需要两层for循环控制
            for (var i = 0; i < 20; i++) {
                var tableTrs = document.createElement("tr");
                for (var j = 0; j < 20; j++) {
                    var tableTds = document.createElement("td");
                    tableTrs.appendChild(tableTds);
                }
                this.table.appendChild(tableTrs);
            }
        }
        //Game中暴露一个给表格中tr,td上颜色的方法给Snake用于渲染蛇的身体
    Game.prototype.changeColor = function(row, col, color) {
        //怎么改变颜色？①确定要改变的行和列---位置 ②改变该位置颜色color
        this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
    }
    Game.prototype.changeHTML = function(row, col, str) {
            //怎么改变颜色？①确定要改变的行和列---位置 ②改变该位置颜色color
            this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = str;
        }
        //清屏，让表格中颜色去掉
    Game.prototype.clear = function() {
        for (var row = 0; row < 20; row++) {
            for (var col = 0; col < 20; col++) {
                this.changeColor(row, col, " #FFF");
            }
        }
    }
    Game.prototype.start = function() {
        //凡是要使用定时器或事件时都需要先备份this当前对象Game实例
        var self = this;
        var timer = setInterval(function() {
            if (!self.food) {
                self.food = new Food();
            }
            //清屏操作
            self.clear();
            //更新蛇的位置用update方法
            self.snake.update();
            //当前对象实例中保存了snake实例，可直接调用并打点使用render渲染
            // self.snake.render();
            if (!self.snake.checkDie()) {
                // 若没有死亡，蛇可以继续渲染
                self.snake.render();
            } else {
                // 蛇死了
                clearInterval(self.timer);
                alert("Sorry,Game Over!,本次得分为：" + self.score)
            }
            document.querySelector("p").innerHTML = "当前游戏的分数是" + self.score;
        }, 200)
    }
})()