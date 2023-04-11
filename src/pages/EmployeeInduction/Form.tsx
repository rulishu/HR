import { useEffect } from 'react';
import { ProForm } from "@uiw-admin/components";

interface FormProps {
  refs: any;
  title?: string;
  formDatas?: any[];
  form?: any;
  value?: any;
  onChange?: (old: any, current: any) => void;
}

const Form = (props: FormProps) => {
  const { refs, title, form, formDatas, value, onChange } = props;

  // const form = useForm();

  useEffect(() => {
    if (form && value) {
      // form.setFields?.(value || {});
    }
  }, [value, form])

  return (
    <ProForm
      title={title}
      ref={(e: any) => refs(e)}
      form={form}
      formType="card"
      cardProps={{
        noHover: true
      }}
      formDatas={formDatas || []}
      onChange={(_, current) => onChange?.(_, current)}
    />
  )
}

export default Form;