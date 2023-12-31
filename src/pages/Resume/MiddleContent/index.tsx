import { Fragment } from 'react';
import { Alert, Card, Empty, Button, FileInput, Row, Col, Pagination, Popover, Checkbox, Loader } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';
import { getDictLabel } from '@/utils';
import '../style/index.css';

const Index = () => {
  const {
    loading,
    resume: { TableData, isDelete, delId, formData, cvFileUUID, total, page, pageSize, checked, companyId, post },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const dispatchFn = (params: any) => {
    dispatch({
      type: 'resume/update',
      payload: params,
    });
  };
  const handle = async (type: any, data?: any) => {
    dispatchFn({ editType: type });

    if (type === 'add' || type === 'edit') {
      dispatchFn({ editVisible: true });
      type === 'add' && dispatchFn({ formData: {} });
      type === 'edit' &&
        dispatchFn({
          formData: { ...formData, ...data, cvFileUUID: cvFileUUID || data?.cvFileUUID },
          cvFileUUID: cvFileUUID || data?.cvFileUUID,
        });

      data?.cvFileUUID &&
        dispatch.profileRatify.getSelectFile(data.cvFileUUID).then((res) => {
          dispatchFn({ file: res });
        });
      dispatch({
        type: 'archives/updateState',
        payload: {
          workData: data?.workExperience || [],
          educationData: data?.educationalExperience || [],
        },
      });
      dispatch.resume.getCVUpdateLogs({ id: data.id });
    }
    // 审批
    if (type === 'examine') {
      dispatch({
        type: 'resume/update',
        payload: {
          examineVisible: true,
          vitaId: data.id,
          hrPersonDate: [],
          itPersonDate: [],
          hrContext: '',
          itContext: '',
          itState: '',
          hrState: '',
          assignInterviewerName: '',
          assignHrName: '',
          assignState: undefined,
        },
      });
      dispatch.resume.selectUserVC({
        id: data.id,
      });
    }

    if (type === 'view') {
      // dispatch.resume.getDownloadFile(data?.cvFileUUID)
      window.open(`/api/vc/previewPdf?id=${data?.cvFileUUID}&exportVersion`);
    }
    if (type === 'delete') {
      dispatchFn({ isDelete: true, delId: data.id });
    }
    if (type === 'export') {
      dispatch.resume.exportWord({ userId: data.userId, id: data.id });
    }
    if (type === 'exportPdf') {
      dispatch.resume.getDownloadFilePDF({ id: data.id });
    }
    if (type === 'batchUpload') {
      const checkedDown = checked.map((item: any) => ({ userId: item?.userId, id: item?.id }));
      dispatch.resume.downZip(checkedDown);
    }
    if (type === 'detailShare') {
      window.open(`/api/vc/previewPdf?id=${data?.id}&exportVersion=1`);
    }
    if (type === 'share') {
      window.open(`/api/vc/previewPdf?id=${data?.id}&exportVersion=2`);
    }
  };

  const onDelClosed = () => {
    dispatchFn({ isDelete: false });
  };
  const onConfirm = () => {
    dispatch.resume.deleteVC([delId]).then(() =>
      dispatch.resume.quickSelect({
        page: page,
        pageSize: pageSize,
        companyId: companyId,
      }),
    );
  };
  const footer = TableData?.length > 0 && (
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
          companyId: companyId,
        });
        dispatch({
          type: 'resume/quickSelect',
          payload: {
            current: true,
            page: current,
            pageSize: pageSize,
            total: total,
            companyId: companyId,
            post: post,
          },
        });
      }}
    />
  );

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
      type: 'resume/update',
      payload: { checked: check },
    });
  };

  const states = ['待面试', '面试中', '面试结束'];

  return (
    <Card
      noHover
      bordered={false}
      style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }}
      title={
        <Row gutter={10}>
          <Col>
            <Button type="primary" icon="plus" onClick={() => handle('add')}>
              新增简历
            </Button>
          </Col>
          {!companyId && (
            <Col>
              <FileInput
                uploadType="text"
                multiple
                maxNumber={1}
                value={[]}
                onChange={(e: any) => {
                  dispatch.resume.uploadZip(e?.[0]);
                }}
              >
                <Button type="primary" icon="plus">
                  批量上传
                </Button>
              </FileInput>
            </Col>
          )}
          <Col>
            <Button
              type="primary"
              icon="download"
              disabled={checked.length === 0}
              onClick={() => {
                handle('batchUpload', {});
              }}
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
              <Card style={{ marginBottom: 10 }} noHover>
                <Row align="middle">
                  <Checkbox
                    checked={item.checked}
                    onClick={(e) => {
                      onCheck?.(item, e);
                    }}
                  />
                  <Col> 姓名： {item?.name} </Col>
                  <Col> 性别： {getDictLabel(dictObject?.sex?.child, item?.gender)} </Col>
                  <Col> 应聘岗位: {getDictLabel(dictObject?.post?.child, item?.post)}</Col>
                  <Col> 学历：{getDictLabel(dictObject?.education?.child, item?.educational)}</Col>
                  <Col>
                    工作经验： {item?.experience} {item?.experience ? '年' : ''}
                  </Col>
                  {!companyId && <Col>状态： {states[item?.state]}</Col>}
                  {!companyId && (
                    <TipButton tip="审批" type="primary" icon="time-o" onClick={() => handle('examine', item)} />
                  )}
                  <TipButton tip="编辑" type="primary" icon="edit" onClick={() => handle('edit', item)} />
                  <TipButton
                    tip="查看"
                    type="primary"
                    icon="document"
                    disabled={item.cvFileUUID ? false : true}
                    onClick={() => handle('view', item)}
                  />
                  <TipButton tip="删除" type="primary" icon="delete" onClick={() => handle('delete', item)} />
                  <Popover
                    trigger="hover"
                    placement="top"
                    isOutside={true}
                    content={
                      <div style={{ width: 100, display: 'flex', flexDirection: 'column' }}>
                        <Loader
                          loading={loading.effects.resume.exportWord}
                          tip="加载中..."
                          style={{ width: '100%', height: '100%', flex: 1 }}
                          bgColor="rgba(255, 255, 255, .7)"
                        >
                          <Button basic block type="primary" onClick={() => handle('export', item)}>
                            导出Word
                          </Button>
                        </Loader>
                        <Loader
                          loading={loading.effects.resume.getDownloadFilePDF}
                          tip="加载中..."
                          style={{ width: '100%', height: '100%', flex: 1 }}
                          bgColor="rgba(255, 255, 255, .7)"
                        >
                          <Button basic block type="primary" onClick={() => handle('exportPdf', item)}>
                            导出PDF
                          </Button>
                        </Loader>
                        <Button basic block type="primary" onClick={() => handle('detailShare', item)}>
                          详细简历分享
                        </Button>
                        <Button basic block type="primary" onClick={() => handle('share', item)}>
                          简约简历分享
                        </Button>
                      </div>
                    }
                  >
                    <Button icon="more" className="buttonPopover" type="primary"></Button>
                  </Popover>
                </Row>
              </Card>
            </Fragment>
          );
        })}
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
    </Card>
  );
};
export default Index;
