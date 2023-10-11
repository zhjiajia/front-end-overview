export default class Util_EleCRUD {
    /*
        注意 若parent参数为str 则采用querySelector方式获取  若需要 应该为ById
        使用示例
            import Util_EleCRUD from "./Util_EleCRUD.js";
            export default class A extends EventTarget{
                elem;
                constructor(type){
                    super();
                    this.elem = Util_EleCRUD.createElement(type)
                }
            }
            var a = new A('div')
            Util_EleCRUD.appendTo(a.elem,'body')
    */
    static createElement(type, className = ' ', parent) {
        if (typeof parent === 'string')
            parent = document.querySelector(parent);
        var elem = document.createElement(type);
        elem.className = className;
        if (parent instanceof HTMLElement)
            parent.appendChild(elem);
        return elem;
    }
    static appendTo(elem, parent) {
        if (typeof parent === "string")
            parent = document.querySelector(parent);
        parent.appendChild(elem);
        return parent;
    }
    static insertTo(elem, parent, nextElement) {
        if (typeof parent === "string")
            parent = document.querySelector(parent);
        if (typeof nextElement === "string")
            nextElement = document.querySelector(nextElement);
        if (parent instanceof HTMLElement && nextElement instanceof HTMLElement)
            parent.insertBefore(elem, nextElement);
    }
}
