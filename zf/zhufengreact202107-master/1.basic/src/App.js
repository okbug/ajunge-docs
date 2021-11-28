
export let element = <h2>hello</h2>

/**
 * 在此文件里没有引入 React
 * 但经过babel
 * React.createElement();
 *
 * 如果你引入了React
 * 在编写代码的阶段，因为代码没有用到React变量，有些工具eslint会报
 *
 */
