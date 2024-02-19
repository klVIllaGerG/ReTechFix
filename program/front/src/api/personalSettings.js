import request from '@/utils/request'

export function getInfo(UserID) {
  return request({
    url: "/UserInfo/"+ UserID, // 根据实际的服务器接口地址进行替换
    method: 'get',
  });
}

export function sendInfo(params,UserID) {
  return request({
    url: '/UserInfo/'+UserID,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Password: params.password,
      UserName: params.username,
      Telephone:params.phone,
      Email: params.email,
      Identity: params.identity,
      Name: params.name,

    }
  })
}