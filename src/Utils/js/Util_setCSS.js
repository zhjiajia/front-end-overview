export default class Util_setCSS {
    static setCSS(css) {
        if (document.styleSheets.length === 0 || !Array.from(document.querySelectorAll('style')).find(i => i.id === 'defined')) {
            // document.styleSheets 显然是等价的 document.querySelectorAll('style')
            var style = document.createElement("style");
            style.innerHTML = css;
            style.id = "defined";
            document.head.appendChild(style);
            return;
        }
        var styleSheet = Array.from(document.querySelectorAll('style')).find(item => item.id === 'defined');
        styleSheet.innerHTML += css;
    }
}
/*
    使用示例
    Util_setCSS.setCSS(`.goods{
        width: 240px;
    })
*/ 
