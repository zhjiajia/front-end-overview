import IUpdate from "./IUpdate.js";

export default class TimeManager{
    // 涉及到了两种设计模式 1.单例模式
    // 2.观察者模式  animation不断的发布信息   update不停的收到订阅信息

    private static _instance:TimeManager;
    private list:Set<IUpdate>=new Set();
    private ids?:number;
    private constructor(){}
    // 单例模式
    public static get instance():TimeManager{
        return TimeManager._instance || (TimeManager._instance=new TimeManager());
    }
    // 添加新的需要添加时间管理的项
    public add(elem:IUpdate){
        this.list.add(elem);
        // 当队列中存在项 且animation未启动 则启动animation
        if(this.list.size>0 && !this.ids) this.animation();
    }
    // 移除项 
    public remove(elem:IUpdate){
        if(this.list.has(elem)) this.list.delete(elem);
        // 当队列为空 且animation已启动 则关闭animation
        if(this.list.size===0 && this.ids){
            cancelAnimationFrame(this.ids);
            this.ids=undefined;
        }
    }
    private animation(){
        // 每次请求动画帧 都会为每项执行其update方法
        this.ids=requestAnimationFrame(()=>this.animation());
        this.list.forEach(((i:IUpdate)=>i.update()))
    }
}
