import { useSelector, RootState, useNavigate, useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Pagination, Empty, Alert, Notify } from "uiw";
import { columns } from './utils';
import { asyncAwaitFormList } from '@/utils/valid';

const Page = () => {
  const {
    employeeProfile: { dataList, page, pageSize, total, checked, isDelete },
    employeeInduction: { companyList },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  const dataSourceList = dataList?.map((item: any) => {
    const { id } = item;
    const isChecked = (checked as any[]).includes(id);
    return { checked: isChecked, ...item };
  });

  // 编辑
  const onEdit = async (rowData: any, type: any) => {
    if (type) {
      navigate(type);
    } else {
      const imgsUUID: KktproKeys = {
        idCardImgBackUUIDs: rowData.idCardImgBackUUID,
        idCardImgFrontUUIDs: rowData.idCardImgFrontUUID,
        diplomaImgUUIDs: rowData.diplomaImgUUID,
        degreeCertificateImgUUIDs: rowData.degreeCertificateImgUUID,
        departImgUUIDs: rowData.departImgUUID,
        staffPhotoImgUUIDs: rowData.staffPhotoImgUUID
      }
      const alls: KktproKeys = [];
      Object.keys(imgsUUID).forEach((item) => {
        if (imgsUUID[item]) {
          alls[item] = imgsUUID[item];
        }
      })
      const all = Object.keys(alls).map(key => {
        return new Promise((resolve, reject) => {
          dispatch.profileRatify.getSelectFile(alls[key]).then(res => {
            let blob = res;
            let reader = new FileReader();
            reader.readAsDataURL(blob);  // 转换为base64
            reader.onload = () => {
              resolve({
                [key]: [{
                  dataURL: reader.result
                }]
              })
            }
          })
        })
      })
      const imgs = await asyncAwaitFormList(all) || [];
      let imgObj: KktproKeys = {};
      imgs.forEach(item => {
        imgObj = {
          ...imgObj,
          ...item
        }
      });
      const params = {
        ...rowData,
        ...imgObj
      }

      dispatch({
        type: "employeeProfile/updateState",
        payload: {
          queryInfo: params,
          activeKey: '2'
        },
      });
    }
  }

  // 全选按钮
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
    if(checked.length > 1){
      Notify.error({ description: '请选择一条数据' });
    } else {
      dispatch.employeeProfile.filesDownload({ id: checked?.[0] })
    }
  }

  // 翻页
  const onTurnPages = (current: number) => {
    dispatch.employeeProfile.updateState({
      page: current
    });
    dispatch.employeeProfile.selectStaffFile();
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.employeeProfile.updateState({
      isDelete: true
    });
    dispatch.employeeProfile.updateState({
      queryInfo: data
    });
  }

  const onDelClosed = () => {
    dispatch.sysItems.hideModal();
  }

  const onConfirm = () => {
    dispatch.employeeProfile.deleteStaffFile();
  }

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button
          icon="download"
          type="primary"
          disabled={checked.length === 0}
          onClick={() => {
            onFileExport();
          }}
        >
          导出
        </Button>
      </div>
      <Table
        // onCell={(rowData, { rowNum, colNum }) => {
        //   if (colNum !== 16) {
        //     dispatch({
        //       type: "employeeProfile/updateState",
        //       payload: { queryInfo: rowData, isVisible: true },
        //     });
        //   }
        // }}
        columns={columns({
          companyList,
          dictObject,
          checked,
          dataSourceList,
          onCheck,
          onEdit,
          onDelete
        })}
        data={dataSourceList}
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
      <Alert
        isOpen={isDelete}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      />
    </div>
  )
}

export default Page;