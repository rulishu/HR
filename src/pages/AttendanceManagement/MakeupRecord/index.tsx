import React from 'react';
import { ProTable, useTable } from '@uiw-admin/components';

function MakeupRecord() {
  const table = useTable('https://randomuser.me/api', {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: 100,
        data: data.results,
      };
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        results: pageSize,
        ...searchValues,
      }
    },
    // requestOptions: {method: 'GET'}
  });

  return (
    <ProTable
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
      operateButtons={[
        {
          label: '导出',
          type: 'primary',
          icon: 'download',
          onClick: () => {
            // handleExport('export', {})
          },
        },
      ]}
      rowSelection={{
        // 多选 checkbox 单选radio
        type: 'checkbox',
        // 选中的键名 column里的key
        selectKey: 'name',
        // 默认值
        defaultSelected: [],
      }}
      paginationProps={{
        pageSizeOptions: [10,20,30],
        pageSize: 10,
      }}
      table={table}
      columns={[
        {
          title: '补卡时间',
          key: 'name',
          props: {
            widget: 'dateInputRange',
            initialValue: '',
            widgetProps: {
              // placeholder: '请输入补卡时间',
            },
          },
        },
        {
          title: '补卡理由',
          key: 'reasons',
          props: {
            widget: 'input',
            initialValue: '',
            widgetProps: {
              placeholder: '请输入',
            },
          },
        },
        {
          title: '审批结果',
          key: 'resultsApproval',
          props: {
            widget: 'select',
            option: [
              { label: '审批通过', value: 1 },
              { label: '审批未通过', value: 0 },
            ],
          },
        },
        {
          title: '审批状态',
          key: 'ApprovalStatus',
        },
        {
          title: '创建人',
          key: 'name',
        },
        {
          title: '创建时间',
          key: 'creationTime',
        },
        {
          title: '更新时间',
          key: 'updateTime',
        },
      ]}
    />
  );
}

export default MakeupRecord