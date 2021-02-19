export function mapState(stateArr) {
    let obj = {};
    for (let i = 0; i < stateArr.length; i++) {
        let stateName = stateArr[i];
        obj[stateName] = function() {
            return this.$store.state[stateName]
        }
    }
    return obj
}
export function mapGetters(gettersArr) {
    let obj = {};
    for (let i = 0; i < gettersArr.length; i++) {
        let gettName = gettersArr[i];
        obj[gettName] = function() {
            return this.$store.getters[gettName]
        }
    }
    return obj
}