import { KktproKeys } from '@kkt/pro';
import { valid } from '@/utils/valid';
import dayjs from 'dayjs';

interface formDataProps {
  companyList?: any[];
  departmentList?: any[]
  data: any,
  dictObject: any;
  handleChange?: (value: any, e: any) => void;
}
export interface formDataVoid {
  title: string;
  tips?: string;
  /**
   * @education 教育经历
   * @work 工作经历
   * @family 家庭成员
  */
  type?: 'education' | 'work' | 'family';
  child?: any[];
}



export const formData = ({
  companyList = [],
  departmentList,
  data = {},
  dictObject,
  handleChange,
}: formDataProps): formDataVoid[] => {
  return [
    {
      title: '入职信息',
      child: [
        {
          label: "姓名",
          key: "name",
          widget: "input",
          rules: [
            { required: true, message: '请填写姓名' },
          ],
          initialValue: data?.name
        },
        {
          label: "手机号",
          key: "phone",
          widget: "input",
          initialValue: data?.phone,
          rules: [
            { required: true, message: '请填写手机号' },
            {
              validator: (value: any) => {
                if (value) {
                  return valid.isValidPhoneNumber(value);
                }
                return true;
              },
              message: '请填写正确的手机号'
            }
          ],
        },
        {
          label: "入职日期",
          key: "entryDate",
          widget: "dateInput",
          initialValue: data?.entryDate,
          widgetProps: {
            format: 'YYYY-MM-DD'
          },
          rules: [
            { required: true, message: '请选择入职日期' },
          ],
        },
        // {
        //   label: "入职公司",
        //   key: "company",
        //   widget: "select",
        //   option: companyList.map(item => ({ label: item.companyName, value: item.id })),
        //   rules: [
        //     { required: true, message: '请选择入职公司' },
        //   ]
        // },
        // {
        //   label: "入职部门",
        //   key: "department",
        //   widget: "select",
        //   option: departmentList,
        //   rules: [
        //     { required: true, message: '请选择入职部门' },
        //   ],
        // },
        {
          label: "入职岗位",
          key: "post",
          widget: "select",
          option: dictObject['post']?.child || [],
          initialValue: data?.post,
          rules: [
            { required: true, message: '请选择入职岗位' },
          ],
        },
        {
          label: "社保公积金账号",
          key: "socialInsuranceAccount",
          widget: "input",
          initialValue: data?.socialInsuranceAccount,
        },
      ]
    },
    {
      title: '基本信息',
      child: [
        {
          label: "性别",
          key: "gender",
          widget: "radio",
          option: dictObject['sex']?.child || [],
          initialValue: data?.gender,
          rules: [
            { required: true, message: '请选择性别' },
          ],
        },
        {
          label: "出生日期",
          key: "birth",
          widget: "dateInput",
          initialValue: data?.birth,
          rules: [
            { required: true, message: '请选择出生日期' },
          ],
        },
        {
          label: "体重",
          key: "weight",
          widget: "input",
          initialValue: data?.weight,
        },
        {
          label: "身高",
          key: "height",
          widget: "input",
          initialValue: data?.height,
        },
        {
          label: "民族",
          key: "nationality",
          widget: "input",
          initialValue: data?.nationality,
          rules: [
            { required: true, message: '请填写民族' },
          ],
        },
        {
          label: "政治面貌",
          key: "politicalStatus",
          widget: "input",
          initialValue: data?.politicalStatus,
        },
        {
          label: "籍贯",
          key: "nativePlace",
          widget: "input",
          initialValue: data?.nativePlace,
          rules: [
            { required: true, message: '请填写籍贯' },
          ],
        },
        {
          label: "婚姻状况",
          key: "isMarried",
          widget: "select",
          option: dictObject['married']?.child || [],
          initialValue: data?.isMarried,
          rules: [
            { required: true, message: '请选择入婚姻状况' },
          ],
        },
        {
          label: "身份证号",
          key: "idNumber",
          widget: "input",
          initialValue: data?.idNumber,
          rules: [
            { required: true, message: '请填写身份证号' },
            // { 
            //   validator: (value: string) => {
            //     if (value) {
            //       return valid.isValidId(value);
            //     }
            //     return true;
            //   },
            //   message: '请填写正确的身份证号'
            // }
          ],
        },
        {
          label: "户籍所在地",
          key: "hukou",
          widget: "input",
          span: 8,
          initialValue: data?.hukou,
          rules: [
            { required: true, message: '请填写户籍所在地' },
          ],
        },
        {
          label: "现居地址",
          key: "livingPlace",
          widget: "input",
          span: 16,
          initialValue: data?.livingPlace,
          rules: [
            { required: true, message: '请填写现居地址' },
          ],
          readSpan: 2
        },
        {
          label: "E-mail",
          key: "email",
          widget: "input",
          initialValue: data?.email,
          rules: [
            { required: true, message: '请填写邮箱' },
            {
              validator: (value: any) => {
                if (value) {
                  return valid.isValidEmail(value);
                }
                return true;
              },
              message: '请填写正确的邮箱'
            }
          ],
        },
        {
          label: "毕业学校",
          key: "graduateSchool",
          widget: "input",
          initialValue: data?.graduateSchool,
          rules: [
            { required: true, message: '请填写毕业学校' },
          ],
        },
        {
          label: "学历",
          key: "qualification",
          widget: "select",
          option: dictObject['education']?.child || [],
          initialValue: data?.qualification,
          rules: [
            { required: true, message: '请选择学历' },
          ],
        },
        {
          label: "专业",
          key: "specialize",
          widget: "input",
          initialValue: data?.specialize,
          rules: [
            { required: true, message: '请填写专业' },
          ],
        },
        {
          label: "学位",
          key: "academicDegree",
          widget: "input",
          initialValue: data?.academicDegree,
        },
        {
          label: "紧急联系人/手机号/关系",
          key: "emergencyPhone",
          widget: "input",
          initialValue: data?.emergencyPhone,
          rules: [
            { required: true, message: '请填写紧急联系人/手机号/关系' },
          ],
        },
      ]
    },
    {
      title: '教育经历',
      type: 'education',
    },
    {
      title: '工作经历',
      type: 'work',
    },
    {
      title: '家庭成员',
      type: 'family',
    },
    {
      title: '个人材料',
      child: [
        {
          label: '身份证国徽面',
          key: 'idCardImgFrontUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: (e: any) => handleChange && handleChange('idCardImgFrontUUID', e),
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
        {
          label: '身份证人像面',
          key: 'idCardImgBackUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: handleChange,
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
        {
          label: '学历证书',
          key: 'diplomaImgUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: handleChange,
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
        {
          label: '学位证书',
          key: 'degreeCertificateImgUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: handleChange,
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
        {
          label: '前公司离职证明',
          key: 'departImgUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: handleChange,
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
        {
          label: '员工照片',
          key: 'staffPhotoImgUUID',
          widget: 'upload',
          readSpan: 3,
          widgetProps: {
            onChange: handleChange,
            uploadType: 'card',
            maxNumber: 1,
            showFileIcon: {
              showPreviewIcon: true,
              showRemoveIcon: true,
            },
          },
        },
      ]
    },
  ]
}

/**
 * 点击新增 ** 更改 models数据 
*/
export const addConfig: KktproKeys = {
  education: {
    educationType: 'add',
    educationObj: undefined,
    educationIndex: undefined,
    isEducationVisible: true,
  },
  work: {
    workType: 'add',
    workIndex: undefined,
    workObj: undefined,
    isWorkVisible: true,
  },
  family: {
    familyType: 'add',
    familyIndex: undefined,
    familyObj: undefined,
    isFamilyVisible: true,
  }
}

/**
 * 日期转换
*/
export const datesShift = (data: KktproKeys[] = []) => {
  return data.map(item => ({
    ...item,
    startTime: item.startTime && dayjs(item.startTime).format('YYYY-MM-DD'),
    endTime: item.endTime && dayjs(item.endTime).format('YYYY-MM-DD'),
  }))
}

export const dateShift = (date: Date) => {
  if (!date) return;
  return dayjs(date).format('YYYY-MM-DD')
}