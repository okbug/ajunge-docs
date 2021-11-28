

function createChannel() {
    let listeners = [];
    function once(actionType, listener) {
        listener.actionType = actionType;
        listener.cancel = () => listeners = listeners.filter(item => item !== listener)
        listeners.push(listener);
    }
    function emit(action) {
        listeners.forEach(listener => {
            if (listener.actionType === action.type) {
                listener.cancel();
                listener(action);
            }
        });
    }
    return { once, emit };
}

export default createChannel;