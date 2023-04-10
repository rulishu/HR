import { useEffect } from 'react';
import { ProForm, useForm } from "@uiw-admin/components";

interface FormProps {
  refs: (e: any) => void;
  title?: string;
  formDatas?: any[];
  value?: any;
}

const Form = (props: FormProps) => {
  const { refs, title, formDatas, value } = props;

  const form = useForm();

  useEffect(() => {
    if (form && value !== undefined) {
      form.setFields?.(value || {});
    }
  }, [value, form])

  return (
    <ProForm
      title={title}
      // ref={ref}
      ref={(e: any) => refs(e)}
      form={form}
      formType="card"
      cardProps={{
        noHover: true
      }}
      formDatas={formDatas || []}
    />
  )
}

export default Form;