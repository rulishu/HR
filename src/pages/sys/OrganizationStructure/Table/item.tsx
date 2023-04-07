import { Button } from 'uiw';
// import { useSelector, RootState } from '@kkt/pro';

export const columns = () => {

  // const onClickCheckbox = () => { }
  return [
    // {
    //   title: () => {
    //     const indeterminate = dataSource.length !== checked.length && checked.length > 0;
    //     const checked = dataSource.length === checked.length;
    //     return (
    //       <Checkbox
    //         checked={checked}
    //         indeterminate={indeterminate}
    //         onClick={(evn) => {
    //           let checked = dataSource.map((item: any, idx: any) => idx);
    //           if (!evn.target.checked) {
    //             checked = [];
    //           }
    //           setState({ checked });
    //         }}
    //       />
    //     );
    //   },
    //   key: 'checked',
    //   render: (text: any, key: any, rowData: any,) => {
    //     return (
    //       <Checkbox checked={rowData.checked} onClick={() => { onClickCheckbox()}} />
    //     );
    //   }
    // },
    {
      title: '实际申请人',
      key: 'name',
      width: 100,
    },
    {
      title: '入职日期',
      key: 'name',
      width: 100,
    },
    {
      title: '试用期',
      key: 'name',
      width: 100,
    },
    {
      title: '转正日期',
      key: 'name',
      width: 100,
    },
    {
      title: '职位',
      key: 'name',
      width: 100,
    },
    {
      title: '职级',
      key: 'name',
      width: 100,
    },
    {
      title: '工作地点',
      key: 'name',
      width: 100,
    },
    {
      title: '对本岗位的理解',
      key: 'name',
      width: 100,
    },
    {
      title: '试用期内对工作的总结',
      key: 'name',
      width: 100,
    },
    {
      title: '对公司的意见和建议',
      key: 'name',
      width: 100,
    },
    {
      title: '审批结果',
      key: 'name',
      width: 100,
    },
    {
      title: '审批状态',
      key: 'name',
      width: 100,
    },
    {
      title: '当前节点',
      key: 'name',
      width: 100,
    },
    {
      title: '当前负责人',
      key: 'name',
      width: 100,
    },
    {
      title: '历史审批人',
      key: 'name',
      width: 100,
    },
    {
      title: '审批编号',
      key: 'name',
      width: 100,
    },
    {
      title: '创建人',
      key: 'name',
      width: 100,
    },
    {
      title: '创建时间',
      key: 'name',
      width: 100,
    },
    {
      title: '更新时间',
      key: 'name',
      width: 100,
    },
    {
      title: '创建人部门',
      key: 'name',
      width: 100,
    },
    {
      title: '操作',
      key: 'edit',
      width: 200,
      render: () => (
        <div>
          <Button size="small" type="danger">删除</Button>
          <Button size="small" type="success">修改</Button>
        </div>
      ),
    },
  ]
}