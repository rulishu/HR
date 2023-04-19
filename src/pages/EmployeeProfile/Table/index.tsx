import { useSelector, RootState, useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';
import { asyncAwaitFormList } from '@/utils/valid';

const Page = () => {
  const {
    employeeProfile: { dataList, page, pageSize, total, checked },
    employeeInduction: { companyList },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const onEdit = async (rowData: any, e: any) => {
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
      payload: { id: checked?.[0] },
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
          onCheck,
          onEdit
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