interface ILockObj {
    width?: number,
    height?: number
}
type TLock = ILockObj|boolean;
interface HTMLwithLockElement extends HTMLElement {
    lock?: TLock,
}
interface IDocumentCustom {
    div?: any,
    offsetX?: number,
    offsetY?: number
}
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
        dragOn: function (elem: HTMLAllCollection, lock: TLock) {
            Util_dragEle.eachEvent(elem, function (item: HTMLwithLockElement) {
                item.addEventListener("mousedown", Util_dragEle.mouseHandler);
                item.lock = lock;
            })
        },
        eachEvent: function (elem: HTMLAllCollection | HTMLElement, fn: any) {//fn实在不知道咋填
            if ((elem as HTMLAllCollection).length) {
                for (var item of (elem as HTMLAllCollection)) {
                    if (item instanceof HTMLElement)  fn(item);
                }
            } else if (elem instanceof HTMLElement)  fn(elem);
        },
        mouseHandler: function (e: MouseEvent) {
            if (e.type === "mousedown") {
                e.preventDefault();
                (document as IDocumentCustom).div = this;
                (document as IDocumentCustom).offsetX = e.offsetX;
                (document as IDocumentCustom).offsetY = e.offsetY;
                document.addEventListener("mousemove", Util_dragEle.mouseHandler);
                document.addEventListener("mouseup", Util_dragEle.mouseHandler);
            } else if (e.type === "mousemove") {
                var point = Util_dragEle.movelock((this as IDocumentCustom).div, e.clientX, e.clientY, ((<IDocumentCustom>this).offsetX as number), ((<IDocumentCustom>this).offsetY as number), (this as IDocumentCustom).div.lock);
                (this as IDocumentCustom).div.style.left = point.x + "px";
                (this as IDocumentCustom).div.style.top = point.y + "px";
            } else if (e.type === "mouseup") {
                document.removeEventListener("mousemove", Util_dragEle.mouseHandler);
                document.removeEventListener("mouseup", Util_dragEle.mouseHandler);
            }
        },
        movelock: function (div: HTMLElement, clientX: number, clientY: number, offsetX: number, offsetY: number, lock: TLock) {
            var rect = (div.parentElement as HTMLElement).getBoundingClientRect();
            var x = clientX - offsetX - rect.x;
            var y = clientY - offsetY - rect.y;
            // if (!lock) return { x: x, y: y }
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (typeof lock === "object") {
                if (!lock.width || lock.width < div.offsetWidth) x = 0;
                else if (x > lock.width - div.offsetWidth) x = lock.width - div.offsetWidth

                if (!lock.height || lock.height < div.offsetHeight) y = 0;
                else if (y > lock.height - div.offsetHeight) y = lock.height - div.offsetHeight;

                return { x: x, y: y };
            }
            if (x > rect.width - div.offsetWidth - (div.parentElement as HTMLElement).clientLeft * 2) x = rect.width - div.offsetWidth - (div.parentElement as HTMLElement).clientLeft * 2;
            if (y > rect.height - div.offsetHeight - (div.parentElement as HTMLElement).clientTop * 2) y = rect.height - div.offsetHeight - (div.parentElement as HTMLElement).clientTop * 2;
            
            return { x: x, y: y };
        }

    }
})();