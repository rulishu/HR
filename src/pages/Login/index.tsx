import { useEffect, Fragment } from 'react';
import { useDispatch, Dispatch, KktproPageProps, useLocation, useSelector, RootState } from '@kkt/pro';
import UserLogin from '@uiw-admin/user-login';
import { Notify } from 'uiw';
import './index.css'

const Pages = ({ navigate }: KktproPageProps) => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch<Dispatch>();

  const {
    loading,
  } = useSelector((state: RootState) => state);

  const thirdLogin = () => {
    // dispatch({ type: 'global/fetchThirdLoginToken' });
    dispatch.global.fetchThirdLoginToken()
  };

  useEffect(() => {
    if (search) {
      const code = search.split('code=')[1];
      dispatch.global.thirdLogin({
        code,
        callback: () => {
          navigate('/home');
        },
      })
      // dispatch({
      //   type: 'global/thirdLogin',
      //   payload: {
      //     code,
      //     callback: () => {
      //       navigate('/home');
      //     },
      //   },
      // });
    }
    localStorage.removeItem('token');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, dispatch]);

  return (
    <Fragment>
      {/* <UserLogin
        api="/api/login"
        projectName="HR Flow"
        btnProps={{ type: "primary" }}
        onSuccess={(data) => {
          if (data.code === 200 && data.token) {
            Notify.success({ description: '登录成功' });
            localStorage.setItem("token", data?.token);
            dispatch.global.getUserInfo({
              callback: (authRoutes: string[]) => {
                navigate('/home', { replace: true })
              }
            });
          }
        }}
      /> */}
      <UserLogin
        api="/api/login"
        projectName="HR Flow"
        buttons={[
          {
            title: '登录',
            htmlType: 'submit',
            type: 'primary',
          },
          {
            title: '第三方登陆',
            basic: true,
            icon: 'github-o',
            type: 'link',
            className: "linkLoader",
            loading: loading.effects.global.fetchThirdLoginToken || loading.effects.global.thirdLogin,
            onClick: () => {
              thirdLogin();
            },
          },
        ]}
        onSuccess={(data) => {
          if (data.code === 200 && data.token) {
            Notify.success({ description: '登录成功' });
            localStorage.setItem('token', data?.token);
            dispatch.global.getUserInfo({
              callback: (authRoutes: string[]) => {
                navigate('/home', { replace: true });
              },
            });
          } else {
            Notify.error({ description: data.msg || '登录失败' });
          }
        }}
        footer={
          <div style={{ color: '#050303', display: 'flex', justifyContent: 'center' }}>
            Copyright @ 2013-2023 上海尼好系统集成有限公司 All Rights Reserved.
          </div>
        }
      />
    </Fragment>
  );
};
export default Pages;
