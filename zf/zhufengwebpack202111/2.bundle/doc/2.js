let obj = {};
let ageValue = 10;
Object.defineProperty(obj, 'age', {
    get() {
        return ageValue;
    },
    set(newValue) {
        ageValue = newValue;
    },
    enumerable: true,
    configurable: false
});
console.log(obj.age);
obj.age = 20;
console.log(obj.age);
console.log(Object.keys(obj));
for (let key in obj) {
    console.log(key);
}
delete obj.age;
console.log(obj.age);