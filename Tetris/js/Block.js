(function() {
    var Block = window.Block = function() {
        // 选择一个随机的形状
        // ~~的意思和parseInt()一样.
        this.allType = ["I", "L", "T", "Z", "S", "O", "J"][~~(Math.random() * 7)];
        // 该形状所有方向的个数
        this.allDirectionNumber = block_json[this.allType].length;
        // 随机出一个方向 就是选中某方向中的其中一项
        this.direction = ~~(Math.random() * this.allDirectionNumber);
        // 得到自己的code,即当前形态，二维数组，包括类型和方向
        this.code = block_json[this.allType][this.direction]

        this.row = 0;
        // 保证4*4的矩阵小格格从中间出来
        this.col = 4;
    }
    Block.prototype.update = function() {
        //块的更新方法，即让块能够在每帧下落
        //更新时还要检测是否死亡
        game.map.code[0].forEach(function(item) {
            if (item != 0) {
                clearInterval(game.timer);
                alert("游戏结束！");
                return;
            }
        });
        //让this.row ++
        //但row不能一直++，需要判断是否触碰到非活动块以及是否触底
        if (!this.checkStop(this.row + 1, this.col)) {
            //this.row+1的原因为做下一帧预判
            this.row++;
        } else {
            this.addDie();
            //让活动block变成非活动的block
            this.remove();
            //判断是否应该消行加分了
            game.block = new Block();
            //new出新的block
        }
    }
    Block.prototype.render = function() {
        //该函数为渲染block.json中的4*4矩阵，让其中为1的项对应格子上色
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.code[i][j] == 1) {
                    game.setClass(this.row + i, this.col + j, this.allType);
                }
            }
        }
    }
    Block.prototype.checkStop = function(row, col) {
        //检测Block是否应该停下
        //row和col表示当前row和col
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0) {
                    //if判断中判断block中的非零项是否和下一帧的map.code中的非零项重合,若触底了也是非零
                    return true;
                }
            }
        }
        return false;
    }
    Block.prototype.toRight = function() {
        //block块右移方法
        if (!this.checkStop(this.row, this.col + 1)) {
            //this.col+1的原因为做下一帧预判
            this.col++;
        }
    }
    Block.prototype.toLeft = function() {
        //block块左移方法
        if (!this.checkStop(this.row, this.col - 1)) {
            //this.col-1的原因为做下一帧预判
            this.col--;
        }
    }
    Block.prototype.rotate = function() {
        //block旋转方法，改变this.direction,也就是改变code数组中不同项
        var olddirection = this.direction;
        //备份当前方向，旋转前进行判断是否可以旋转，要排除旋转后会与map中的code重合
        if (this.direction == this.allDirectionNumber - 1) {
            this.direction = 0;
        } else {
            // if (!this.checkStop(this.row, this.col))
            this.direction++;
        }
        // 若果重新改变了方向记得把砖块的code再赋值一次
        this.code = block_json[this.allType][this.direction];
        //此时direction已经改变，需判断是否可以给code赋值
        if (this.checkStop(this.row, this.col)) {
            this.direction = olddirection;
            this.code = block_json[this.allType][this.direction];
        }


    }
    Block.prototype.fastDown = function() {
        //block快速下降方法，就是使this.row更快变大
        while (!this.checkStop(this.row + 1, this.col)) {
            this.row++;
        }
    }
    Block.prototype.addDie = function() {
        //让活动block变成非活动的block
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.code[i][j] !== 0) {
                    //让非活动的map的code数组对应的行列等于当前block的类型
                    game.map.code[i + this.row][j + this.col] = this.allType;
                }
            };
        };
    };
    Block.prototype.remove = function() {
        //消行加分函数
        for (var i = 0; i < 20; i++) {
            if (!game.map.code[i].includes(0)) {
                //判断非活动块的某行是否不包括0，即可以消除了
                //消除即为删除该行，并在头部再添加一行全0的项
                game.map.code.splice(i, 1);
                game.map.code.unshift(new Array(12).fill(0));
                game.score++;
                // document.getElementById("remove").play();
            }
        };
    };
})()