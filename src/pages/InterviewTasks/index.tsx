import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { ProTable, useTable } from '@uiw-admin/components';
import { getDictLabel } from '@/utils';
import { TipButton } from '@/components';
import { Button, Popover, Loader } from 'uiw';
import Modal from './Modal';
import { useEffect } from 'react';

function ArchiveApprovalRecord() {
  const {
    loading,
    sysDataDictionary: { dataList = [] },
    global: { dictObject },
    interviewTasks: { formData, cvFileUUID },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.sysDataDictionary.selectList({
      callback: (data: any) => {
        dispatch.sysDataDictionary.updateState({
          dataList: data,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //获取学历
  const ele = dataList
    .filter((item: any) => {
      return item.dictType === 'education';
    })
    .map((a: any) => a.dictData)
    .flat();

  const eleOption = ele.map((itm: any) => {
    return {
      label: itm.dictLabel,
      value: itm.dictValue,
    };
  });

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

  let token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const table = useTable('/api/vc/selectCVByInterview', {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data.data.total,
        data: data.data.list,
      };
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (page, pageSize, searchValues) => {
      return {
        // assignInterviewer: (userData as any)?.userId,
        page: page,
        pageSize: pageSize,
        ...searchValues,
      };
    },
    requestOptions: {
      headers: { Authorization: '' + token },
    },
  });

  return (
    <div className="formRecord">
      <ProTable
        formCol={3}
        // 搜索栏按钮
        searchBtns={[
          {
            label: '搜索',
            type: 'primary',
            onClick: () => {
              table.onSearch();
            },
          },
          {
            label: '重置',
            onClick: () => {
              table.onReset();
            },
          },
        ]}
        table={table}
        columns={[
          {
            title: '姓名',
            key: 'name',
            props: {
              widget: 'input',
              initialValue: '',
              widgetProps: {
                placeholder: '请输入',
              },
            },
          },
          {
            title: '手机号',
            key: 'phone',
          },
          {
            title: '性别',
            key: 'gender',
            render: (item: any, key: any, rowData: any) => {
              return <div>{getDictLabel(dictObject?.sex?.child, rowData?.gender)}</div>;
            },
          },
          {
            title: '年龄',
            key: 'age',
          },
          {
            title: '应聘岗位',
            key: 'post',
            render: (text: any, key: any, rowData: any) => {
              return <div>{getDictLabel(dictObject?.post?.child, rowData?.post)}</div>;
            },
          },
          {
            title: '学历',
            key: 'educational',
            render: (text: any, key: any, rowData: any) => {
              return <div>{getDictLabel(dictObject?.education?.child, rowData?.educational)}</div>;
            },
            props: {
              widget: 'select',
              option: eleOption,
            },
          },
          {
            title: '工作经验',
            key: 'experience',
            render: (text: any, key: any, rowData: any) => {
              return <div>{rowData?.experience ? rowData?.experience + '年' : ''} </div>;
            },
          },
          {
            title: '操作',
            key: 'edit',
            width: 120,
            render: (text: any, key: any, rowData: any) => {
              return (
                <>
                  <TipButton tip="审批" type="primary" icon="time-o" onClick={() => handle('examine', rowData)} />
                  <TipButton
                    tip="查看"
                    type="primary"
                    icon="document"
                    disabled={rowData.cvFileUUID ? false : true}
                    onClick={() => handle('view', rowData)}
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
                          <Button basic block type="primary" onClick={() => handle('export', rowData)}>
                            导出Word
                          </Button>
                        </Loader>
                        <Loader
                          loading={loading.effects.interviewTasks.getDownloadFilePDF}
                          tip="加载中..."
                          style={{ width: '100%', height: '100%', flex: 1 }}
                          bgColor="rgba(255, 255, 255, .7)"
                        >
                          <Button basic block type="primary" onClick={() => handle('exportPdf', rowData)}>
                            导出PDF
                          </Button>
                        </Loader>
                        <Button basic block type="primary" onClick={() => handle('detailShare', rowData)}>
                          详细简历分享
                        </Button>
                        <Button basic block type="primary" onClick={() => handle('share', rowData)}>
                          简约简历分享
                        </Button>
                      </div>
                    }
                  ></Popover>
                </>
              );
            },
          },
        ]}
      />
      <Modal table={table} />
    </div>
  );
}

export default ArchiveApprovalRecord;
