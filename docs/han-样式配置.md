#全局样式配置

###引入预处理器（以scss举例）

####1.先引入相关loader

`npm i style-loader css-loader sass-loader node-sass`

#### 2.在webpack中引入相关的rule

```javascript
rules:[
 {test:/\.(scss|css)$/,
 loaders:["style-loader“,"css","sass"]
 }
]
```

####3.建立styles文件夹

```javascript
├── styles
   ├── index.scss //出口样式
   ├── base.scss //基本样式
   ├── global.scss //全局样式,规定主题颜色等
   ├── layout.scss //布局样式
   .....
```

index.scss

```javascript
import "./base.scss"
import "./layout.scss"
```

main.js

```javascript
import '@/styles/index.scss'
```

