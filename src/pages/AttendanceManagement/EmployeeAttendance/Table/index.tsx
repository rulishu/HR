import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  // 新增
  const addModal = () => {}

  // 删除
  const onDelete = () => {}

  // 翻页
  const onTurnPages = (current: number) => {}

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => addModal()}>
          打卡
        </Button>
        <Button
          icon="download"
          type="primary"
          onClick={() => {
            onDelete();
          }}
        >
          导出
        </Button>
        <Button
          icon="delete"
          type="danger"
          onClick={() => {
            onDelete();
          }}
        >
          删除
        </Button>
      </div>
      <Table
        columns={columns({})}
        data={[{name:'sss',status:1},{name:'sss',status:2}]}
        empty={<Empty />}
        footer={
          <Pagination
            current={1}
            pageSize={20}
            total={100}
            divider
            onChange={(current) => onTurnPages(current)}
          />
        }
      />
    </div>
  )
}

export default Page;