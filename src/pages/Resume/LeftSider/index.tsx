import { Fragment, useState } from 'react';
import { Menu, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    resume: { listData }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const [isColor, setIsColor] = useState(10)

  const render = () => {
    return (
      <Card noHover style={{ height: 600, overflow: 'scroll' }}>
        {listData?.map((item: any, idx: any) => {
          let valueItem = listData.find((itm: any) => itm?.post === item.post)
          let value = valueItem?.value

          return (
            <Fragment key={idx}>
              <Menu.Item
                active={item.value === isColor ? true : false}
                text={item.post}
                onClick={() => {
                  setIsColor(item.value)
                  dispatch.resume.quickSelect({ value })
                }}
              />
              <Menu.Divider />
            </Fragment>
          )
        })}
      </Card>
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