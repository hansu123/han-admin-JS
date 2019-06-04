



4.弹出框重构

页头：toolbar

toolbar中包含searchBar组件和button，放在slot插槽中

searchBar中显示要查询的form表单

通过传入值，去匹配对应的哪些form要显示

button包含搜索，添加和刷新按钮



table中表格点击修改和button中点击添加新增的处理。一个要传递当前行数据，一个不显示数据。