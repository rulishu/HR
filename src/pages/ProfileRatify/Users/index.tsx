// import { useState } from 'react';
import { Input } from 'uiw';
import { UsersWrap, Title, InputWrap, UsersItems, UsersAvatar, UsersTit, UsersDate } from '../style/users';
import newDebounce from "@/utils/debounce";

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
const Users = () => {
  return (
    <UsersWrap>
      <Title>申请人</Title>
      <InputWrap>
        <Input
          className='searchName'
          size='large'
          preIcon="search"
          placeholder="请输入内容"
          onChange={(e) => {
            newDebounce(() => {
              // 防抖
              // onVal(e);
            }, 600)
          }}
        />
      </InputWrap>
      {data.map((item, index) => (
        <UsersItems key={index} active={index === 1}>
          <UsersAvatar size="large" icon="user" />
          <UsersTit>张三</UsersTit>
          <UsersDate>申请职位：前端开发</UsersDate>
          <UsersDate>申请时间：2023-03-02 16:00:00</UsersDate>
        </UsersItems>
      ))}
    </UsersWrap>
  )
}

export default Users;