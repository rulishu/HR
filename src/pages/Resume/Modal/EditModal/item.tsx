import { valid } from '@/utils/valid';

interface formDataProps {
  companyList?: any[];
  departmentList?: any[]
  data: any,
  dictObject: any;
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

export const Informnation = ({
  companyList = [],
  departmentList,
  data = {},
  dictObject,
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
          initialValue: ''
        },
        {
          label: "手机号",
          key: "phone",
          widget: "input",
          initialValue: '',
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
          initialValue: '',
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
          option: [],
          rules: [
            { required: true, message: '请选择入职岗位' },
          ],
        },
        {
          label: "社保公积金账号",
          key: "socialInsuranceAccount",
          widget: "input",
          initialValue: '',
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
          option: [],
          initialValue: '',
          rules: [
            { required: true, message: '请选择性别' },
          ],
        },
        {
          label: "出生日期",
          key: "birth",
          widget: "dateInput",
          initialValue: '',
          rules: [
            { required: true, message: '请选择出生日期' },
          ],
        },
        {
          label: "体重",
          key: "weight",
          widget: "input",
          initialValue: ''
        },
        {
          label: "身高",
          key: "height",
          widget: "input",
          initialValue: '',
        },
        {
          label: "民族",
          key: "nationality",
          widget: "input",
          rules: [
            { required: true, message: '请填写民族' },
          ],
        },
        {
          label: "政治面貌",
          key: "politicalStatus",
          widget: "input",
        },
        {
          label: "籍贯",
          key: "nativePlace",
          widget: "input",
          rules: [
            { required: true, message: '请填写籍贯' },
          ],
        },
        {
          label: "婚姻状况",
          key: "isMarried",
          widget: "select",
          option: [],
          rules: [
            { required: true, message: '请选择入婚姻状况' },
          ],
        },
        {
          label: "身份证号",
          key: "idNumber",
          widget: "input",
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
          rules: [
            { required: true, message: '请填写户籍所在地' },
          ],
        },
        {
          label: "现居地址",
          key: "livingPlace",
          widget: "input",
          span: 16,
          rules: [
            { required: true, message: '请填写现居地址' },
          ],
        },
        {
          label: "E-mail",
          key: "email",
          widget: "input",
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
          label: "学历",
          key: "qualification",
          widget: "select",
          option: [],
          rules: [
            { required: true, message: '请选择学历' },
          ],
        },
        {
          label: "学位",
          key: "academicDegree",
          widget: "input",
        },
        {
          label: "专业",
          key: "specialize",
          widget: "input",
          rules: [
            { required: true, message: '请填写专业' },
          ],
        },
        {
          label: "联系人及关系",
          key: "emergencyPhone",
          widget: "input",
          rules: [
            { required: true, message: '请填写紧急联系电话' },
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
  ]
}