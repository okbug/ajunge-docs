# setup执行的步骤
```ts
// packages/runtime-core/src/components.ts 
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
// 0. create render proxy property access cache
// 创建渲染代理属性连接缓存


// 1. create public instance / render proxy
// also mark it raw so it's never observed

// 创建公共实例或渲染代理
// 也标记它原生，未被代理过
	instance.proxy = markRaw()


// 2. call setup()
	const setupResult = setup();
	// 2.1. return the promise so server-renderer can wait on it

	// async setup returned Promise.
    // bail here and wait for re-entry.
};
```

