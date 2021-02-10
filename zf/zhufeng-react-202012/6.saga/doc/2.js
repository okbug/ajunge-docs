
function runSaga(a,b){
    console.log(a,b);
}
let boundRunSaga = runSaga.bind(null,1);
boundRunSaga(2);
