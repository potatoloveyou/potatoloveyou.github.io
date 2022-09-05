/**
 * @description: 获取节点的方法
 * @return {*}
 * @param {string} selector css选择器
 */
function $(selector) {
    // 获取元素节点
    var ele = document.querySelectorAll(selector); // nodeList

    // 如果只有一个元素
    if (ele.length == 1) {
        return ele[0]
    } else {
        return ele;
    }
}

/**
 * @description: 获取元素样式
 * @return {*}
 * @param {{}} obj 元素节点
 * @param {string} attr 样式属性
 */
function getStyle(obj, attr) {
    // 考虑兼容, 获取元素样式
    return getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}

/**
 * @description: 绑定事件的方法
 * @return {*}
 * @param {{}} obj 元素节点
 * @param {string} sEven 事件类型
 * @param {function} fn 事件处理函数
 */
function addEvent(obj, sEven, fn) {
    // IE浏览器绑定事件
    if (obj.attachEvent) {
        obj.attachEvent("on" + sEven, fn);
    }
    // w3c标准浏览器绑定事件
    else {
        // false是不捕获, 即冒泡
        obj.addEventListener(sEven, fn, false);
    }
}
/**
 * 
*/


//---封装函数 碰撞检测 
//通过四个方向上的临界值来判断是否发生了碰撞 
function crash(div1, div2) {
    var xLeft = div2.offsetLeft - div1.offsetWidth;
    var xRight = div2.offsetLeft + div2.offsetWidth;
    var yTop = div2.offsetTop - div1.offsetHeight;
    var yBottom = div2.offsetTop + div2.offsetHeight;
    //只要div1 在这4个临界值内 那么就说明发生了碰撞 
    if (div1.offsetLeft >= xLeft && div1.offsetLeft <= xRight && div1.offsetTop >= yTop && div1.offsetTop <= yBottom) {
        return true;
    } else {
        return false;
    }
}