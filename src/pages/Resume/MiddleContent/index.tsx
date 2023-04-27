import { Fragment } from 'react';
import { Alert, Card, Empty, Button, FileInput, Row, Col, Pagination, Popover, Checkbox } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';
import { getDictLabel } from '@/utils';
import '../style/index.css'

const Index = () => {
  const {
    resume: { TableData, isDelete, delId, formData, cvFileUUID, total, page, pageSize, checked, companyId },
    global: { dictObject },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const dispatchFn = (params: any) => {
    dispatch({
      type: 'resume/update',
      payload: params
    })
  }
  const handle = async (type: any, data?: any) => {
    dispatchFn({ editType: type })

    if (type === 'add' || type === 'edit') {
      dispatchFn({ editVisible: true })
      type === 'add' && dispatchFn({ formData: {} })
      type === 'edit' && dispatchFn({ formData: { ...formData, ...data, cvFileUUID: cvFileUUID || data?.cvFileUUID } })

      data?.cvFileUUID && dispatch.profileRatify.getSelectFile(data.cvFileUUID).then((res) => {
        dispatchFn({ file: res })
      })
      dispatch({
        type: "archives/updateState",
        payload: {
          workData: data?.workExperience || [],
          educationData: data?.educationalExperience || []
        }
      });
      dispatch.resume.getCVUpdateLogs({ id: data.id })
    }

    if (type === 'view') {
      dispatch.resume.getDownloadFile(data?.cvFileUUID)
    }
    if (type === 'delete') {
      dispatchFn({ isDelete: true, delId: data.id })
    }
    if (type === 'export') {
      dispatch.resume.exportWord({ userId: data.userId, id: data.id })
    }
    if (type === 'exportPdf') {
      dispatch.resume.getDownloadFilePDF({ id: data.id })
    }
    if (type === 'batchUpload') {
      const checkedDown = checked.map((item: any) => ({ userId: item?.userId, id: item?.id }))
      dispatch.resume.downZip(checkedDown)
    }

  }

  const onDelClosed = () => {
    dispatchFn({ isDelete: false })
  }
  const onConfirm = () => {
    dispatch.resume.deleteVC([delId])
      .then(() =>
        dispatch.resume.quickSelect({
          page: page,
          pageSize: pageSize,
          companyId: companyId,
        })
      )
  }
  const footer = (
    TableData?.length > 0 &&
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      divider
      onChange={(current: any) => {
        dispatchFn({
          page: current,
          pageSize: pageSize,
          total: total,
        })
        dispatch({
          type: "resume/quickSelect",
          payload: {
            current: true,
            page: current,
            pageSize: pageSize,
            total: total,
          },
        });
      }
      }
    />
  )

  const onCheck = (rowData: any, e: any) => {
    const isChecked = e.target.checked;
    let check = [...checked] as any[];
    if (isChecked) {
      // 添加到选中数组中
      check.push(rowData);
      check = check.sort((a, b) => a - b);
    } else {
      // 删除选中项
      check.splice(check.indexOf(rowData.id), 1);
    }
    dispatch({
      type: "resume/update",
      payload: { checked: check },
    });
  }

  return (
    <Card
      noHover
      bordered={false}
      style={{ padding: 0, marginTop: -1, height: 660, overflow: 'scroll' }}
      title={
        <Row gutter={10}>
          <Col>
            <Button
              type='primary'
              icon='plus'
              onClick={() => handle('add')}
            >
              新增简历
            </Button>
          </Col>
          { !companyId && (
          <Col>
            <FileInput
              uploadType="text"
              multiple
              maxNumber={1}
              value={[]}
              onChange={(e: any) => {
                dispatch.resume.uploadZip(e?.[0])
              }}
            >
              <Button
                type='primary'
                icon='plus'
              >
                批量上传
              </Button>
            </FileInput>
          </Col>
          )}
          <Col>
            <Button
              type='primary'
              icon='download'
              disabled={checked.length === 0}
              onClick={() => { handle('batchUpload', {}) }}
            >
              批量下载
            </Button>
          </Col>
        </Row>
      }
      footer={footer}
    >
      <div style={{ height: '100%' }}>
        {TableData?.map((item: any, idx: any) => {
          return (
            <Fragment key={idx}>
              < Card style={{ marginBottom: 10 }} noHover>
                <div style={{ display: 'flex', justifyContent: "space-between", }} >
                  <div style={{ display: 'flex', marginLeft: 20, alignItems: 'center' }}>
                    <Checkbox
                      checked={item.checked}
                      onClick={(e) => {
                        onCheck?.(item, e);
                      }}
                    />
                    <div style={{ marginLeft: 10 }}>
                      <p>姓名： {item?.name}</p >
                      <p>性别： {getDictLabel(dictObject?.sex?.child, item?.gender)}</p >
                    </div>
                  </div>
                  <div>
                    <p>工作经验： {item?.experience} {item?.experience ? "年" : ''}</p >
                    <p>期望薪资： {item?.salaryExpectation} </p >
                  </div>
                  <div>
                    <p>学历：{getDictLabel(dictObject?.education?.child, item?.educational)}</p >
                    <p>应聘岗位: {getDictLabel(dictObject?.post?.child, item?.post)}</p >
                  </div>
                  <div
                    style={{
                      marginRight: 50,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <TipButton
                      tip='编辑'
                      type='primary'
                      icon='edit'
                      onClick={() => handle('edit', item)}
                    />
                    <TipButton
                      tip='查看'
                      type='primary'
                      icon='document'
                      disabled={item.cvFileUUID ? false : true}
                      onClick={() => handle('view', item)}
                    />
                    <TipButton
                      tip='删除'
                      type='primary'
                      icon='delete'
                      onClick={() => handle('delete', item)}
                    />
                    <Popover
                      trigger="hover"
                      placement="top"
                      isOutside={true}
                      content={
                        <div style={{ width: 80, display: "flex", flexDirection: "column", }}>
                          <Button
                            basic
                            block
                            type="primary"
                            onClick={() => handle('export', item)}
                          >
                            导出Word
                          </Button>
                          <Button
                            basic
                            block
                            type="primary"
                            onClick={() => handle('exportPdf', item)}
                          >
                            导出PDF
                          </Button>
                        </div>
                      }
                    >
                      <Button
                        icon='more'
                        className='buttonPopover'
                        type='primary'
                      ></Button>
                    </Popover>
                  </div>
                </div>
              </Card>
            </Fragment>
          )
        })
        }
      </div>

      {TableData?.length <= 0 && <Empty />}

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
    </Card >
  )
}
export default Index