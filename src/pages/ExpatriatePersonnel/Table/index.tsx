import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Card } from "uiw";
import { columns } from './utils';

const Page = (props: any) => {
  const {
    sysOrganization: { dataListStaff, checked },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const dataSourceList = dataListStaff?.map((item: any) => {
    const { id } = item;
    const isChecked = (checked as any[]).includes(id);
    return { checked: isChecked, ...item };
  });

  const onEdit = (rowData?: any, type?: number) => {
    !type && dispatch.sysOrganization.selectEntranceOrDeparture({ id: rowData?.id, })

    //入场/离场
    const typeVisible = type ? 'isVisible' : 'visible'
    dispatch({
      type: 'sysOrganization/updateState',
      payload: {
        [typeVisible]: true,
        queryInfo: rowData,
      }
    })
  }

  const onCheck = (rowData: any, e: any) => {
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
      type: "sysOrganization/updateState",
      payload: { checked: check },
    });
  }
  // 导出
  const onFileExport = () => {
    dispatch({
      type: 'sysOrganization/downloadExcelStaff',
      payload: { id:props.companyId, ids: checked },
    })
  }

  // 翻页
  // const onTurnPages = (current: number) => {
  //   console.log('current',current);
    
  //   dispatch.sysOrganization.updateState({
  //     page: current
  //   });
  //   dispatch.sysOrganization.selectListStaff();
  // }

  return (
    <Card noHover bordered={false}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="download" type="primary" onClick={() => {
            onFileExport();
          }}>
          导出
        </Button>
      </div>
      <Table
        columns={columns({
          onCheck,
          onEdit,
          dictObject,
          checked,
          dataSourceList,
        })}
        data={dataSourceList}
        empty={<Empty />}
        // footer={total > 0 && (
        //   <Pagination
        //     current={page}
        //     pageSize={pageSize}
        //     total={total}
        //     divider
        //     onChange={(current) => onTurnPages(current)}
        //   />
        // )}
      />
    </Card>
  )
}

export default Page;