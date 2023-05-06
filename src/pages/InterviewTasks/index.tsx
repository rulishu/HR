import { Fragment, useEffect } from 'react';
import { Card, Empty, Button, Row, Col, Pagination, Popover, Loader } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { TipButton } from '@/components';
import { getDictLabel } from '@/utils';
import Modal from './Modal';
// import '../style/index.css';

const Index = () => {
  const {
    loading,
    interviewTasks: { TableData, formData, cvFileUUID, total, page, pageSize, companyId, post },
    global: { dictObject, userData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.global.getUserInfo({
      callback: (res: any) => {
        dispatch.interviewTasks.selectCVByInterview({
          assignInterviewer: (userData as any)?.userId,
          page: page,
          pageSize: pageSize,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchFn = (params: any) => {
    dispatch({
      type: 'interviewTasks/update',
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
      dispatch.interviewTasks.getCVUpdateLogs({ id: data.id });
    }
    // 审批
    if (type === 'examine') {
      dispatch({
        type: 'interviewTasks/update',
        payload: {
          examineVisible: true,
          vitaId: data.id,
          hrPersonDate: [],
          itPersonDate: [],
        },
      });
      dispatch.interviewTasks.selectUserVC({
        id: data.id,
      });
    }

    if (type === 'view') {
      // dispatch.interviewTasks.getDownloadFile(data?.cvFileUUID)
      window.open(`/api/vc/previewPdf?id=${data?.cvFileUUID}&exportVersion`);
    }
    if (type === 'export') {
      dispatch.interviewTasks.exportWord({ userId: data.userId, id: data.id });
    }
    if (type === 'exportPdf') {
      dispatch.interviewTasks.getDownloadFilePDF({ id: data.id });
    }

    if (type === 'detailShare') {
      window.open(`/api/vc/previewPdf?id=${data?.id}&exportVersion=1`);
    }
    if (type === 'share') {
      window.open(`/api/vc/previewPdf?id=${data?.id}&exportVersion=2`);
    }
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
          type: 'interviewTasks/selectCVByInterview',
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

  return (
    <Card noHover bordered={false} style={{ borderLeft: '1px solid rgba(16, 22, 26, 0.15)' }} footer={footer}>
      <div style={{ height: '100%' }}>
        {TableData?.map((item: any, idx: any) => {
          return (
            <Fragment key={idx}>
              <Card style={{ marginBottom: 10 }} noHover>
                <Row align="middle">
                  <Col> 姓名： {item?.name} </Col>
                  <Col> 手机号： {item?.phone} </Col>
                  <Col> 性别： {getDictLabel(dictObject?.sex?.child, item?.gender)} </Col>
                  <Col> 年龄： {item.age} </Col>
                  <Col> 应聘岗位: {getDictLabel(dictObject?.post?.child, item?.post)}</Col>
                  <Col> 学历：{getDictLabel(dictObject?.education?.child, item?.educational)}</Col>
                  <Col>
                    工作经验： {item?.experience} {item?.experience ? '年' : ''}
                  </Col>
                  <TipButton tip="审批" type="primary" icon="time-o" onClick={() => handle('examine', item)} />
                  <TipButton
                    tip="查看"
                    type="primary"
                    icon="document"
                    // disabled={item.cvFileUUID ? false : true}
                    onClick={() => handle('view', item)}
                  />
                  <Popover
                    trigger="hover"
                    placement="top"
                    isOutside={true}
                    content={
                      <div style={{ width: 100, display: 'flex', flexDirection: 'column' }}>
                        <Loader
                          loading={loading.effects.interviewTasks.exportWord}
                          tip="加载中..."
                          style={{ width: '100%', height: '100%', flex: 1 }}
                          bgColor="rgba(255, 255, 255, .7)"
                        >
                          <Button basic block type="primary" onClick={() => handle('export', item)}>
                            导出Word
                          </Button>
                        </Loader>
                        <Loader
                          loading={loading.effects.interviewTasks.getDownloadFilePDF}
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
                  ></Popover>
                </Row>
              </Card>
            </Fragment>
          );
        })}
      </div>
      {TableData?.length <= 0 && <Empty />}
      <Modal />
    </Card>
  );
};
export default Index;
