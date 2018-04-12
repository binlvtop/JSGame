(function() {
    var Map = window.Map = function() {
        //Map类为使活动砖块标记为非活动砖块，并渲染到Game中的table上
        this.code = (function() {
            //通过循环创建一个数组，这个数组中保存不活动的块
            var arr = [];
            for (var i = 0; i < 20; i++) {
                arr.push([]);
                for (var j = 0; j < 12; j++) {
                    //arr[i]是内层数组，可以打点使用push方法
                    arr[i].push(0);
                };
            };
            // // 来一个一柱擎天，方便调试
            // arr[10][5] = "I";
            // arr[11][5] = "I";
            // arr[12][5] = "I";
            // arr[13][5] = "I";
            // arr[14][5] = "I";
            // arr[15][5] = "I";
            // arr[16][5] = "I";
            // arr[17][5] = "I";
            // arr[18][5] = "I";
            // arr[19][5] = "I";

            //再新增一行全为1的项，表示block已经触底
            // 通过fill方法，这是ES6中新增的语法
            arr.push(Array(12).fill(1));
            return arr;
        })();
    }
    Map.prototype.render = function() {
        //render为使非活动砖块渲染到Game的table上
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 12; j++) {
                if (this.code[i][j] != 0) {
                    game.setClass(i, j, this.code[i][j]);
                }
            }
        }
    }
})()