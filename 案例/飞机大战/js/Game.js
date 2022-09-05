function Game(box, home, startGame, game, plane) {
    this.box = box
    this.home = home
    this.startGame = startGame
    this.game = game

    this.plane = plane

    // 存储敌机实例的数组
    this.enemys = [];
    // 存储子弹实例的数组
    this.bullets = [];

    // 背景移动计时器id
    this.moveBgTimer = null
    // 发射子弹计时器
    this.shootTimer = null
    // 发射敌机计时器
    this.shootEnemyTimer = null


}

Game.prototype.moveBg = function () {

    var self = this

    this.moveBgTimer = setInterval(function () {
        // 获取背景当前位置
        var bgLocal = parseInt(getStyle(self.game, "background-position-y"));

        // 如果背景移动到页面高度, 重新回到0
        if (bgLocal == self.game.offsetHeight) {
            self.game.style.backgroundPositionY = "0px"
        } else {
            self.game.style.backgroundPositionY = bgLocal + 1 + "px"
        }
    }, 8)
}
// 创建一个子弹库
Game.prototype.createBullets = function (count) {
    for (var index = 0; index < count; index++) {
        this.bullets.push(new Bullet())
    }
}

// 发射子弹
Game.prototype.shootBullets = function () {

    var self = this

    this.shootTimer = setInterval(function () {
        for (var index = 0; index < self.bullets.length; index++) {
            var b = self.bullets[index]
            if (!b.isfly) {
                b.shoot(self.plane, self.enemys)
                break
            }
        }
    }, 300)
}


// 创建一个敌机库
Game.prototype.createEnemys = function () {
    for (var index = 0; index < 40; index++) {
        this.enemys.push(new Enemy(0, this.game))
    }

    for (var index = 0; index < 35; index++) {
        this.enemys.push(new Enemy(1, this.game))
    }

    for (var index = 0; index < 10; index++) {
        this.enemys.push(new Enemy(2, this.game))
    }
}

// 发射敌机
Game.prototype.shootEnemys = function () {

    var self = this

    var index = 0

    this.shootEnemyTimer = setInterval(function () {
        index = (index + 1) % 15
        // 5个小飞机,发射一个中飞机
        // 15个小飞机,发射一个大飞机

        for (var i = 0; i < self.enemys.length; i++) {
            var b = self.enemys[i]
            // 小飞机直接飞
            if (!b.isfly && b.type == 0) {
                b.shootEnemy()
                break
            }
        }

        if (index % 5 === 0) {
            // 中飞机发射
            for (var i = 0; i < self.enemys.length; i++) {
                var b = self.enemys[i]
                // 小飞机直接飞
                if (b.type != 1) {
                    continue
                } else if (!b.isfly) {
                    b.shootEnemy()
                    break
                }

            }
        }

        if (index % 15 === 0) {
            // 中飞机发射
            for (var i = 0; i < self.enemys.length; i++) {
                var b = self.enemys[i]
                // 小飞机直接飞
                if (b.type != 2) {
                    continue
                } else if (!b.isfly) {
                    b.shootEnemy()
                    break
                }

            }
        }
    }, 400)
}


Game.prototype.init = function () {
    var self = this
    // 创建子弹库的方法
    this.createBullets(80)
    // 创建敌机库
    this.createEnemys()

    // 开始游戏
    addEvent(this.startGame, "click", function () {
        self.home.style.display = "none";
        // 移动背景
        self.moveBg();
        // 移动我方飞机
        self.plane.moveMyplane(self.game, self.box);
        // 发射子弹
        self.shootBullets()
        // 发射敌机
        self.shootEnemys()

    })
}



