import { a, b } from './a'
export function add() {
  console.log(a + b)
}
a = a + 10;
b = b - 5;
export default {
  a, b
}
