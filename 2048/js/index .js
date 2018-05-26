(function () {
    function Box(option) {
        option = option || {};
        this.width = option.width || 100;
        this.height = option.height || 100;
        // this.bgc = option.bgc || 'red';
        this.x = option.x;
        this.y = option.y;
        this.direction = '';
    }
    Box.prototype.drawing = function () {
        //创建一个新的元素
        var numBox = document.createElement('p');

        numBox.style.width = this.width + 'px';
        numBox.style.height = this.height + 'px';
        numBox.style.position = 'absolute';
        numBox.style.borderRadius = '50%';
        numBox.innerText = parseInt(Tool.getRandom(1, 9));
        this.x = parseInt(Tool.getRandom(0, box.offsetWidth - 1) / this.width);
        this.y = parseInt(Tool.getRandom(0, box.offsetHeight - 1) / this.height);
        // console.log(this.x, this.y);
        numBox.style.backgroundColor = 'skyblue';
        numBox.style.left = this.x * this.width + 'px';
        numBox.style.top = this.y * this.height + 'px';

        box.appendChild(numBox);
    };
    Box.prototype.move = function () {
        // e = e || window.event;
        //在移动之前创建一个新
        document.onkeydown = function (e) {

            this.drawing(); //,每一移动一次就重新创建一个新的圆
            e = e || window.event;
            // console.log(e.keyCode);
            // console.log(box.children
            //获取按下 的键值
            switch (e.keyCode) {
                case 38:
                    this.direction = 'top';
                    break;
                case 37:
                    this.direction = 'left';
                    break;
                case 39:
                    this.direction = 'right';
                    break;
                case 40:
                    this.direction = 'bottom';
                    break;
            }
            var direction = this.direction;
            // console.log(box.children)
            // console.log(direction)
            //判断移动方向
            switch (direction) {
                case 'top':
                    for (var i = 0; i < box.children.length; i++) {
                        box.children[i].style.top = 0 + 'px';
                    }
                    break;
                case 'left':
                    for (var i = 0; i < box.children.length; i++) {
                        box.children[i].style.left = 0 + 'px';
                    }
                    break;
                case 'right':
                    for (var i = 0; i < box.children.length; i++) {
                        box.children[i].style.right = 0 + 'px';
                    }
                    break;
                case 'bottom':
                    for (var i = 0; i < box.children.length; i++) {
                        box.children[i].style.bottom = 0 + 'px';
                    }
                    break;
            }
        }.bind(this);
    };
    window.Box = Box;
})();