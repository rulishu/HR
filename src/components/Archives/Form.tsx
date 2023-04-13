import { ProForm } from "@uiw-admin/components";

interface FormProps {
  refs: any;
  title?: string;
  formDatas?: any[];
  form?: any;
  type?: 'edit' | 'look';
  readOnly?: boolean;
  onChange?: (old: any, current: any) => void;
}

const Form = (props: FormProps) => {
  const { refs, title, type = 'edit', form, readOnly, formDatas, onChange } = props;

  return (
    <ProForm
      title={title}
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
  )
}

export default Form;