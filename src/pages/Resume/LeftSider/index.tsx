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
          let valueItem = listData.find((itm: any) => itm?.post === item.post)
          let value = valueItem?.value

          return (
            <Fragment key={idx}>
              <Menu.Item
                text={item.post}
                onClick={() => {
                  dispatch.resume.quickSelect({ value })
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