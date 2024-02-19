<template>
  <div class="change">
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <!--账户信息修改-->
        <el-collapse-item name="1">
          <template #title>
            <span style="font-size: 18px;">账号信息修改</span>
          </template>
          <div style="padding-left: 3%;"> <!--信息修改的子选项：基本信息和私密信息-->
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1">
                <template #title>
                  <span style="font-size: 15px;">基本信息</span>
                </template>
                <div>
                  <div>
                    <el-button v-if="showButton" type="primary" style="margin-left: 40%;"
                      @click="editMode = true; showButton = !showButton">修改</el-button>
                    <el-form :model="formData" label-width="120px" v-if="editMode">
                      <el-form-item label="姓名">
                        <el-input v-model="formData.name"></el-input>
                      </el-form-item>

                      <el-form-item label="昵称">
                        <el-input v-model="formData.username"></el-input>
                      </el-form-item>

                      <el-form-item label="电话">
                        <el-input v-model="formData.phone"></el-input>
                      </el-form-item>

                      <el-form-item label="Email">
                        <el-input v-model="formData.email" type="email"></el-input>
                      </el-form-item>

                      <el-form-item label="身份证号">
                        <el-input v-model="formData.identify"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button type="default" @click="cancel">取消</el-button>
                      </el-form-item>
                    </el-form>

                    <div v-else style=" text-align: left ;margin-left: 3%;">
                      <p><strong>姓名:</strong> {{ formData.name }}</p>
                      <p><strong>昵称:</strong> {{ formData.username }}</p>
                      <p><strong>电话:</strong> {{ formData.phone }}</p>
                      <p><strong>Email:</strong> {{ formData.email }}</p>
                      <p><strong>身份证号:</strong> {{ formData.identify }}</p>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <span style="font-size: 15px;">修改密码</span>
                </template>
                <div>
                  <br>
                  <el-form :model="formPassword" label-width="120px">
                    <el-form-item label="旧密码">
                      <el-input v-model="formPassword.oldPassword" type="password"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码">
                      <el-input v-model="formPassword.newPassword" type="password"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="handleSubmit">保存</el-button>
                      <el-button type="default" @click="handleReset">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-collapse-item>
        <!--/账户信息修改 -->
        <!--外观显示设置-->

        
      </el-collapse>
      <br><br><br><br><br><br><br><br><br><br>
      <ElButton type="primary" class="login-btn" size="large" @click="signOut">退出登录</ElButton>
    </div>

  </div>
</template>

<script>
import { mapState} from 'vuex';
import { getInfo, sendInfo } from '@/api/personalSettings';

export default {
  computed:{
    ...mapState(['userid']), // 获取 userid 数据
    test()
    {
      return this.userid;
    }
  },
  data() {
    return {

      showButton: true,
      editMode: false,
      formData: {
        name: 'John Doe',
        username: 'nightfog',
        phone: '123-456-7890',
        email: 'johndoe@example.com',
        identify: '4305*************7'
      },
      formPassword: {
        nowPassword: '12356',
        oldPassword: '',
        newPassword: ''
      },
      isDark: false,
      fontSizeOptions: [
        {
          value: 'larger',
          label: '超大',
        },
        {
          value: 'large',
          label: '大',
        },
        {
          value: 'middle',
          label: '中',
        },
        {
          value: 'small',
          label: '小',
        },
        
      ],
      originalData: {}
    };
  },
  methods: {
    save() {
      // 执行保存修改的操作，比如向后端发送请求
      this.editMode = false;
      this.showButton = !this.showButton;
      let params = {
      password: this.formPassword.nowPassword,
      name :this.formData.name,
      username:this.formData.username,
      phone:this.formData.phone,
      email:this.formData.email,
      identity:this.formData.identify
    }

    console.log(params)
    sendInfo(params , this.userid).then((res) => {
        console.log(res.data)

        if (res.data === false) {
          this.$message.error("保存失败");
        }
        else {
          this.$message.success("保存成功");
         
        }
      })
    },
    cancel() {
      // 取消修改，恢复原始数据

      this.editMode = false;
      this.showButton = !this.showButton;
    },
    handleSubmit() {
      // 这里可以进行旧密码验证逻辑，验证成功后执行密码修改操作
      if (this.validateOldPassword()) {
        // 执行密码修改操作，比如向后端发送请求
        this.handlePasswordUpdate();
      } else {
        this.handleReset()
        // 旧密码验证失败
        this.$message.error('旧密码验证失败');
      }
    },
    handleReset() {
      this.formPassword.oldPassword = '';
      this.formPassword.newPassword = '';
    },
    validateOldPassword() {
      // 这里是旧密码验证的逻辑
      // 您可以根据实际需求自定义验证规则，比如向后端发送请求验证旧密码
      // 返回 true 表示验证通过，返回 false 表示验证失败
      // 在示例中，我们假设验证规则为旧密码为 "password"
      return this.formPassword.oldPassword === this.formPassword.nowPassword;
    },
    handlePasswordUpdate() {
      // 执行密码修改的操作，比如向后端发送请求
      // 在示例中，我们只是简单地打印新密码
      console.log('新密码:', this.formPassword.newPassword);
      this.formPassword.nowPassword = this.formPassword.newPassword;
      this.save();
      this.$message.success('密码修改成功');
     
      this.handleReset();
    },
    signOut()
    {
      console.log(this.userid)
      this.$router.push('/')
    }
  },
  created(){
    console.log("尝试获取个人信息")
      console.log(this.userid)
      //请求地址,this和vm指的是全局
      getInfo(this.userid).then((res) => {
        console.log(res.data)
        if (res.data === false) {
          console.log("拿数据失败")
        }
        else {
          console.log("拿数据成功")
         
          this.formData.name = res.data[0].name
          this.formData.username= res.data[0].userName
          this.formData.phone= res.data[0].telephone
          this.formData.email=res.data[0].email
          this.formData.identify= res.data[0].identity
          this.formPassword.nowPassword=res.data[0].password
        }
      })
  }
};
</script>

<style>
.change {
  border: 1px solid #ccc;
  width: 1400px;
  /* 设置边框的宽度为 300 像素 */
  margin-top: 0%;
  font-size: 30px;
  color: black;
  position: absolute;
  top: 150px;
  left: 205px;
  padding: 40px;
}
</style>
