import React from 'react';
import { Icon } from 'uiw';
import newDebounce from "@/utils/debounce";

export interface ScrollProps {
  height?: number | string;
  /**
   * 距离底部像素， 默认20
  */
  interval?: number;
  children?: React.ReactNode;
  // 是否监听滑动
  isScroll?: boolean;
  load?: () => void;
}

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 44,
  color: '#ccc'
}

const Scroll = (props: ScrollProps) => {
  const {
    height = '100%',
    interval = 20,
    isScroll = true,
    load
  } = props;

  const onScroll = (data: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!isScroll) return;
    const div = data.target as HTMLDivElement;
    const h: number = div.scrollTop + div.clientHeight + interval;
    if (h > div.scrollHeight) {
      load?.();
    }
  }
  return (
    <div
      style={{ overflowY: 'auto', height: height }}
      onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        newDebounce(() => onScroll(e), 500)
      }}
    >
      {props.children}
      {isScroll ? (
        <div style={loadingStyle}>
          <Icon type="loading" spin={true} />
          <span style={{ marginLeft: 5 }}>数据加载中</span>
        </div>
      ): <div style={loadingStyle}>没有更多了</div>}
    </div>
  )
}

export default Scroll;