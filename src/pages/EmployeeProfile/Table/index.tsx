import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    employeeProfile: { dataList, page, pageSize, total, checked },
    employeeInduction: { companyList },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

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
      type: "employeeProfile/updateState",
      payload: { checked: check },
    });
  }

  // 导出
  const onFileExport = () => { 
    dispatch({
      type: 'employeeProfile/filesDownload',
      payload: {id: checked?.[0]},
    })
  }

  // 翻页
  const onTurnPages = (current: number) => {
    dispatch.employeeProfile.updateState({
      page: current
    });
    dispatch.employeeProfile.selectStaffFile();
  }

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button
          icon="download"
          type="primary"
          onClick={() => {
            onFileExport();
          }}
        >
          导出
        </Button>
      </div>
      <Table
        columns={columns({
          companyList,
          dictObject,
          onCheck
        })}
        data={dataList}
        empty={<Empty />}
        footer={total > 0 && (
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            divider
            onChange={(current) => onTurnPages(current)}
          />
        )}
      />
    </div>
  )
}

export default Page;