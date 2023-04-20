import { useEffect, Fragment } from 'react';
import { useDispatch, Dispatch, KktproPageProps, useLocation, useSelector, RootState } from '@kkt/pro';
import UserLogin from "@uiw-admin/user-login";
import { Notify } from 'uiw';

const Pages = ({ navigate }: KktproPageProps) => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  const thirdLogin = () => {
    let userId = userData?.userId
    dispatch({
      type: 'global/fetchThirdLoginToken',
      payload: { userId }
    });
  }

  useEffect(() => {
    if (search) {
      const code = search?.split('code=')[1]?.split('&state=')[0]
      const userId = search?.split('&state=')[1];

      dispatch({
        type: 'global/thirdLogin',
        payload: {
          code,
          userId,
          callback: () => {
            navigate('/home');
          },
        },
      });
    }
    localStorage.removeItem("token");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, dispatch])

  return (
    <Fragment>
      {/* <UserLogin
        api="/api/login"
        projectName="人事管理系统"
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
        projectName="人事管理系统"
        buttons={[
          {
            title: "登录",
            htmlType: "submit",
            type: "primary"
          },
          {
            title: "第三方登陆",
            basic: true,
            icon: "github-o",
            type: "link",
            onClick: () => { thirdLogin() }
          },
        ]}
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
      />
      {/* <Loader
        tip="第三方登录加载中..."
        size="large"
        bgColor="rgba(255, 255, 255, 0.9)"
        fullscreen={isFullscreen}
        loading={isFullscreen}
      /> */}

    </Fragment>
  )
};
export default Pages;
