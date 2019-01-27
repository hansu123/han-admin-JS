# bootadmin

<h5>基于bootstrap的后台框架</h5>


一.完成了基本框架结构

二.图标引入问题

bootstrap4.0不再移除了.glyphicon图标，这一点确实很头疼。

没办法，不给我们，我们只能用更好的图标取而代之。

下面推荐的这个图标[awesome](http://www.bootcss.com/p/font-awesome/)，是我用过比较好用的，优点就不说了，大家点击官网进去看便是。

用法:

1.	下载文件，然后找到font文件和css中的font-awesome.min.css
2.	在html中头部引入即可
```
<link rel = “stylesheet” href = “../css/bootstrap.min.css” >  
<link rel = “stylesheet” href = “../css/font-awesome.min.css” >  
```

需要注意的是font-awesome.min中font的路径。最好把font文件放在font-awesome.min.css文件父级的同级目录中。

三.