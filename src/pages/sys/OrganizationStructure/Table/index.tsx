/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Button, Table, Empty, Pagination, Alert } from 'uiw';
import { columns } from './item'
import { useSelector, RootState } from '@kkt/pro';

const Index = () => {

  // 新增
  const addModals = () => { }
  // 翻页
  const onTurnPages = (current: any) => { }
  // 关闭
  const onDelClosed = () => { }
  // 确认删除
  const onConfirm = () => { }

  return (
    <Card noHover={true}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => addModals()}>
          新增
        </Button>
        <Button icon="plus" type="primary" onClick={() => addModals()}>
          删除
        </Button>
      </div>
      <Table
        columns={columns()}
        data={[]}
        empty={<Empty />}
        footer={
          <Pagination
            current={1}
            pageSize={10}
            total={30}
            divider
            onShowSizeChange={(current) => onTurnPages(current)}
          />
        }
      />
      <Alert
        isOpen={false}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      />
    </Card>
  )
}
export default Index;