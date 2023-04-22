import { Tooltip, ButtonType, IconsName } from "uiw";
import { Btn } from './style';

interface TipButtonProps {
  tip: string;
  type?: ButtonType;
  icon?: IconsName;
  onClick?: () => void;
  disabled?: boolean
}

const TipButton = (props: TipButtonProps) => {
  const { tip, icon, type, onClick, disabled } = props;

  return (
    <Tooltip placement="top" content={tip}>
      <Btn
        icon={icon}
        type={type}
        size="large"
        onClick={onClick}
        disabled={disabled}
      />
    </Tooltip>
  )
}

export default TipButton;