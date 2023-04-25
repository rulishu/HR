import React, { useEffect, useRef } from 'react';
import { useDispatch, Dispatch, useSelector, useNavigate, RootState, KktproKeys } from '@kkt/pro';
import { FormPage, Archives, ArchivesType } from '@/components'

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: {
      allFormData,
    },
    global: { roles, userData },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  const archivesRef = useRef<ArchivesType>(null);


  // 获取公司数据
  useEffect(() => {
    if (roles === 'entry') {
      entryInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  const entryInit = async () => {
    const { userId } = userData as any || {};
    dispatch.employeeInduction.selectStaffFile({
      userId
    })
  }

  /**
   * 提交
  */
  const onSubmit = async () => {
    const { userId } = userData as any || {};
    const values: KktproKeys = await archivesRef.current?.submitvalidate() || {};
    if (Object.keys(values).length !== 0) {
      dispatch.employeeInduction.submit({
        ...values,
        userId,
        callback: () => {
          if (roles === 'entry') {
            // entryInit();
            navigate('/home');
            // 刷新权限
            dispatch.global.getUserInfo({});
          } else {
            onReset();
          }
          // if (!values.id) {
          //   onReset();
          // }
        }
      })
    }
  }

  const onReset = async () => {
    archivesRef.current?.reset();
  }


  return (
    <FormPage
      buttons={[
        {
          type: "primary",
          label: '提交',
          onClick: onSubmit
        },
        {
          label: '重置',
          hide: allFormData && (allFormData as any).id,
          onClick: onReset
        },
      ]}
    >
      <Archives
        ref={archivesRef}
        data={allFormData}
      />
    </FormPage>
  )
}

export default Page;