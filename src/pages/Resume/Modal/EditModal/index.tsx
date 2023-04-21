import { Fragment } from 'react';
import { Drawer, Card, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm, useForm } from "@uiw-admin/components";
import { formList } from './item';
import '../../style/index.css';
import WorkTable from '@/components/Archives/Tables/Work';
import WorkModals from '@/components/Archives/Modals/Work';
import { PlusItems, PlusIcon } from '../../style/style';

const Index = () => {
  const {
    resume: {
      editVisible,
      formData,
      cvFileUUID,
      editType
    },
    archives: { workData },
    global: { dictObject, },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const form = useForm();

  const onclose = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        editVisible: false,
        formData: {},
        editType: "none"
      }
    })
  }
  const onChange = (current?: any) => {
    dispatch({
      type: 'resume/update',
      payload: {
        formData: { ...formData, ...current, }
      }
    })
  }
  const onScreenSubmit = (current?: any) => {
    if (editType === 'add') {
      dispatch.resume.insert({
        ...current,
        cvFileUUID
      }).then(() => form?.resetForm?.()
      );
    }
    if (editType === 'edit') {
      dispatch({
        type: 'resume/updateVC',
        payload: {
          ...formData,
          workExperience: [...workData]
        }
      })
    }
    onclose()
  }

  const handleChange = (value = []) => {
    if (value.length > 0) {
      dispatch.global.uploadFile({
        params: value[0],
        callback: (data: any) => {
          dispatch({
            type: "resume/updateState",
            payload: { cvFileUUID: data?.uuid },
          });
        }
      })
    }
  }
  const onAdd = () => {
    dispatch({
      type: "archives/updateState",
      payload: {
        isWorkVisible: true,
      },
    });
  }

  return (
    <Fragment>
      <Drawer
        title={editType === 'add' ? "新增简历" : "编辑简历"}
        isOpen={editVisible}
        onClose={() => onclose()}
        size={1000}
      >
        <ProForm
          form={form}
          className='formResume'
          formType="pure"
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          // onSubmit={(_, current) => onScreenSubmit(current)}
          onChange={(_, current) => { onChange(current) }}
          formDatas={formList(formData, handleChange, dictObject, editType)}
        />
        {/* 工作经历 */}
        {editType === 'edit' && <Card noHover title={'工作经历'} extra={
          <PlusItems onClick={() => onAdd()}>
            <PlusIcon type="plus" />
            工作经历
          </PlusItems>
        }>
          <WorkTable type="edit" />
          <WorkModals />
        </Card>}
        {/* useForm验证提交 */}
        <Button
          style={{ marginTop: 10, width: 80 }}
          type="primary"
          onClick={async () => {
            // 触发验证
            await form.submitvalidate();
            // 获取错误信息
            const errors = form.getError()
            if (errors && Object.keys(errors).length > 0) return
            const value = form.getFieldValues?.()
            onScreenSubmit(value)
            // 调用请求接口
          }}
        >
          保存
        </Button>
        <Button
          style={{ marginTop: 10, width: 80 }}
          onClick={() => { onclose() }}
        >
          取消
        </Button>
      </Drawer>
    </Fragment >
  )
}
export default Index;