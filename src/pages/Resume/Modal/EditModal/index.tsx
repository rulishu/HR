import { Fragment } from 'react';
import { Drawer, Card, Button } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { ProForm, useForm } from "@uiw-admin/components";
import { formList, form2List } from './item';
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
      editType,
      file,
      // projectExperience,x
      companyId,
      page,
      pageSize,
      total
    },
    archives: { workData },
    global: { dictObject, },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const form = useForm();
  const form2 = useForm();

  const onclose = () => {
    dispatch({
      type: 'resume/update',
      payload: {
        editVisible: false,
        formData: {},
        editType: "none",
        isProjectVisible: false
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
  const onChangeProject = (current?: any) => {
    dispatch({
      type: 'resume/update',
      payload: {
        formData: { ...formData, ...current, }
      }
    })
  }
  const onScreenSubmit = (current?: any, current2?: any) => {
    if (editType === 'add') {
      dispatch.resume.insert({
        tcurriculumVitae: {
          ...current,
          ...current2,
          cvFileUUID
        },
        companyId: companyId
      }).then(() => form?.resetForm?.()
      );
    }
    if (editType === 'edit') {
      dispatch({
        type: 'resume/updateVC',
        payload: {
          ...formData,
          cvFileUUID,
          companyId: companyId,
          workExperience: [...workData],
        }
      })
      dispatch.resume.quickSelect({
        companyId: companyId,
        page: page,
        pageSize: pageSize,
        total: total
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
            type: "resume/update",
            payload: { cvFileUUID: data?.uuid },
          });
        }
      })
    }
  }
  const workOnAdd = () => {
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
          title={'基础信息'}
          form={form}
          className='formResume'
          formType="card"
          cardProps={{
            noHover: true
          }}
          saveButtonProps={{ type: "primary" }}
          readOnlyProps={{ column: 2 }}
          // onSubmit={(_, current) => onScreenSubmit(current)}
          onChange={(_, current) => { onChange(current) }}
          formDatas={formList(formData, handleChange, dictObject, editType, file)}
        />
        {/* 工作经历 */}
        {editType === 'edit' &&
          <Card noHover title={'工作经历'} extra={
            <PlusItems onClick={() => workOnAdd()}>
              <PlusIcon type="plus" />
              工作经历
            </PlusItems>
          }>
            <WorkTable type="edit" />
            <WorkModals />
          </Card>}
        {/* 项目经验 */}
        {editType === 'edit' && <ProForm
          title={'项目经验'}
          form={form2}
          readOnlyProps={{ column: 2 }}
          onChange={(_, current) => { onChangeProject(current) }}
          formDatas={form2List(formData)}
        />}

        {/* useForm验证提交 */}
        <Button
          style={{ marginTop: 10, width: 80 }}
          type="primary"
          onClick={async () => {
            // 触发验证
            await form.submitvalidate();
            await form2.submitvalidate();
            // 获取错误信息
            const errors = form.getError()
            const errors2 = form2.getError()
            if (errors && Object.keys(errors).length > 0) return
            if (errors2 && Object.keys(errors2).length > 0) return
            const value = form.getFieldValues?.()
            const value2 = form2.getFieldValues?.()
            onScreenSubmit(value, value2)
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