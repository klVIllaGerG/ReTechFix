<template>
  <div class="Myaddress">
    <el-button type="primary" @click="addLocationDialogVisible = true">新增地址信息</el-button>
        <el-button type="success" @click="openEditDialog(row)">修改地址信息</el-button>
    <el-button type="danger" @click="deleteLocation">删除地址信息</el-button>
    <el-table :data="displayedLocationData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" />
      <el-table-column prop="ID" label="地址ID" width="150" />
      <el-table-column prop="Location_Name" label="地址名" width="395" />
      <el-table-column prop="Loc_Detail" label="详细地址" width="395" />
    </el-table>
    <div class="pageChange">
      <el-pagination background layout="prev, pager, next" :total="totalOrders" :current-page="currentPage"
        :page-size="pageSize" @current-change="handlePageChange" />
    </div>
  </div>
  <!-- 修改弹窗 -->
  <el-dialog v-model="editDialogVisible" title="修改地址信息" :before-close="handleEditDialogClose">
    <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="80px">
      <el-form-item label="地址名" prop="Location_Name">
        <el-input v-model="editForm.Location_Name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="Loc_Detail">
        <el-input v-model="editForm.Loc_Detail"></el-input>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="handleEditDialogClose">取消</el-button>
      <el-button type="primary" @click="editLocation">确定</el-button>
    </span>
  </el-dialog>
      <!-- 新增弹窗 -->
      <el-dialog v-model="addLocationDialogVisible" title="新增地址信息" :before-close="handleAddLocationDialogClose">
      <el-form :model="newLocationForm" :rules="newLocationFormRules" ref="newLocationForm" label-width="100px">
        <el-form-item label="地址名" prop="Location_Name">
          <el-input v-model="newLocationForm.Location_Name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="Loc_Detail">
          <el-input v-model="newLocationForm.Loc_Detail"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="handleAddLocationDialogClose">取消</el-button>
        <el-button type="primary" @click="addLocation">确定</el-button>
      </span>
    </el-dialog>
</template>
  
<script>
import { ElMessageBox } from 'element-plus'
import { getLocationInfo, addLocationInfo, editLocationInfo, deleteLocationInfo } from '@/api/location.js'
import { mapState } from 'vuex';

export default {
  computed: {
    iconStyle() {
      return "font-size: 14px; margin-right: 5px;";
    },
    ...mapState(['userid']), // 获取 userid 数据
  },
  data() {
    return {
      tableData: [],
      ElMessageBox,
      displayedLocationData: [], // 存储需要展示的地址信息
      selectedData: [],//存储选中的行数据
      addLocationDialogVisible: false, // 新增地址信息弹窗可见性
      newLocationForm: {}, // 新增地址信息表单数据
      newLocationFormRules: {
        Location_Name: [{ required: true, message: '请输入地址名', trigger: 'blur' }],
        Loc_Detail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
      editForm: {}, // 修改表单数据
      editFormRules: {
        ExpectedPrice: [{ required: true, message: '请输入预期价格', trigger: 'blur' }],
        Recycle_Location: [{ required: true, message: '请输入回收地点', trigger: 'blur' }],
        Recycle_Time: [{ required: true, message: '请选择回收时间', trigger: 'change' }],
      },
      editDialogVisible: false, // 修改弹窗可见性
      totalOrders: 0, // 总订单数
      currentPage: 1, // 当前页码
      pageSize: 5,

    }
  },
  created() {
    console.log("尝试拿到地址信息");
    this.getLocationData()
      .then(() => {
        console.log("获取地址信息成功");
      })
      .catch((error) => {
        console.log("获取地址信息失败");
        console.error('Error:', error);
      });
  },

  methods: {
    handleSelectionChange(selectedRows) {
      // selectedRows 包含了用户当前选中的行的数据
      console.log(selectedRows); // 在控制台输出选中的行数据
      this.selectedData = selectedRows;
    },
    // 获取地址信息
    getLocationData() {
      return getLocationInfo(this.userid)
        .then((res) => {
          // 处理返回的数据
          this.totalOrders = res.data.Location.length;
          this.tableData = res.data.Location;
          this.updateDisplayedLocationData(); // 更新当前页面显示的数据
        })
        .catch((error) => {
          // 处理错误
          console.error('获取地址信息失败:', error);
        });
    },
    // 更新当前页面显示的数据
    updateDisplayedLocationData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedLocationData = this.tableData.slice(startIndex, endIndex);
    },
    // 处理分页切换
    handlePageChange(page) {
      this.currentPage = page;
      this.updateDisplayedLocationData(); // 更新当前页面显示的数据
    },

        // 打开新增地址信息弹窗
        handleAddLocationDialogClose() {
      this.addLocationDialogVisible = false;
      this.$refs.newLocationForm.clearValidate(); // 清除表单验证信息
    },

    // 新增地址信息
    addLocation() {
      this.$refs.newLocationForm.validate((valid) => {
        if (valid) {
          const newLocation = {
            Location_Name: this.newLocationForm.Location_Name,
            Loc_Detail: this.newLocationForm.Loc_Detail,
            uid: this.userid // 用户ID
          };
          addLocationInfo(newLocation)
            .then((res) => {
              // 处理成功
              console.log('新增地址信息成功:', res);
              this.handleAddLocationDialogClose();
              // 重新获取地址信息并刷新表格
              this.getLocationData();
            })
            .catch((error) => {
              // 处理错误
              console.error('新增地址信息失败:', error);
            });
        }
      });
    },


    isSelected(row) {
      return this.selectedData.includes(row);
    },

    // 打开修改弹窗
    openEditDialog(row) {
      this.editForm = { ...row };
      //this.editForm.ID = row.ID;
      this.editDialogVisible = true;
    },

    // 关闭修改弹窗
    handleEditDialogClose() {
      this.editDialogVisible = false;
      this.$refs.editForm.clearValidate(); // 清除表单验证信息
    },

    // 修改地址信息
    editLocation() {
      if (!this.selectedData[0]) {
        this.$message.error('未选中地址');
        return;
      }
      let params = {
        Location_Name: this.editForm.Location_Name,
        Loc_Detail: this.editForm.Loc_Detail,
      };
      console.log(this.userid)
      console.log(this.selectedData[0].ID)
      editLocationInfo(params, this.userid, this.selectedData[0].ID).then((res) => {
        console.log(res.data)

        if (res.data === false) {
          this.$message.error("保存失败");
        }
        else {
          this.$message.success("保存成功");
        }
      })
      this.handleEditDialogClose();
      this.getLocationData();
    },

// 删除地址信息
deleteLocation() {
  if (!this.selectedData[0]) {
    console.log('未选中地址');
    return;
  }

  // 弹出确认对话框
  this.ElMessageBox.confirm('确认删除选中的地址信息吗?', '提示', {
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口...
      deleteLocationInfo(this.selectedData[0].ID)
        .then((res) => {
          // 处理成功
          this.$message.success("删除成功");
          console.log('删除地址信息成功:', res);
          // 重新获取地址信息并刷新表格
          this.getLocationData();
        })
        .catch((error) => {
          // 处理错误
          this.$message.error("删除失败");
          console.error('删除地址信息失败:', error);
        });
    })
    .catch(() => {
      // 用户取消删除
      console.log('取消删除地址信息');
    });
}

  },
}

</script>
  
<style>
.Myaddress {
  font-size: 30px;
  position: absolute;
  top: 150px;
  left: 200px;
  right: 0;
  padding: 10px 0;
  margin: 0 auto;
  max-width: 1000px;
}

.pageChange {
  display: flex;
  justify-content: center;
}
</style>