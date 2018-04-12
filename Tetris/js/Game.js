(function() {
    var Game = window.Game = function() {
        //消除分数
        this.score = 0;
        //初始化构建表格上树
        this.init();
        this.block = new Block();
        this.map = new Map();
        //主循环
        this.start();
        //添加按键的事件监听
        this.bindEvent();
    }
    Game.prototype.init = function() {
        //dom为表格
        this.$dom = $("<table></table>");
        for (var i = 0; i < 20; i++) {
            //外层for循环控制行
            //由于行tr和列td都只是创建表格用，因此无需让其为Game属性，使用局部变量
            var trs = $("<tr></tr>");
            for (var j = 0; j < 12; j++) {
                //内层for循环控制列
                var tds = $("<td></td>");
                tds.appendTo(trs);
            }
            this.$dom.append(trs);
        }
        $("body").append(this.$dom);
    }
    Game.prototype.clear = function() {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 12; j++) {
                this.setClass(i, j, "");
            }
        }
    }
    Game.prototype.setClass = function(row, col, classname) {
        //找到对应的tr和td设置属性名
        $("tr").eq(row).children('td').eq(col).attr("class", classname);
    }
    Game.prototype.start = function() {
        var self = this;
        this.timer = setInterval(function() {
            //主循环  清屏 --> 更新 --> 渲染
            self.clear();
            self.block.update();
            self.block.render();
            //渲染非活动块
            self.map.render();
            //显示分数
            $("h1").html("分数：" + self.score);
        }, 500)
    }
    Game.prototype.bindEvent = function() {
        //监听按键事件
        var self = this;

        $(document).keydown(function(event) {
            event = event || window.event;
            if (event.keyCode == 37) {
                // 按下 方向左键 执行左移方法
                self.block.toLeft();

            } else if (event.keyCode == 38) {
                //按下 方向上键 执行旋转block方法
                self.block.rotate();
            } else if (event.keyCode == 39) {
                //按下 方向右键 执行右移方法
                self.block.toRight();

            } else if (event.keyCode == 40) {
                //按下 方向下键 执行快速下降方法
                self.block.fastDown();
            }
        })
    }
})()