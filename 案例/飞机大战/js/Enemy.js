// 三种飞机的数据
var enemyData = [{
    width: 34,
    height: 24,
    blood: 1,
    speed: 10,
    img: "./images/enemy1.png",
    dieImg: "./images/enemy1b.gif",
}, {
    width: 46,
    height: 60,
    blood: 5,
    speed: 5,
    img: "./images/enemy2.png",
    dieImg: "./images/enemy2b.gif",
}, {
    width: 110,
    height: 164,
    blood: 10,
    speed: 1,
    img: "./images/enemy3.png",
    dieImg: "./images/enemy3b.gif",
}]

// 敌机构造函数
function Enemy(type, game) {
    // 创建一个新属判断你是小中大飞机
    this.type = type
    this.obj = enemyData[type]

    // 飞机的尺寸
    this.width = this.obj.width;
    this.height = this.obj.height;

    // 飞机的速度
    this.speed = this.obj.speed

    this.left = -1200
    this.top = -1200

    // 飞机是否正在飞行
    this.isfly = false

    // 血量
    this.blood = this.obj.blood;

    // 两个图片路径
    this.src = this.obj.img;
    this.dieSrc = this.obj.dieImg;

    // 敌机在页面上的节点
    this.currentEnemy = null;

    // 飞机移动的计时器id
    this.moveTimer = null

    this.game = game

    this.createEnemy()
}

// 创建敌机的原型方法
Enemy.prototype.createEnemy = function () {
    // 创建敌机节点
    this.currentEnemy = document.createElement("img");

    // 添加样式属性
    this.currentEnemy.src = this.src;
    this.currentEnemy.style.width = this.width + "px";
    this.currentEnemy.style.height = this.height + "px";
    this.currentEnemy.style.position = "absolute"
    this.currentEnemy.style.left = this.left + "px";
    this.currentEnemy.style.top = this.top + "px";

    // 插入页面
    this.game.appendChild(this.currentEnemy);
}

Enemy.prototype.shootEnemy = function () {

    this.isfly = true

    // 飞机出现的位置
    var maxLeft = this.game.offsetWidth - this.width;
    this.left = Math.random() * maxLeft;
    this.top = -this.height;
    this.currentEnemy.style.left = this.left + "px";
    this.currentEnemy.style.top = this.top + "px";

    this.moveEnemy()
}


// 移动敌机的原型方法
// 移动顺便进行碰撞检测
Enemy.prototype.moveEnemy = function () {
    var self = this
    this.moveTimer = setInterval(function () {
        self.top += self.speed;

        if (self.top >= self.game.offsetHeight) {
            // 回收敌机
            self.reloadEnemy()
        }

        self.currentEnemy.style.top = self.top + 'px';
    }, 30)
}

// 回收敌机
Enemy.prototype.reloadEnemy = function () {
    this.isfly = false
    // 还原敌机血量
    this.blood = this.obj.blood
    // 还原图片
    this.currentEnemy.src = this.src
    clearInterval(this.moveTimer)
    this.currentEnemy.style.top = '-1200px';
}

// 敌机受伤
Enemy.prototype.hurt = function() {
    this.blood--
    if(this.blood <= 0) {
        this.boom()
    }
}

// 敌机爆炸
Enemy.prototype.boom = function() {
    this.currentEnemy.src = this.dieSrc

    clearInterval(this.moveTimer)

    var self = this
    setTimeout(function() {
        self.reloadEnemy()
    },400)
}

