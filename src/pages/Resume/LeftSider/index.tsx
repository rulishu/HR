import { Fragment, useState } from 'react';
import { Menu, Card } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    global: { dictObject },
    resume: { companyId, page, pageSize }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const [isColor, setIsColor] = useState('')

  const render = () => {
    return (
      <Card noHover style={{ height: 660, overflow: 'scroll' }}>
        {dictObject?.post?.child?.map((item: any, idx: any) => {
          let valueItem = dictObject?.post?.child?.find((itm: any) => itm.label === item.label)
          let post = valueItem?.value

          return (
            <Fragment key={idx}>
              <Menu.Item
                active={item.value === isColor ? true : false}
                text={item.label}
                onClick={() => {
                  setIsColor(item.value)
                  dispatch.resume.quickSelect({ post, companyId: companyId, page: page, pageSize: pageSize })
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