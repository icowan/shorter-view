import request from '@/utils/request';

export async function post(params?: any) {
  return request(`/`, {
    method: 'POST',
    data: params,
  });
}
