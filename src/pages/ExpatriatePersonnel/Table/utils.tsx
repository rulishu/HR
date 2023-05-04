import { KktproKeys, dispatch } from '@kkt/pro';
import { Checkbox, Button, Tag, Tooltip } from "uiw";

interface columnsProps {
  onCheck?: (rowData: KktproKeys, e: KktproKeys) => void;
  onEdit?: (rowData: KktproKeys, type?: number) => void;
  dictObject?: any,
  checked?: any,
  dataSourceList?: any,
}

export const columns = ({
  onCheck,
  onEdit,
  dictObject,
  checked,
  dataSourceList,
}: columnsProps) => [
  {
    title: () => {
      const indeterminate =
        dataSourceList.length !== checked.length && checked.length > 0;
      const isChecked =
        dataSourceList.length === checked.length && dataSourceList.length > 0;
      return (
        <Checkbox
          checked={isChecked}
          indeterminate={indeterminate}
          onClick={(e: any) => {
            let checkedIdx = dataSourceList.map((item: any) => item.id);
            if (!e.target.checked) {
              checkedIdx = [];
            }
            dispatch({
              type: "sysOrganization/updateState",
              payload: { checked: checkedIdx },
            });
          }}
        />
      );
    },
    key: "checked",
    width: 30,
    render: (text: any, key: any, rowData: any) => {
      return (
        <Checkbox
          checked={rowData.checked}
          onClick={(e) => {
            onCheck?.(rowData, e);
          }}
        />
      );
    },
  },
    {
      title: "姓名",
      key: "staffName",
    },
    // {
    //   title: "公司",
    //   key: "companyName",
    // },
    {
      title: "职位",
      key: "post",
      render: (text: any, key: any, rowData: any) => {
        const data = dictObject['post']?.child.filter((item: any) => item.value === text)?.[0]
        return <div>{data?.label}</div>;
      }
    },
    {
      title: "联系方式",
      key: "phone",
      width: 100,
      ellipsis: true,
      render: (text: any) => (
        <Tooltip placement="topLeft" content={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "身份证号",
      key: "idNumber",
      width: 100,
      ellipsis: true,
      render: (text: any) => (
        <Tooltip placement="topLeft" content={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "等级",
      key: "qualifications",
    },
    {
      title: "外派公司",
      key: "expatriateCompanyName",
    },
    {
      title: "入场时间",
      key: "entranceTime",
    },
    {
      title: "离场时间",
      key: "departureTime",
    },
    {
      title: "工作地址",
      key: "workAddress",
    },
    {
      title: "办公方式",
      key: "workWay",
    },
    {
      title: "外派状态",
      key: "state",
      render: (text: any) => <Tag light title={text === 3 ? '外派中' : '未外派'} color={text === 3 ? '#28a745' : '#008EF0'} />
    },
    {
      title: "备注",
      key: "remake",
      width: 100,
      ellipsis: true,
      render: (text: any) => (
        <Tooltip placement="topLeft" content={text||''}>
          {text||''}
        </Tooltip>
      ),
    },
    {
      title: "操作",
      key: "edit",
      width: 120,
      render: (text: any, key: any, rowData: any) => {
        return (
          <>
            {rowData?.state === 3 ?
              <Button type="primary" onClick={() => onEdit?.(rowData, 3)} >离场</Button> :
              <Button type="primary" onClick={() => onEdit?.(rowData, 1)} >入场</Button>}
            <Button
              type="primary"
              onClick={() => {
                onEdit?.(rowData);
              }}
            >
              查看
            </Button>
          </>
        );
      },
    },
  ]