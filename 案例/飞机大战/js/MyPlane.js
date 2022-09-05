function MyPlane(selector) {
    // 我方飞机
    this.myPlane = $(selector);
    this.myPlaneWidth = this.myPlane.offsetWidth;
    this.myPlaneHeight = this.myPlane.offsetHeight;
}


// 让我方飞机移动
MyPlane.prototype.moveMyplane = function (game, box) {
    var self = this
    addEvent(game, "mousemove", function (evt) {
        // 获取鼠标坐标
        var left = evt.pageX - box.offsetLeft;
        var top = evt.pageY - box.offsetTop;

        // 把飞机的中心点移动到鼠标的位置
        left = left - self.myPlaneWidth / 2;
        top = top - self.myPlaneHeight / 2;

        // 最大边界
        var maxLeft = game.offsetWidth - self.myPlaneWidth;
        var maxTop = game.offsetHeight - self.myPlaneHeight;

        // 边界控制
        left = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
        top = top < 0 ? 0 : top > maxTop ? maxTop : top;

        // 移动飞机
        self.myPlane.style.left = left + "px";
        self.myPlane.style.top = top + "px";
    })
}