import { useState } from 'react';
import { Popover, Input, Card, Row } from 'uiw';
import { CardWrap, ColItems, IconBox, IconItems, IconBoxText } from './style';

type iconListType = {
  label: string;
  value: string;
}

interface IconInputProps {
  value?: string;
  option?: iconListType[];
  onChange?: (value: string) => void;
}

const IconInput = (props: IconInputProps) => {
  const { value, option = [], onChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onVisibleChange = (is: boolean) => {
    setIsOpen(is);
  }

  const onSelectIcon = (item: iconListType) => {
    onChange?.(item.value);
    setIsOpen(false);
  }

  const renderPopup = () => {
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <CardWrap>
          <Row>
            {option.map((item: iconListType, index: number) => (
              <ColItems key={index}>
                <IconBox
                  active={item.value === value}
                  onClick={() => onSelectIcon(item)}
                >
                  <IconItems type={item.value} />
                  <IconBoxText>{item.label}</IconBoxText>
                </IconBox>
              </ColItems>
            ))}
          </Row>
        </CardWrap>
      </Card>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Popover
        trigger="focus"
        placement="bottomLeft"
        isOpen={isOpen}
        onVisibleChange={onVisibleChange}
        content={renderPopup()}
      >
        <Input
          placeholder="请输入内容"
          value={value}
        />
      </Popover>
    </div>
  )
}

export default IconInput;