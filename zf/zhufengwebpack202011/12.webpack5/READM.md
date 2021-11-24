## 1.文件缓存的原理这这样的
- 它会在编译完成后，对当前的编译的源文件生成一快照
- 包括相关的文件名的hash值和时间戳
- 默认会有一个配置
- 下次再编译的时候会判断hash值 和时间戳有无变化，如果没变化就会直接读上次的缓存

## 2.webpack5和cnpm是有冲突的
刚才说webpack都规则没有错，cnpm也没有错！到底是怎么回事 
- 以后如果webpack5的话，就不要再用cnpm
明白了，为什么cnpm这么做，还是他错了
npm+淘宝源
不要把缓存写到硬盘上


## 3.
不需要
-  file-loader  asset/resource 文件图片
-  url-loader  asset/inline
-  raw-loader  asset/source


limit还用设置吗 
Traveller
他是把这些loader内置了吗 
mao
4里面也可以用 
华仔
那以后还装这些loader吗 


没有从entry打包的chunk文件什么意思 
不是入口代码块

金馆长2020
改一下titl3呢? 


可是我们一般配置的就是打包后面有hash啊 

包名不变，内容变了，会不会获取不到最新的内容 
毛子哥
这不是所有的命名规则吗 
毛子哥
命名了filename是给什么的命名规则呢？ 


//hash有三种
1. hash 整个项目中只要有一个文件变化，它就变化
2. chunkHash
3. contentHash

老师我有个问题 淘宝源是做了定时任务不停的的取拉取资源包放在自己的服务器上？ 
是的
