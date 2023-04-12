import { Fragment } from 'react';
import { Icon } from 'uiw';

const Index = () => {
  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <p>简历详细内容</p>
          <Icon type="star-off" />
          <Icon type="download" />
        </div>
        <Icon type="close" />
      </div>
    </Fragment>
  )
}
export default Index;