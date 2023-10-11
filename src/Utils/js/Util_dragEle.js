"use strict";
/*
    组件功能
        为elem或elem的子元素添加可拖拽功能
        movelock则限制了拖拽的范围
    使用示例
        var divs=document.querySelectorAll(".div1>div");
        Utils.dragOn(divs,{width:300});  // 第二个参数即为拖拽的范围
*/
var Util_dragEle = (function () {
    return {
        //拖拽
        dragOn: function (elem, lock) {
            Util_dragEle.eachEvent(elem, function (item) {
                item.addEventListener("mousedown", Util_dragEle.mouseHandler);
                item.lock = lock;
            });
        },
        eachEvent: function (elem, fn) {
            if (elem.length) {
                for (var item of elem) {
                    if (item instanceof HTMLElement)
                        fn(item);
                }
            }
            else if (elem instanceof HTMLElement)
                fn(elem);
        },
        mouseHandler: function (e) {
            if (e.type === "mousedown") {
                e.preventDefault();
                document.div = this;
                document.offsetX = e.offsetX;
                document.offsetY = e.offsetY;
                document.addEventListener("mousemove", Util_dragEle.mouseHandler);
                document.addEventListener("mouseup", Util_dragEle.mouseHandler);
            }
            else if (e.type === "mousemove") {
                var point = Util_dragEle.movelock(this.div, e.clientX, e.clientY, this.offsetX, this.offsetY, this.div.lock);
                this.div.style.left = point.x + "px";
                this.div.style.top = point.y + "px";
            }
            else if (e.type === "mouseup") {
                document.removeEventListener("mousemove", Util_dragEle.mouseHandler);
                document.removeEventListener("mouseup", Util_dragEle.mouseHandler);
            }
        },
        movelock: function (div, clientX, clientY, offsetX, offsetY, lock) {
            var rect = div.parentElement.getBoundingClientRect();
            var x = clientX - offsetX - rect.x;
            var y = clientY - offsetY - rect.y;
            // if (!lock) return { x: x, y: y }
            if (x < 0)
                x = 0;
            if (y < 0)
                y = 0;
            if (typeof lock === "object") {
                if (!lock.width || lock.width < div.offsetWidth)
                    x = 0;
                else if (x > lock.width - div.offsetWidth)
                    x = lock.width - div.offsetWidth;
                if (!lock.height || lock.height < div.offsetHeight)
                    y = 0;
                else if (y > lock.height - div.offsetHeight)
                    y = lock.height - div.offsetHeight;
                return { x: x, y: y };
            }
            if (x > rect.width - div.offsetWidth - div.parentElement.clientLeft * 2)
                x = rect.width - div.offsetWidth - div.parentElement.clientLeft * 2;
            if (y > rect.height - div.offsetHeight - div.parentElement.clientTop * 2)
                y = rect.height - div.offsetHeight - div.parentElement.clientTop * 2;
            return { x: x, y: y };
        }
    };
})();
