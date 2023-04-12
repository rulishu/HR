import { useDispatch, useSelector, Dispatch, RootState } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer } from "uiw";
import { ModalTitle, getRouteList } from '../utils';
import type { iconListType } from '../index';
import IconInput from './IconInput';

const Modals = ({ icons }: { icons: iconListType[] }) => {
  const {
    sysRoute: { isVisible, popUpStatus, dataList, detailsData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysRoute/updateState",
      payload: {
        isVisible: false,
        detailsData: {},
        dataId: ""
      },
    });
  };

  //提交按钮
  const onSubmit = (current: any) => {
    if (!popUpStatus) return;
    if (['add', 'tableAdd'].includes(popUpStatus)) {
      dispatch({
        type: "sysRoute/addMenu",
        payload: {
          ...current,
          menuType: 'M', // M 菜单
        },
      });
    } else {
      const params = {
        ...(detailsData as any),
        ...current
      }
      dispatch({
        type: "sysRoute/updateMenu",
        payload: {
          icon: params.icon,
          menuName: params.menuName,
          menuId: params.menuId,
          orderNum: params.orderNum,
          query: params.query,
          path: params.query === '1' ? '' : params.path,
          userId: params.userId,
          parentId: params.query === '1' ? 0 : params.parentId
        },
      });
    }
  };
  return (
    <Drawer
      title={ModalTitle[popUpStatus || 'add']}
      size={600}
      isOpen={isVisible}
      onClose={() => onClosed()}
      type="danger"
    >
      <ProForm
        customWidgetsList={{iconInput: IconInput}}
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{
          type: "primary",
        }}
        onSubmit={(_, current) => onSubmit(current)}
        formDatas={[
          {
            label: "菜单名称",
            key: "menuName",
            widget: "input",
            span: "24",
            initialValue: (detailsData as any)?.menuName,
            rules: [
              { required: true, message: '请填写菜单名称' },
            ],
          },
          {
            label: "类型",
            key: "query",
            widget: "select",
            span: "24",
            initialValue: (detailsData as any)?.query,
            disabled: popUpStatus === 'tableAdd',
            option: [
              { label: '文件', value: '1' },
              { label: '路径', value: '2' },
            ],
            rules: [
              { required: true, message: '请选择类型' },
            ],
            widgetProps: {
              onChange: (e: any) => {
                dispatch({
                  type: "sysRoute/updateState",
                  payload: {
                    detailsData: {
                      ...(detailsData as any),
                      query: e.target.value
                    }
                  },
                });
              }
            }
          },
          {
            label: "上级菜单",
            key: "parentId",
            widget: "select",
            span: "24",
            initialValue: (detailsData as any)?.parentId,
            disabled: popUpStatus === 'tableAdd',
            hide: (detailsData as any)?.query !== '2',
            option: getRouteList(dataList, (detailsData as any)?.path),
          },
          {
            label: "路由地址",
            key: "path",
            widget: "input",
            span: "24",
            initialValue: (detailsData as any)?.path,
            hide: (detailsData as any)?.query !== '2',
            rules: [
              { required: true, message: '请填写路由地址' },
            ],
          },
          {
            label: (
              <span>
                选择图标
                <span style={{ color: "#858585", fontSize: 10 }}>
                  （首页图标，图标对应src/icons目录下svg名称）
                </span>
              </span>
            ),
            key: "icon",
            widget: "iconInput",
            option: icons,
            span: "24",
            hide: (detailsData as any)?.query !== '2',
            initialValue: (detailsData as any)?.icon,
          },
          {
            label: "排序",
            key: "orderNum",
            widget: "input",
            span: "24",
            initialValue: (detailsData as any)?.orderNum,
          },
        ]}
      />
    </Drawer>
  );
}

export default Modals;
