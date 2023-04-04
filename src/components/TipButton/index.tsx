import { Tooltip, ButtonType, IconsName } from "uiw";
import { Btn } from './style';

interface TipButtonProps {
  tip: string;
  type?: ButtonType;
  icon?: IconsName;
  onClick?: () => void;
}

const TipButton = (props: TipButtonProps) => {
  const { tip, icon, type, onClick } = props;

  return (
    <Tooltip placement="top" content={tip}>
      <Btn
        icon={icon}
        type={type}
        size="large"
        onClick={onClick}
      />
    </Tooltip>
  )
}

export default TipButton;