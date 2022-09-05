// 容器
var box = $(".box")
// 首页
var home = $(".home");
// 开始按钮
var startGame = $(".startGame");
// 游戏页
var game = $(".game");

// 创建一个飞机对象
var plane = new MyPlane(".myPlane")

// TODO: 闭包实现单例效果
var newGame = new Game(box, home, startGame, game, plane)

newGame.init()

