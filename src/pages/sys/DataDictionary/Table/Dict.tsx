import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Card } from "uiw";
import { dictColumns } from './utils';
import { FlexItem, FlexItemLabel } from './style';

const Page = () => {
  const {
    sysDataDictionary: { dictDataList, dictData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑
  const onModals = (type: 'add' | 'edit', data?: any) => {
    dispatch.sysDataDictionaryModal.onDictModals({ type, data });
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.sysDataDictionary.updateState({
      isDelete: true,
      isDictDelect: true
    });
    dispatch.sysDataDictionaryModal.updateState({
      dictDetailsData: data
    });
  }

  return (
    <Card noHover={true}>
      <FlexItem style={{ marginBottom: 15 }}>
        <FlexItemLabel>{(dictData as any)?.dictName || '--'}</FlexItemLabel>
        <Button
          icon="plus"
          type="primary"
          onClick={() => onModals('add')}
        >
          新增字典项
        </Button>
      </FlexItem>
      <Table
        columns={dictColumns({
          onEdit: (data) => onModals('edit', data),
          onDelete
        })}
        data={dictDataList}
        empty={<Empty />}
      />
    </Card>
  )
}

export default Page;