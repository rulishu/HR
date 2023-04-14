import { useEffect } from 'react';
import { ProForm } from "@uiw-admin/components";

interface FormProps {
  title?: string;
  formDatas?: any[];
  form?: any;
  value?: any;
  readOnly?: boolean;
  onChange?: (old: any, current: any) => void;
}

const Form = (props: FormProps) => {
  const { form, formDatas, value, onChange } = props;

  // const form = useForm();

  useEffect(() => {
    if (form && value) {
      // form.setFields?.(value || {});
    }
  }, [value, form])

  return (
    <ProForm
      className='formInformation'
      readOnly={true}
      form={form}
      formType="pure"
      cardProps={{
        noHover: true
      }}
      formDatas={formDatas || []}
      onChange={(_, current) => onChange?.(_, current)}
    />
  )
}

export default Form;