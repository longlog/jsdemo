(function () {
    var content; //存储之前的食物

    function Food(option) {
        option = option || {};
        this.width = option.width || 20;
        this.height = option.height || 20;
        this.x = option.x;
        this.y = option.y;
        this.bgc = option.bgc || 'salmon';
        //方块的数据
    }

    Food.prototype.drawing = function () {
        if (content) {
            box.removeChild(content);
        }
        var smallFood = document.createElement('div');
        content = smallFood;
        smallFood.style.width = this.width + 'px';
        smallFood.style.height = this.height + 'px';
        smallFood.style.position = 'absolute'; //给新创建的元素添加绝对定位
        smallFood.style.borderRadius = '50%';

        this.x = Tool.getRandom(0, box.offsetWidth / this.width - 1) * this.width;
        this.y = Tool.getRandom(0, box.offsetHeight / this.height - 1) * this.height;

        // console.log(this.x, this.y);

        smallFood.style.left = this.x + 'px';
        smallFood.style.top = this.y + 'px';
        smallFood.style.backgroundColor = this.bgc;

        box.appendChild(smallFood); //将元素添加到box中
    };

    window.Food = Food; //使在全局能够访问这个函数
})();

(function () {
    var arr = []; //存储数组

    function Snake(option) {
        option = option || {};
        this.width = option.width || 20;
        this.height = option.height || 20;
        this.body = [{
                //snake的头部
                x: 3,
                y: 1,
                color: 'red',
            },
            {
                x: 2,
                y: 1,
                color: 'blue',
            },
            {
                x: 1,
                y: 1,
                color: 'blue',
            },
        ];
        this.description = option.description || 'right';
    }
    Snake.prototype.drawing = function () {
        for (var i = 0; i < arr.length; i++) {
            box.removeChild(arr[i]);

        } //将元素渲染到页面之前 把前面的元素给移除
        arr = [] //清空数组
        this.body.forEach(
            function (item, indx) {
                //创建元素并添加到box中
                var snakeBody = document.createElement('div');
                arr.push(snakeBody); //将创建出来的元素存储放到数组中
                //snake.的样式
                snakeBody.style.width = this.width + 'px';
                snakeBody.style.height = this.height + 'px';
                snakeBody.style.position = 'absolute';
                snakeBody.style.borderRadius = '50%';
                snakeBody.style.left = item.x * this.width + 'px';
                snakeBody.style.top = item.y * this.height + 'px';
                snakeBody.style.backgroundColor = item.color;
                box.appendChild(snakeBody);
            }.bind(this)
        );
    };
    Snake.prototype.move = function () {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            // console.log(this.body[i].x)
            this.body[i].y = this.body[i - 1].y;
        }
        // this.body[0].x += 1; // 
        switch (this.description) {
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
        }

    };
    window.Snake = Snake;
})();


(function () {

    var timeId; //定时器

    function Game() {
        this.snake = new Snake();
        this.food = new Food();
    }
    Game.prototype.start = function () {
        this.food.drawing();
        this.snake.drawing();
        this.snake.move();

        timeId = setInterval(function () {
            this.snake.move();

            var maxX = (box.offsetWidth / this.snake.width - 1);
            var maxY = (box.offsetHeight / this.snake.height - 1); //snake最大的以移动范围

            snakeHeardx = this.snake.body[0].x;
            snakeHeardy = this.snake.body[0].y;
            // console.log(snakeHeardx)

            if (snakeHeardx < 0 || snakeHeardx > maxX || snakeHeardy < 0 || snakeHeardy > maxY) {
                clearInterval(timeId);
                alert("Game Over");
                return;
            }
            //获取蛇头的weizhi
            var snakex = snakeHeardx * this.snake.width;
            var snakey = snakeHeardy * this.snake.height;
            // console.log(snakex, snakey)
            //获取食物的位置

            var foodx = this.food.x;
            var foody = this.food.y;
            console.log(foodx, foody)

            if (foodx == snakex && foody == snakey) {
                console.log(1)
                this.food.drawing();
                var last = this.snake.body;

                last.push({
                    x: last[last.length - 1].x,
                    y: last[last.length - 1].y,
                    color: last[last.length - 1].color
                })
                console.log(last)

            }
            this.snake.drawing();
        }.bind(this), 200);


        document.onkeydown = function (e) {
            e = e || window.event;
            // console.log(e.keyCode);
            switch (e.keyCode) {
                case 87:
                    this.snake.description = 'top';
                    break;
                case 83:
                    this.snake.description = 'bottom';
                    break;
                case 65:
                    this.snake.description = 'left';
                    break;
                case 68:
                    this.snake.description = 'right';
                    break;
            } //获取的键盘的码数  并给description赋值
        }.bind(this)
    }
    window.Game = Game;
})()