import { KktproKeys, useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { Card, Notify } from 'uiw';
import Form from './Form';
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import Modals from './Modals';
import { formData, formDataVoid, addConfig, dateShift, datesShift } from './utils';
import { asyncAwaitFormList } from '@/utils/valid';
import { PageWraps, PlusItems, PlusIcon  } from './style';

export type ArchivesType = {
  /** 效验并获取value */
  submitvalidate: () => void;
  /** 获取值 */
  getValues: () => void;
  /** 重置 */
  reset: () => void;
}

interface ArchivesProps {
  /** edit: 编辑新增 look: 查看 */
  type?: 'edit' | 'look';
  /** 编辑的信息 */
  data?: KktproKeys | undefined;
  /** form 表单数据变化 */
  onChangeValue?: (data: KktproKeys) => void;
}

const Archives = (
  props: ArchivesProps,
  ref: React.ForwardedRef<ArchivesType | undefined | null>
) => {
  const {
    type = 'edit',
    data,
  } = props;

  const [newData, setNewData] = useState<KktproKeys>({});

  const dispatch = useDispatch<Dispatch>();
  const {
    archives: {
      companyList = [],
      educationData = [],
      workData = [],
      familyData = []
    },
    global: { dictObject },
  } = useSelector((state: RootState) => state);

  const formRefList = useRef<any>([]);
  // 过滤删除为null的ref
  const formList = formRefList?.current.filter((n: any) => n) || []

  useImperativeHandle(ref, () => {
    const submitvalidate = () => {
      if (type === 'look') {
        return getData();
      } 
      return onSubmit();
    }
    const getValues = () => {
      return getData();
    }
    const reset = async () => {
      archivesRest();
    }
    return {
      submitvalidate,
      getValues,
      reset
    };
  });

  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.archives.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList]);

  useEffect(() => {
    setNewData(data || {});
    if (data) {
      initData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  /**
   * 数据变化更新数据
  */
  const initData = async (data: KktproKeys = {}) => {
    dispatch.archives.clearState();
    // 更新form表单
    if (formRefList.current.length > 0) {
      const list = formRefList?.current.filter((n: any) => n) || [];
      await (list || []).forEach((item: any) => {
        item.setFields?.(data);
      });
    }
    // 更新table
    dispatch({
      type: "archives/updateState",
      payload: {
        educationData: data.educationalExperience || [],
        workData: data.workExperience || [],
        familyData: data.familyMember || []
      },
    });
  }


  const _formData = formData({
    companyList,
    departmentList: [], // 入职部门
    data,
    dictObject,
  });

  /**
   * 监听表单数据
  */
  const onChange = async (_: any, current: any) => {
    const all: any = data || {};
    const params = {
      ...all,
      ...current
    }
    setNewData(params)
  }

  /**
   * 点击新增 教育经历 / 工作经历 / 家庭成员
  */
  const onAdd = ({ type }: formDataVoid) => {
    if (!type) return;
    dispatch({
      type: "archives/updateState",
      payload: addConfig[type],
    });
  }

  /**
   * 提交
  */
  const onSubmit = async () => {
    const validateList = formList.map((itm: any) => itm.validateFieldsAndGetValue())
    await asyncAwaitFormList(validateList);
    if (educationData.length === 0) {
      Notify.warning({
        title: '教育经历至少填写一项',
      });
      return;
    }
    if (workData.length === 0) {
      Notify.warning({
        title: '工作经历至少填写一项',
      });
      return;
    }
    return getData();
  }

  const getData = () => {
    const obj: KktproKeys = newData;
    obj.birth = dateShift(obj.birth);
    obj.entryDate = dateShift(obj.entryDate);
    obj['educationalExperience'] = datesShift(educationData);
    obj['workExperience'] = datesShift(workData);
    obj['familyMember'] = familyData;
    return obj;
  }

  const archivesRest = async () => {
    type === 'edit' && await (formList || []).forEach((item: any) => {
      item.resetForm()
    });
    dispatch.archives.clearState();
  }

  return (
    <PageWraps>
      {_formData.map((item: formDataVoid, index: number) => (
        <React.Fragment key={index}>
          {!item.type ? (
            <Form
              refs={(e: any) => e && (formRefList.current[index] = e)}
              title={item.title}
              formDatas={item.child || []}
              type={type}
              readOnly={type === 'look'}
              onChange={onChange}
            />
          ) : (
            <Card noHover title={item.title} extra={type === 'edit' &&
              <PlusItems onClick={() => onAdd(item)}>
                <PlusIcon type="plus" />
                {item.title}
              </PlusItems>
            }>
              {item.type === 'education' && <Education type={type} />}
              {item.type === 'work' && <Work type={type} />}
              {item.type === 'family' && <Family type={type} />}
            </Card>
          )}
          {index !== _formData.length - 1 && <div style={{ marginBottom: 20 }} />}
        </React.Fragment>
      ))}
      <Modals />
    </PageWraps>
  )
}

export default React.forwardRef(Archives);