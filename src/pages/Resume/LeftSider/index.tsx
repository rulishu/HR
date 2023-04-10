import { Fragment } from 'react';
import { List } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    resume: { listData }
  } = useSelector((state: RootState) => state)

  return (
    <Fragment>
      <List
        dataSource={listData}
        noHover
        renderItem={(item, idx) => {
          return (
            <Fragment key={idx}>
              {/* <div > */}
              <List.Item onClick={() => console.log(item)}>
                {item.level}
              </List.Item>
              {/* </div> */}
            </Fragment>
          )
        }}
      />
    </Fragment >
  )
}
export default Index;