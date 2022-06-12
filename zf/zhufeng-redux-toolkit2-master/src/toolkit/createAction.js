


function createAction(type,prepareAction){
    function actionCreator(args){
        if(prepareAction){
            let prepared = prepareAction(args);
            return {
                type,
                ...prepared
            }
        }
        return {
            type,
            payload:args
        }
    }
    actionCreator.toString = ()=>type;
    actionCreator.type = type;
    return actionCreator;
}
export default createAction;