



###键盘修饰符



###事件修饰符



###特殊的修饰符

####.sync

在Vue中，子父组件最常用的通信方式就是通过props进行数据传递，props值只能在父组件中更新并传递给子组件，在子组件内部，是不允许改变传递进来的props值，这样做是为了保证数据单向流通。但有时候，我们会遇到一些场景，需要在子组件内部改变props属性值并更新到父组件中，这时就需要用到.sync修饰符。

应用场景：

父组件传递数据给子组件，子组件改变数据，父组件也要动态的改变数据。

方案1：

```javascript
//父组件
<child @changeMsg="changeMsg" :msg="msg"></child>
data(){
    return {
        msg:"hello"
    }
},
methods:{
    changeMsg(val){
        this.msg=val
    }
}
```

```javascript
//子组件
<div>{{msg}}</div>
<el-button @click="changeMsg">点击</el-button?
props:["msg],
methods:{
    changeMsg(val){
        this.$emit("changeMsg","world")
    }
}
```

方案2：

```javascript
//父组件
<child :msg.sync="msg"></child>
data(){
    return {
        msg:"hello"
    }
}
```

```javascript
//子组件
<div>{{msg}}</div>
<el-button @click="changeMsg">点击</el-button?
props:["msg],
methods:{
    changeMsg(val){
        this.$emit("update:msg","world")
    }
}
```



####.native

简单来说就是父组件想监听子组件的原生事件。

ex:

```html
<tempalte>
<div>
<children @click="handleClick">
</children>
</div>
</template>
export default{
methods:{
handleClick(){
console.log("hello")
}
}
}
```

点击会发现无效。

添加.native后

```html
<tempalte>
<div>
<children @click.native="handleClick">
</children>
</div>
</template>
export default{
methods:{
handleClick(){
console.log("hello")
}
}
}
```

有效