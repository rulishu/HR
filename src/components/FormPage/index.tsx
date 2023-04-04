import { ButtonProps, Button } from 'uiw';
import { PageWraps, FixedWrap, FixedBody } from './style';

export interface FormPageButtonsProps extends Omit<ButtonProps, 'label' | 'ref'> {
  label?: React.ReactNode;
}

export interface FormPageProps {
  className?: string;
  style?: React.CSSProperties;
  buttons?: FormPageButtonsProps[];
  children?: React.ReactNode;
}

const Page = (props: FormPageProps) => {
  const { className, style, buttons = [] } = props;
  return (
    <PageWraps className={className} style={style}>
      {props.children}
      <FixedWrap>
        <FixedBody>
          {buttons.map((item: FormPageButtonsProps, index: number) => {
            const { label, children, ...other } = item;
            return (
              <Button className="form-btn" key={index} {...other}>{label || children}</Button>
            )
          })}
        </FixedBody>
      </FixedWrap>
    </PageWraps>
  )
}

export default Page;