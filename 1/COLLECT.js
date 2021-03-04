//技巧总结：

//1. element-ui upload 组件：选择文件弹出之前做提示，另外写个按钮，v-if 控制条件不成立就展示这个有提示功能的按钮，条件成立就展示上传的按钮；
//2. element-ui table 表格：其中一列全部是 Input 框，并与当前 row 进行 v-model 的数据双向绑定，注意 render 函数写法：render:()=>{}；
//3. element-ui upload 组件：手动打开上传弹框，this.$refs['excelUploader'].$refs['upload-inner'].handleClick();
//4. element-ui table 表格：
//控制 type="selection"的全选和全反选:
//el-table 标签上@select-all="tableAllSelect"
function tableAllSelect(rows) {
  console.log(rows); // 传入的已选中的行
  if (rows && rows.length === 0) {
    // 如果当前页面内容被全部取消勾选
    this.tableData.forEach((item) => {
      const index = this.selectData.findIndex((ele) => ele.id === item.id);
      if (index >= 0) {
        // 将当前页面数据与已选数据中匹配的项目删除
        this.selectData.splice(index, 1);
      }
    });
  } else if (rows && rows.length !== 0 && this.selectData.length !== 0) {
    // 如果当前页面被全选，且已选数据中有内容
    rows.forEach((row) => {
      const i = this.selectData.findIndex((ele) => ele.id === row.id);
      if (i < 0) {
        // 如果没有找到，就 push 到已选数据中
        this.selectData.push(row);
      }
    });
  } else if (rows && rows.length !== 0 && this.selectData.length === 0) {
    // 如果当前页面被全选，但已选数据没有内容，则将当前页面全部 push 到已选数据中
    rows.forEach((row) => {
      this.selectData.push(row);
    });
  }
}
