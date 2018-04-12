(function() {
    //Snake应该在哪调用？应该在创建Game时生成对应Snake实例
    var Snake = window.Snake = function() {
            //蛇要有初始大小，其身体通过给tr中的td上色来显示
            //且其身体不止一个，每个点都对应不同tr，td
            //因此为表示其整个身子，用数组存身子body，且每项中用JSON，其中包括row和col的值
            this.body = [{ "row": 9, "col": 9 }, { "row": 10, "col": 9 }, { "row": 11, "col": 9 }];
            //蛇要运动，运动有方向
            this.direction = "U";
            //记录蛇原来运行方向的变量
            this.olddirection = "U";
            //给蛇一个渲染的方法
            // this.render();
            this.changeDirection();
        }
        //渲染身体的方法
    Snake.prototype.render = function() {
            //遍历其body，给每项都上色
            //头部颜色不一样
            game.changeColor(this.body[0].row, this.body[0].col, "gray");
            for (var i = 1; i < this.body.length; i++) {
                //通过调用Game的changeColor方法来变色显示身体

                game.changeColor(this.body[i].row, this.body[i].col, "black");
                //但是，game是通过new Game()返回的对象,而Snake为Game中创建实例，即要使用game，但此时game还未返回
                //解决方法有两种 ①实例化snake是在Game中，因此可将Game实例通过参数传给snake，然后snake接收后给render就能使用其chuangColor方法
                //              this.snake = new Snake(this); 然后 this.render(Game实例) 最后再 Game实例.changeColor
                //             ②通过异步的定时器，因为异步的定时器执行在正常之后，因此在Game主循环的start的定时器中调用snake的render方法
                //              且该方法符合 游戏中每一帧 “ 去除 -> 更新 -> 渲染 ” 的思路
            }
        }
        //蛇改变方向的方法
    Snake.prototype.changeDirection = function() {
        var self = this;
        document.onkeydown = function(event) {
            var event = event || window.event;
            switch (event.keyCode) {
                case 37:
                    self.direction = "L";
                    break;
                case 38:
                    self.direction = "U";
                    break;
                case 39:
                    self.direction = "R";
                    break;
                case 40:
                    self.direction = "D";
                    break;
                default:
                    break;
            }
        }
    }
    Snake.prototype.checkDie = function() {
            // 检测是否撞到自己
            for (var i = 1; i < this.body.length; i++) {

                if (
                    this.body[0].row == this.body[i].row &&
                    this.body[0].col == this.body[i].col
                ) {
                    // 撞到自己了
                    return true;
                }
            };
            return false;
        }
        //蛇更新的方法--更新是在尾删然后头增
    Snake.prototype.update = function() {
        //由于向蛇向左移动的时候不能向右移动，即不能朝逆向移动，因此需要对direction进行修正
        //新增一个变量记录蛇原来方向，然后进行判断，如果与要改变的方向逆向，则修正
        if (
            this.olddirection == "U" && this.direction == "D" ||
            this.olddirection == "D" && this.direction == "U" ||
            this.olddirection == "R" && this.direction == "L" ||
            this.olddirection == "L" && this.direction == "R"
        ) {
            this.direction = this.olddirection;
        }
        //同时保证会一直记录原方向
        this.olddirection = this.direction;
        //根据direction的值不同头增尾删不同
        var head = {};
        switch (this.direction) {
            case "R":
                //头部unshift(),即改变当前body中第0项的row或col
                //向左移动时，行row不变，列col+1
                if (this.body[0].col == 19) {
                    head = { "row": this.body[0].row, "col": 0 }
                } else {
                    head = { "row": this.body[0].row, "col": this.body[0].col + 1 }
                }
                break;
            case "L":
                //向右移动时，行row不变，列col-1
                if (this.body[0].col == 0) {
                    head = { "row": this.body[0].row, "col": 19 }
                } else {
                    head = { "row": this.body[0].row, "col": this.body[0].col - 1 }
                }
                break;
            case "U":
                //向上移动时，行row-1，列col不变
                if (this.body[0].row == 0) {
                    head = { "row": 19, "col": this.body[0].col }
                } else {
                    head = { "row": this.body[0].row - 1, "col": this.body[0].col }
                }
                break;
            case "D":
                //向上移动时，行row+1，列col不变
                if (this.body[0].row == 19) {
                    head = { "row": 0, "col": this.body[0].col }
                } else {
                    head = { "row": this.body[0].row + 1, "col": this.body[0].col }
                }
                break;
            default:
                break;
        }
        this.body.unshift(head);
        if (game.food.checkEat()) {
            //如果检测到食物被吃了，则加分，并创建新食物
            game.score++;
            game.createNewFood();

        } else {
            this.body.pop();
        }
        // this.body.pop();
    }
})()