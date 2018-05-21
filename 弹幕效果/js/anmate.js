function anmate(ele, end, change, time, fn) {
    if (ele.timeId) {
        //防止多次点 添加定时器
        clearInterval(ele.timeId);
    }
    ele.timeId = setInterval(function () {
        //将定时器的id赋值给 ele对象防止与解析 多次添加定时器
        var star = ele.offsetLeft;
        //获取对象的初始位置
        if (end - star >= 0) {
            //判断是否到达位置  来让对象减去change 还是加上change
            var fial = star + change;
        } else {
            var fial = star - change;
        }
        // 将改变后的位置fial赋值给对象
        ele.style.left = fial + 'px';

        if (Math.abs(end - fial) < change) {
            //目标值   -  现在的位置的值  小于 则说明快到了
            ele.style.left = end + 'px';
            clearInterval(ele.timeId);

            if ((typeof fn) === 'function') {
                //判断fn是不是函数
                fn();
            } else {
                throw new Error('bug');
            }
        }

    }, time)
}