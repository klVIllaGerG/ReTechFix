import request from '@/utils/request'


/*用户登录*/
export function login(params) {
  return request({
    url: '/LogIn/User',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      UserId: params.user,
      Password: params.pass
    }
  })
}
/*拿验证码*/
export function code() {
  return request({
    url: '/LogIn',
    method: 'get'
  })
}
/*假设有管理员登陆 */
/*export function adminlogin(params) {
  return request({
    url: '/Login/adminlogin',
    method: 'get',
    params: {
      admin_id: params.user,
      password: params.pass
    }
  })
}*/


/*用户注册*/
export function register(params) {
  return request({
    url: '/UserInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Password: params.password,
      UserName: params.user_name,
      Telephone:params.telephone,
      Email: params.email,
      Identity: params.identity,
      Name: params.name,

    }
  })
}



/*修改密码*/
export function ChangePass(params) {
  return request({
    url: '/Login/UpdateUser',
    method: 'post',
    params: {
      user_id: params.user_id,
      password: params.password,
    }
  })
}


/*验证邮箱用户是否正确*/
export function IftrueMail(params) {
  return request({
    url: '/Login/Iftruemail',
    method: 'get',
    params: {
      user_id: params.user_id,
      contact_info: params.contact_info,
    }
  })
}

//在注册时根据邮箱名获取验证码
export function getEmailCode(email) {
  return request({
    url: '/vue-admin-template/register/getEmailCode',
    method: 'post',
    email
  })
}


