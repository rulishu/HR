import { Card } from 'uiw';
import { ProForm } from '@uiw-admin/components'

interface RegularsProps {
  refs: any;
  title?: React.ReactNode;
  formDatas?: any[];
  form?: any;
  type?: 'edit' | 'look';
  readOnly?: boolean;
  onChange?: (old: any, current: any) => void;
}
const Regulars = (
  props: RegularsProps,
) => {
  const { refs, title, type = 'edit', form, readOnly, formDatas, onChange } = props;
  return (
    <Card
      title={title}
    >
      <ProForm
        readOnly={readOnly}
        ref={(e: any) => refs(e)}
        form={form}
        formType={type === 'edit' ? 'card' : 'pure'}
        cardProps={{
          noHover: true
        }}
        formDatas={formDatas || []}
        onChange={(_, current) => onChange?.(_, current)}
      />
    </Card>
  )
}
export default Regulars;