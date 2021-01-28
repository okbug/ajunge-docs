// 冒泡
let arr = [5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3]

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
console.log(bubbleSort([...arr]))
    // console.log(arr)

function quick_sort(arr) {
    if (arr.length < 2) {
        return nums
    } else {
        let left = []
        let right = []
        let mid = Math.floor(arr.length / 2)
        let base = arr.splice(mid, 1)[0]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < base) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
    }
    return quick_sort(left).concat([base], quick_sort(right))

}