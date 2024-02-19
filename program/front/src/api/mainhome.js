import request from '@/utils/request'

export function getUserProfile(UserID) {
  return request({
    url: "/UserInfo/"+ UserID, // 根据实际的服务器接口地址进行替换
    method: 'get',
  });
}