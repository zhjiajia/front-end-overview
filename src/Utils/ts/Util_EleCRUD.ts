export default class Util_EleCRUD{
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
    public static createElement(type:string,className:string=' ',parent?:string|HTMLElement):HTMLElement{
        if(typeof parent==='string') parent=document.querySelector(parent) as HTMLElement;
        var elem=document.createElement(type);
        elem.className=className;
        if(parent instanceof HTMLElement) parent.appendChild(elem);
        return elem;
    }
    public static appendTo(elem:HTMLElement,parent:string|HTMLElement):HTMLElement
    {
        if(typeof parent==="string") parent=document.querySelector(parent) as HTMLElement;
        parent.appendChild(elem);
        return parent;
    }
    public static insertTo(elem:HTMLElement,parent:string|HTMLElement,nextElement:string|HTMLElement):void
    {
        if(typeof parent==="string") parent=document.querySelector(parent) as HTMLElement;
        if(typeof nextElement==="string") nextElement=document.querySelector(nextElement) as HTMLElement;
        if(parent instanceof HTMLElement && nextElement instanceof HTMLElement)
        parent.insertBefore(elem,nextElement);
    }
}
