import { useMemo } from "react";
import { Dispatch, KktproKeys, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm } from "@uiw-admin/components";
import { Drawer, Card } from "uiw";
import { formList, getMenus, getCheckIds } from './utils';
import { TreeCheckedBox } from './style';

function Modals() {
  const {
    roleModal: {
      isVisible,
      detailsData,
      type,
      routeList = [],
      checkRouteMenuIds = []
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const treeData: KktproKeys[]  = useMemo(() => {
    return getMenus(routeList)
  }, [routeList])

  //提交按钮
  const onAddSubmit = (current: object) => {
    const params: KktproKeys = {
      ...current,
      menuIds: checkRouteMenuIds
    }
    if (type === "add") {
      dispatch({
        type: "roleModal/roleAdd",
        payload: params
      });
    } else {
      dispatch({
        type: "roleModal/roleUpdate",
        payload: {
          id: (detailsData as any)?.id,
          ...params
        },
      });
    }
  };

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "roleModal/updateState",
      payload: { isVisible: false },
    });
  };

  //新增编辑表单
  ;

  return (
    <Drawer
      title={type === "add" ? "新增角色" : "编辑角色"}
      size={700}
      isOpen={isVisible}
      onClose={() => onClosed()}
      type="danger"
      useButton={false}
    >
      <Card title="分配路由" noHover={true}>
        <TreeCheckedBox
          data={treeData}
          selectedKeys={checkRouteMenuIds}
          onSelected={(key, selected, item, evn) => {
            dispatch({
              type: "roleModal/updateState",
              payload: { checkRouteMenuIds: getCheckIds(treeData, key) },
            });
          }}
        />
      </Card>
      <ProForm
        showSaveButton
        showResetButton
        formType="pure"
        saveButtonProps={{ type: "primary" }}
        readOnlyProps={{ column: 2 }}
        onSubmit={(_, current) => onAddSubmit(current)}
        formDatas={formList({ type, detailsData })}
      />
    </Drawer>
  );
}

export default Modals;
