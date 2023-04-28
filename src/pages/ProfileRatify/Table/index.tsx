import { useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { ProTable, useTable } from '@uiw-admin/components';
import formatter from '@uiw/formatter'

function ArchiveApprovalRecord() {
  const {
    employeeInduction: { companyList = [] },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.employeeInduction.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const table = useTable('/api/userTimeline/selectTimeline', {
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
        page: page,
        pageSize,
        types: [3],
        ...searchValues,
      }
    },
    requestOptions: {
      headers: { 'Authorization': ''+token },
    },
  });

  return (
    <div className='formRecord'>
      <ProTable
        formCol={3}
        // 搜索栏按钮
        searchBtns={[
          {
            label: '搜索',
            type: 'primary',
            onClick: () => {
              table.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => {
              table.onReset()
            },
          },
        ]}
        // operateButtons={[
        //   {
        //     label: '导出',
        //     type: 'primary',
        //     icon: 'download',
        //     onClick: () => {
        //       // handleExport('export', {})
        //     },
        //   },
        // ]}
        rowSelection={{
          // 多选 checkbox 单选radio
          type: 'checkbox',
          // 选中的键名 column里的key
          selectKey: 'staffId',
          // 默认值
          defaultSelected: [],
        }}
        table={table}
        columns={[
          {
            title: "姓名",
            key: "name",
            props: {
              widget: 'input',
              initialValue: '',
              widgetProps: {
                placeholder: '请输入',
              },
            },
          },
          {
            title: "公司",
            key: "companyName",
          },
          {
            title: "部门",
            key: "department",
            render: (text: any, key: any, rowData: any) => {
              let department = "";
              const data: any = companyList?.filter((item: any) => item.id === Number(rowData?.company))?.[0]
              data?.department?.map((items: any) => {
                if (items.id === Number(text)) {
                  department = items.departmentName;
                  return department;
                } else {
                  return null;
                }
              })
              return <div>{department}</div>;
            },
          },
          {
            title: "职位",
            key: "post",
            render: (text: any, key: any, rowData: any) => {
              const data = dictObject['post']?.child.filter((item: any) => item.value === text)?.[0]
              return <div>{data?.label}</div>;
            },
            props: {
              widget: 'select',
              option: dictObject['post']?.child,
            },
          },
          {
            title: '入职日期',
            key: 'entryDate',
            render: (text: any) => {
              const entryDate = formatter('YYYY-MM-DD', new Date(text));
              return <div>{entryDate}</div>
            },
          },
          {
            title: '审批人',
            key: 'contexts',
          },
          // {
          //   title: '审批状态',
          //   key: 'context',
          // },
          {
            title: '审批结果',
            key: 'context',
            props: {
              widget: 'select',
              option: [
                { label: '入职通过', value: '入职通过' },
                { label: '入职审批未通过', value: '入职审批未通过' },
              ],
            },
          },
          {
            title: '创建时间',
            key: 'staffCreateTime',
          },
          {
            title: '更新时间',
            key: 'createTime',
          },
        ]}
      />
    </div>
  );
}

export default ArchiveApprovalRecord