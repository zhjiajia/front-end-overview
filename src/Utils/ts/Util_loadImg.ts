interface IHTMLImageElement extends HTMLImageElement {
    n: number,
    sourceArr: Array<string>,
    list: Array<HTMLElement>,
    callback: Function | null
}
interface IEventCustom extends Event {
    list?: Array<HTMLElement>
}
// 该组件的功能为 将图片加载并放入一个数组 可通过finish_load事件进一步对数组进行处理
/*  使用示例
    <script src="./Util_LoadImg.js"></script>
    <script>
        var arr=['img_1','img_2']
        // var arr=["img_27","img_28","img_2","img_30","img_1.jpeg","img_43.png"];
        Util_LoadImg.loadImage(arr,null,"./img",".jpg");
        // Util_LoadImg.loadImage(arr,list=>list.forEach(i=>{console.log(i.src)}),'./img','.jpg')
        document.addEventListener("finish_load",e=>{console.log(e.list)})
    </script> 
*/
var Utils = (function () {
    return {

        //加载图片
        loadImage: function (sourceArr: Array<string>, callback: Function | null, basePath: string, extension: string) {
            sourceArr = (this.judgeBasePath(basePath, sourceArr) as Array<string>);
            sourceArr = (this.judgeExtension(extension, sourceArr) as Array<string>)
            var img = new Image() as IHTMLImageElement;
            img.src = sourceArr[0];
            img.n = 0;
            img.sourceArr = sourceArr;  // 记录图片原先位置
            img.list = [];              // 存放加载完成后的图片
            img.callback = callback;
            img.addEventListener("load", this.loadHandler)
            img.addEventListener("error", this.errorHandler);
        },
        errorHandler: function (e: Event) {
            console.error((e.target as IHTMLImageElement).src + "地址错误");
            Utils.continueLoad(e.target as IHTMLImageElement);
        },
        loadHandler: function (e: Event) {
            (e.target as IHTMLImageElement).list.push((e.target as IHTMLImageElement).cloneNode(false) as HTMLElement);
            Utils.continueLoad(e.target as IHTMLImageElement);
        },
        continueLoad: function (img: IHTMLImageElement) {
            if (++img.n < img.sourceArr.length) return img.src = img.sourceArr[img.n];
                img.removeEventListener("load", Utils.loadHandler);
            if (img.callback) return img.callback(img.list);
            var evt: IEventCustom = new Event("finish_load");   // 若无回调 则抛发
            evt.list = img.list;
            document.dispatchEvent(evt);
        },
        judgeBasePath: function (basePath: string, sourceArr: Array<string>) {
            if (basePath) {
                if (!basePath.endsWith("/")) basePath += "/";
                return sourceArr.map(i=>basePath+i)
            }
        },
        judgeExtension: function (extension: string, sourceArr: Array<string>) {
            if (extension) {
                if (!extension.startsWith(".")) extension = "." + extension;
                return sourceArr.map(function (item) {
                    var index = item.lastIndexOf(".");
                    if (index < 0) return item + extension;
                    // 如果查找到的.是倒数第4或者第5位，这返回这个字符串，说明它有扩展名
                    if ([4, 5].includes(item.length - index)) return item;
                    return item + extension;
                })
            }
        }
    }
})();
