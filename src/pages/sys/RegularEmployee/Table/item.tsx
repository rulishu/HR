import { Checkbox } from 'uiw';
import { Dispatch } from '@kkt/pro';
import TipButton from '@/components/TipButton'

export const columns = (
  dispatch: Dispatch,
  dataList: any[],
  checked: any[],
  handle: (type: any, data: any) => void,
) => {

  const onClickCheckedItem = (rowData: any, e: any) => {
    const isChecked = e.target.checked;
    let check = [...checked] as any[];
    if (isChecked) {
      // 添加到选中数组中
      check.push(rowData.id);
      check = check.sort((a, b) => a - b);
    } else {
      // 删除选中项
      check.splice(check.indexOf(rowData.id), 1);
    }
    dispatch({
      type: "organizationStructure/update",
      payload: { checked: check },
    });
  }
  return [
    {
      title: () => {
        const indeterminate =
          dataList.length !== checked.length && checked.length > 0;
        const isChecked =
          dataList.length === checked.length && dataList.length > 0;
        return (
          <Checkbox
            checked={isChecked}
            indeterminate={indeterminate}
            onClick={(e: any) => {
              let checkedIdx = dataList.map((item: any) => item.id);
              if (!e.target.checked) {
                checkedIdx = [];
              }
              dispatch({
                type: "organizationStructure/update",
                payload: { checked: checkedIdx },
              });
            }}
          />
        );
      },
      key: "checked",
      width: 60,
      ellipsis: true,
      render: (text: any, key: any, rowData: any) => {
        return (
          <Checkbox
            checked={rowData.checked}
            onClick={(e) => {
              onClickCheckedItem(rowData, e);
            }}
          />
        );
      },
    },
    {
      title: '实际申请人',
      key: 'name',
      width: 100,
      ellipsis: true
    },
    {
      title: '入职日期',
      key: 'name',
      width: 100,
    },
    {
      title: '试用期',
      key: 'name',
      width: 100,
    },
    {
      title: '转正日期',
      key: 'name',
      width: 100,
    },
    {
      title: '职位',
      key: 'name',
      width: 100,
    },
    {
      title: '职级',
      key: 'name',
      width: 100,
    },
    {
      title: '工作地点',
      key: 'name',
      width: 100,
    },
    {
      title: '对本岗位的理解',
      key: 'name',
      width: 150,
    },
    {
      title: '试用期内对工作的总结',
      key: 'name',
      width: 150,
    },
    {
      title: '对公司的意见和建议',
      key: 'name',
      width: 150,
    },
    {
      title: '审批结果',
      key: 'name',
      width: 100,
    },
    {
      title: '审批状态',
      key: 'name',
      width: 100,
    },

    {
      title: '审批编号',
      key: 'name',
      width: 100,
    },

    {
      title: '操作',
      key: 'edit',
      width: 100,
      render: (text: any, key: any, rowData: any) => (
        <div>
          {/* <Button type="primary" onClick={() => { handle('edit', rowData) }}>
            编辑
          </Button> */}
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
            onClick={() => handle('edit', rowData)}
          />
        </div>
      ),
    },
  ]
}