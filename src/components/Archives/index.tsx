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
import { hometown } from '@/utils'

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
  /** 是否显示当前模块信息 */
  contract?: number
}

const Archives = (
  props: ArchivesProps,
  ref: React.ForwardedRef<ArchivesType | undefined | null>
) => {
  const {
    type = 'edit',
    data,
    contract
  } = props;

  const [newData, setNewData] = useState<KktproKeys>({});

  const dispatch = useDispatch<Dispatch>();
  const {
    archives: {
      companyList = [],
      educationData = [],
      workData = [],
      familyData = [],
      idCardImgFrontUUID,
      idCardImgBackUUID,
      diplomaImgUUID,
      degreeCertificateImgUUID,
      departImgUUID,
      staffPhotoImgUUID
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
    dispatch.archives.clearState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    const newData = data || {};
    setNewData(newData);
    if (data) {
      initData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  /**
   * 数据变化更新数据
  */
  const initData = async (data: KktproKeys = {}) => {
    // const newData = {
    //   ...data,
    //   // idCardImgFrontUUID:[ { dataURL: 'https://avatars2.githubusercontent.com/u/1680273?s=40&v=4', name: 'uiw.png' }]
    //   // idCardImgFrontUUID: data.idCardImgFrontUUID || []
    // }
    const newData = { ...data};
    newData.idCardImgFrontUUIDs = data.idCardImgFrontUUIDs || [];
    newData.idCardImgBackUUIDs = data.idCardImgBackUUIDs || [];
    newData.diplomaImgUUIDs = data.diplomaImgUUIDs || [];
    newData.degreeCertificateImgUUIDs = data.degreeCertificateImgUUIDs || [];
    newData.departImgUUIDs = data.departImgUUIDs || [];
    newData.staffPhotoImgUUIDs = data.staffPhotoImgUUIDs || [];
    dispatch.archives.clearState();
    // 更新form表单
    if (formRefList.current.length > 0) {
      const list = formRefList?.current.filter((n: any) => n) || [];
      await (list || []).forEach((item: any) => {
        item.setFields?.(newData);
      });
    }
    // 更新table
    dispatch({
      type: "archives/updateState",
      payload: {
        educationData: newData.educationalExperience || [],
        workData: newData.workExperience || [],
        familyData: newData.familyMember || [],
        idCardImgFrontUUID: newData.idCardImgFrontUUID,
        idCardImgBackUUID: newData.idCardImgBackUUID,
        diplomaImgUUID: newData.diplomaImgUUID,
        degreeCertificateImgUUID: newData.degreeCertificateImgUUID,
        departImgUUID: newData.departImgUUID,
        staffPhotoImgUUID: newData.staffPhotoImgUUID,
      },
    });
  }
  // 上传
  const handleChange = (type: string, value = []) => {
    if (value.length > 0) {
      dispatch.global.uploadFile({
        params: value[0],
        callback: (data: any) => {
          dispatch({
            type: "archives/updateState",
            payload: {[type]: data?.uuid},
          });
        }
      })
    }
  }

  // 通过身份证号获取出生日期、年龄、性别 、籍贯
  const handleIdcardBlur = async(value = '') => {
    // 直接newData身份证校验失败会导致：教育经历/工作经验/家庭成员 信息清空
    const newData = getData();
    let MyBirthday = value.substring(6, 10) + '/' + value.substring(10, 12) + '/' + value.substring(12, 14)
    let MySex = parseInt(value.substr(16, 1)) % 2 === 1 ? '1' : '2'
    let MyHometown = (hometown as any)[parseInt(value.substring(0, 2))]
    if (formRefList.current.length > 0) {
      initData({
        ...newData,
        birth: new Date(MyBirthday),
        gender: MySex,
        nativePlace: MyHometown,
      })
    }
  }

  const _formData = formData({
    companyList,
    departmentList: [], // 入职部门
    data,
    dictObject,
    handleChange,
    handleIdcardBlur
  });

  /**
   * 监听表单数据
  */
  const onChange = async (_: any, current: any) => {
    const all: any = newData || {};
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
    obj.idCardImgFrontUUID = idCardImgFrontUUID
    obj.idCardImgBackUUID = idCardImgBackUUID
    obj.diplomaImgUUID = diplomaImgUUID
    obj.degreeCertificateImgUUID = degreeCertificateImgUUID 
    obj.departImgUUID = departImgUUID
    obj.staffPhotoImgUUID = staffPhotoImgUUID;
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
      {_formData.filter((itm) => contract ? itm : itm.title !== '合同信息').map((item: formDataVoid, index: number) => (
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