import { useEffect } from 'react';
import { useDispatch, Dispatch, KktproPageProps, useLocation } from '@kkt/pro';
import UserLogin from "@uiw-admin/user-login";
import { Notify } from 'uiw';

const Pages = ({ navigate }: KktproPageProps) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    localStorage.removeItem("token");
  }, [pathname])

  return (
    <UserLogin
      api="/api/login"
      projectName="人事管理系统"
      btnProps={{ type: "primary" }}
      onSuccess={(data) => {
        if (data.code === 200 && data.token) {
          Notify.success({ description: '登录成功' });
          localStorage.setItem("token", data?.token);
          dispatch.global.getUserInfo({
            callback: () => {
              navigate('/home', { replace: true })
            }
          });
        }
      }}
    />
  )
};
export default Pages;
