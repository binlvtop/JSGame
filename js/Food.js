(function() {
    var Food = window.Food = function() {
        //需要食物类，食物一般都是在表格内某格子上随机生成，但有一个条件---不能在蛇身上生成
        while (true) {
            this.row = parseInt(Math.random() * 21); // [0,20]
            this.col = parseInt(Math.random() * 21); // [0,20]
            //判断食物的row和col是否在snake.body上
            for (var i = 0; i < game.snake.body.length; i++) {
                //遍历snake.body,对比row和col
                if (
                    game.snake.body[i].row == this.row &&
                    game.snake.body[i].col == this.col
                ) {
                    // 结束for循环
                    break;
                }
            };
            // 当i 等于蛇的长度的时候说明没有一组值和蛇的值一样，符合条件。
            if (i == game.snake.body.length) {
                // 结束while循环
                break;
            };
        }
        game.changeHTML(this.row, this.col, "♥");
    }
    Food.prototype.checkEat = function() {
        if (
            this.row == game.snake.body[0].row &&
            this.col == game.snake.body[0].col
        ) {
            return true;
        }
        return false;
    }
})()