// 子弹构造函数
function Bullet() {
    // 子弹的尺寸
    this.width = 8;
    this.height = 16;
    // 复用子弹,定义isfly属性判断他是否在飞行
    this.isfly = false
    // 因为子弹是复用的,一开始我们将子弹藏起来
    this.left = -1000
    this.top = -1000

    // 子弹的图片路径
    this.src = "./images/bullet.png"
    // 子弹在页面中的元素
    this.currentBullet = null;
    // 子弹自己移动的方法
    this.moveTimer = null

    this.createBulletEle()
}

// 创建子弹元素的原型方法
Bullet.prototype.createBulletEle = function () {
    // 子弹节点
    this.currentBullet = document.createElement("img");
    // 添加样式属性
    this.currentBullet.src = this.src;
    this.currentBullet.style.width = this.width + "px";
    this.currentBullet.style.height = this.height + "px";
    this.currentBullet.style.position = "absolute";
    this.currentBullet.style.left = this.left + 'px';
    this.currentBullet.style.top = this.top + 'px';
    // 把元素插入到页面上
    game.appendChild(this.currentBullet);
}
// 子弹的发射方法
Bullet.prototype.shoot = function (plane, enemys) {
    this.isfly = true
    // 子弹出现的位置 
    this.left = plane.myPlane.offsetLeft + plane.myPlaneWidth / 2 - this.width / 2;
    this.top = plane.myPlane.offsetTop - this.height;
    // 将子弹放入飞机头部
    this.currentBullet.style.left = this.left + 'px';
    this.currentBullet.style.top = this.top + 'px';

    this.move(enemys)
}

// 移动子弹的原型方法
Bullet.prototype.move = function (enemys) {

    var self = this

    this.moveTimer = setInterval(function () {
        self.top -= 2;
        // 如果子弹超出屏幕之外
        if (self.top <= -self.height) {
            // 回收子弹
            self.reload()
        }

        self.currentBullet.style.top = self.top + "px";

        self.crashEnemy(enemys)
    }, 10)

}

Bullet.prototype.reload = function () {
    clearInterval(this.moveTimer)
    // 让该子弹待命
    this.isfly = false
    this.currentBullet.style.top = "-1000px";
}


// 检测子弹是否达到了敌机
Bullet.prototype.crashEnemy = function (enemys) {

    for (var i = 0; i < enemys.length; i++) {
        var e = enemys[i]
        
        if(e.blood > 0 && crash(e.currentEnemy, this.currentBullet)) {
            this.reload()
            e.hurt()
            break
        } 
    }

}

/*

// 检测 子弹碰撞飞机 的原型方法
Bullet.prototype.collision = function (index) {
    // 用当前移动的这颗子弹, 去和所有的敌机坐标做碰撞检测

    // 遍历所有的敌机
    for (var i = 0; i < enemys.length; i++) {
        if (this.left > enemys[i].left - this.width && this.left < enemys[i].left + enemys[i].width && this.top > enemys[i].top - this.height && this.top < enemys[i].top + enemys[i].height) {
            // 移除子弹的元素
            game.removeChild(this.currentBullet);
            // 移除数组中的当前子弹对象
            bullets.splice(index, 1);

            // 敌机减血
            enemys[i].blood--;
            // 敌机血量为0
            if (enemys[i].blood == 0) {

                // 创建死亡的敌机
                var dieEnemy = document.createElement("img");
                dieEnemy.src = enemys[i].dieSrc;
                dieEnemy.style.width = enemys[i].width + "px";
                dieEnemy.style.height = enemys[i].height + "px";
                dieEnemy.style.position = "absolute";
                dieEnemy.style.left = enemys[i].left + "px";
                dieEnemy.style.top = enemys[i].top + "px";
                // 插入页面
                game.appendChild(dieEnemy);
                // 一秒后移除
                setTimeout(function () {
                    game.removeChild(dieEnemy);
                }, 400)

                // 移除敌机
                game.removeChild(enemys[i].currentEnemy);
                enemys.splice(i, 1);
            }
        }
    }
}
*/