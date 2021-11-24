let stats = {
    hash: '62f168b30178b2e7715e',//本次编译产出的hash值
    version: '5.39.1',//webpack的版本
    time: 90,//花费的时间
    builtAt: 1624169941774,//构建时间戳
    publicPath: 'auto',// '' 资源文件的访问路径
    outputPath: 'c:\\4.flow\\dist',//输出的目录
    assetsByChunkName: { main: ['main.js'] },//哪个代码块产出了哪个资源 资源跟产出的文件一般是1对1的
    assets: [//产出的资源
        {
            type: 'asset',
            name: 'main.js',
        }
    ],
    chunks: [//编译出的代码块
        {
            rendered: true,
            initial: true,
            entry: true,
            recorded: false,
            reason: undefined,
            size: 0,
            sizes: [Object: null prototype] {},
        names: [Array],
        idHints: [],
        runtime: [Array],
        files: [Array],
        auxiliaryFiles: [],
        hash: 'af45743264574de85003',
        childrenByOrder: [Object: null prototype] {},
        id: 'main',
        siblings: [],
        parents: [],
        children: [],
        modules: [],
        filteredModules: undefined,
        origins: [Array]
    }
  ],
modules: [],
    filteredModules: undefined,
        entrypoints: [Object: null prototype] {
    main: {
        name: 'main',
            chunks: [Array],
                assets: [Array],
                    filteredAssets: 0,
                        assetsSize: 99,
                            auxiliaryAssets: [],
                                filteredAuxiliaryAssets: 0,
                                    auxiliaryAssetsSize: 0,
                                        children: [Object: null prototype] { },
        childAssets: [Object: null prototype] { },
        isOverSizeLimit: false
    }
},
namedChunkGroups: [Object: null prototype] {
    main: {
        name: 'main',
            chunks: [Array],
                assets: [Array],
                    filteredAssets: 0,
                        assetsSize: 99,
                            auxiliaryAssets: [],
                                filteredAuxiliaryAssets: 0,
                                    auxiliaryAssetsSize: 0,
                                        children: [Object: null prototype] { },
        childAssets: [Object: null prototype] { },
        isOverSizeLimit: false
    }
},
errors: [
    {
        loc: 'main',
        message: "Module not found: Error: Can't resolve './src/index.js' in 'c:\\aproject\\zhufengwebpack202106\\4.flow'",
        details: "resolve './src/index.js' in 'c:\\aproject\\zhufengwebpack202106\\4.flow'\n" +
            '  using description file: c:\\aproject\\zhufengwebpack202106\\4.flow\\package.json (relative path: .)\n' +
            "    Field 'browser' doesn't contain a valid alias configuration\n" +
            '    using description file: c:\\aproject\\zhufengwebpack202106\\4.flow\\package.json (relative path: ./src/index.js)\n' +
            '      no extension\n' +
            "        Field 'browser' doesn't contain a valid alias configuration\n" +
            "        c:\\aproject\\zhufengwebpack202106\\4.flow\\src\\index.js doesn't exist\n" +
            '      .js\n' +
            "        Field 'browser' doesn't contain a valid alias configuration\n" +
            "        c:\\aproject\\zhufengwebpack202106\\4.flow\\src\\index.js.js doesn't exist\n" +
            '      .json\n' +
            "        Field 'browser' doesn't contain a valid alias configuration\n" +
            "        c:\\aproject\\zhufengwebpack202106\\4.flow\\src\\index.js.json doesn't exist\n" +
            '      .wasm\n' +
            "        Field 'browser' doesn't contain a valid alias configuration\n" +
            "        c:\\aproject\\zhufengwebpack202106\\4.flow\\src\\index.js.wasm doesn't exist\n" +
            '      as directory\n' +
            "        c:\\aproject\\zhufengwebpack202106\\4.flow\\src\\index.js doesn't exist",
        stack: "ModuleNotFoundError: Module not found: Error: Can't resolve './src/index.js' in 'c:\\aproject\\zhufengwebpack202106\\4.flow'\n" +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\Compilation.js:1768:28\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:732:13\n' +
            '    at eval (eval at create (c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:10:1)\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:274:22\n' +
            '    at eval (eval at create (c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:9:1)\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:403:22\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:117:11\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:648:24\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:802:8\n' +
            '    at c:\\aproject\\zhufengwebpack202106\\4.flow\\node_modules\\webpack\\lib\\NormalModuleFactory.js:922:5'
    }
],
    errorsCount: 1,
        warnings: [],
            warningsCount: 0,
                children: []
}

