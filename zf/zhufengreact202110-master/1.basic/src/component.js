
import { compareTwoVdom, findDOM } from './react-dom';
export let updateQueue = {
    isBatchingUpdate: false,//来控制更新是同步还是异步
    updaters: new Set(),//更新的数组
    batchUpdate() {//批量更新
        for (var updater of updateQueue.updaters) {
            updater.updateComponent();
        }
        updateQueue.isBatchingUpdate = false;
        updateQueue.updaters.clear();
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];
    }
    addState(partialState) {
        this.pendingStates.push(partialState);
        this.emitUpdate();
    }
    emitUpdate(nextProps) {
        this.nextProps = nextProps;
        if (updateQueue.isBatchingUpdate) {//说明当前处于批量列新模式
            updateQueue.updaters.add(this);
        } else {
            this.updateComponent();
        }
    }
    updateComponent() {
        let { nextProps, classInstance, pendingStates } = this;
        //如果属性更新的了，或者说状态更新了都会进行更新
        if (nextProps || pendingStates.length > 0) {
            shouldUpdate(classInstance, nextProps, this.getState());
        }
    }
    //基于老状态和pendingStates获取新状态
    getState() {
        let { classInstance, pendingStates } = this;
        let { state } = classInstance;//老状态
        pendingStates.forEach((nextState) => {
            if (typeof nextState === 'function') {
                nextState = nextState(state);
            }
            state = { ...state, ...nextState };
        });
        pendingStates.length = 0;
        return state;
    }
}
function shouldUpdate(classInstance, nextProps, nextState) {
    let willUpdate = true;
    //如果有shouldComponentUpdate方法，并且shouldComponentUpdate执行结果是false的话才会willUpdate=false
    if (classInstance.shouldComponentUpdate
        && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
        willUpdate = false;
    }
    if (willUpdate && classInstance.componentWillUpdate) {
        classInstance.componentWillUpdate();
    }
    if (nextProps) {
        classInstance.props = nextProps;
    }
    classInstance.state = nextState;//不管要不要更新，赋值都 会执行
    if (willUpdate) {//如果要更新，就会更新界面，否则 不更新
        classInstance.forceUpdate();
    }
}
class Component {
    static isReactComponent = true
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }
    setState(partialState) {
        this.updater.addState(partialState);
    }
    forceUpdate() {
        let oldRenderVdom = this.oldRenderVdom;//获取老的虚拟DOM
        let oldDOM = findDOM(oldRenderVdom);//获取老的真实DOM
        if (this.constructor.contextType) {
            this.context = this.constructor.contextType._currentValue;
        }
        if (this.constructor.getDerivedStateFromProps) {
            let newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
            if (newState) {
                this.state = { ...this.state, ...newState };
            }
        }
        let newRenderVdom = this.render();
        let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate();
        //此处的逻辑其实就是DOM-DIFF的逻辑
        compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
        this.oldRenderVdom = newRenderVdom;
        if (this.componentDidUpdate) {
            this.componentDidUpdate(this.props, this.state, snapshot);
        }
    }
}
export {
    Component
};
//因为函数组件和类组件都会在编译 后成为函数
//为了区分类组件和函数组件，给类组件的类型加一个静态属性isReactComponent=true
//子类继承父类不但会继续实例方法也会继承静态方法

/**
 * 更新原理
 * 1. 初次挂载的时候 已经在页面上放置了一个div
 * 2. 更新的时候 使用新的状态，重新render返回新的虚拟DOM，再使用新的虚拟DOM生成新的真实DOM
 * 3. 用新的真实DOM替换掉老的div就实现更新 了
 */