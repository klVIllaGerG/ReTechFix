import request from '@/utils/request'


/*创建回收订单信息*/
export const insertNavigationUpload = (formData) => {
  const id = formData.get('id'); // 从 formData 中提取 'id'

  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}`,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

//删除回收订单
export function deleteRecycleOrder(uid, id) {
  return request({
    url:`http://110.42.220.245:8081/RecycleOrder/${uid}/${id}`,
    method:'delete',
  });
}

/*获取回收订单信息*/
export function recycle_info(params) {
  return request({
    url: `/api/RecycleOrder/${params.id}`,
    method: 'get',
    data: {
        Username: params.username,
        Telephone: params.telephone,
        recyclelocation: params.recyclelacation,
        type_name: params.type_name,
        recycletime: params.recycletime,
    }
  })
}

