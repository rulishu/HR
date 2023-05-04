import { Fragment, useState } from 'react';
import { Menu } from 'uiw';
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
      <div>
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
                  dispatch({
                    type: 'resume/update',
                    payload: {
                      post: post
                    }
                  })
                  dispatch.resume.quickSelect({ post, companyId: companyId, page: page, pageSize: pageSize })
                }}
              />
              <Menu.Divider />
            </Fragment>
          )
        })}
      </div>
    )
  }
  return (
    <Menu>
      {render()}
    </Menu>
  )
}
export default Index;