import { Fragment } from 'react';
import { Menu } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    resume: { listData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()

  const render = () => {
    return (
      <Fragment>
        {listData?.map((item: any, idx: any) => {
          return (
            <Fragment key={idx}>
              <Menu.Item
                text={item.level}
                onClick={() => {
                  dispatch({
                    type: 'resume/update',
                    payload: {
                      listType: item.value
                    }
                  })
                }}
              />
              <Menu.Divider />
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Menu>
        {render()}
      </Menu>
    </Fragment >
  )
}
export default Index;