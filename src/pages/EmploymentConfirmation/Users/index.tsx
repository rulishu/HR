import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Input } from 'uiw';
import { Scroll } from '@/components';
import { UsersWrap, Title, TitleSpan, InputWrap, UsersItems, UsersAvatar, UsersTit, UsersDate } from '../style/users';
import newDebounce from "@/utils/debounce";
import { getDictLabel } from '@/utils';

const Users = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: { list, total, page, checkId },
    global: { dictObject = {} },
  } = useSelector((state: RootState) => state);

  const onLoad = () => {
    dispatch.profileRatify.selectStaffFile({
      isApproved: 0,
      page: page + 1
    });
  }

  // 筛选 
  const onSearch = (value: string) => {
    // dispatch.profileRatify.updateState({
    //   list: []
    // })
    dispatch.profileRatify.updateState({
      search: value,
    })
    dispatch.profileRatify.selectStaffFile({
      page: 1,
      isApproved: 0,
      search: value,
      callback: (data: KktproKeys[]) => {
        if (data.length > 0) {
          dispatch.profileRatify.updateState({
            checkId: data[0].id,
          })
          dispatch.profileRatify.getUserDetails({
            id: data[0].id
          })
        }
      }
    });
  }

  const onSelectUser = (item: KktproKeys, index: number) => {
    if (checkId === item.id) return;
    dispatch.profileRatify.updateState({
      checkIndex: index,
      allFormData: undefined
    })
    dispatch.profileRatify.getUserDetails({
      id: item.id
    })
  }

  return (
    <UsersWrap>
      <Scroll isScroll={list.length < total} load={onLoad}>
        <Title>
          申请人
          <TitleSpan><i style={{ color: '#008ef0'}}>{total}</i> 条</TitleSpan>
        </Title>
        <InputWrap>
          <Input
            className='searchName'
            size='large'
            preIcon="search"
            placeholder="请输入姓名或手机号"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              newDebounce(() => {
                // 防抖
                const val = e.target.value
                onSearch(val);
                //onVal(e);
              }, 600)
            }}
          />
        </InputWrap>
        {list.map((item: KktproKeys, index: number) => {
          const postData: any = (dictObject as any)?.post;
          const post = getDictLabel(postData.child, item.post)
          return (
            <UsersItems key={index} active={item.id === checkId} onClick={() => onSelectUser(item, index)}>
              <UsersAvatar size="large" icon="user" />
              <UsersTit>{item.name || '--'}</UsersTit>
              <UsersDate>申请职位：{post || '--'}</UsersDate>
              <UsersDate>申请时间：{item.createTime || '--'}</UsersDate>
            </UsersItems>
          )
        })}
      </Scroll>
    </UsersWrap>
  )
}

export default Users;