import { TipButton } from '@/components';

export const columns = (
  handle: (type: any, rowData: any) => void,
) => {

  return [
    {
      title: '培训公告',
      key: 'title',
    },
    {
      title: '公告注意事项描述',
      key: 'text',
    },
    {
      title: '操作',
      key: 'edit',
      render: (text: any, key: any, rowData: any, rowNumber: any, columnNumber: any) => (
        <div>
          <TipButton
            tip='编辑'
            type='primary'
            icon='edit'
            onClick={() => { handle('edit', rowData) }}
          />
          <TipButton
            tip='删除'
            type='primary'
            icon='delete'
            onClick={() => { handle('del', rowData) }}
          />
        </div>
      ),
    },
  ]
} 