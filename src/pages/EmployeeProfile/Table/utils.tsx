import { KktproKeys } from '@kkt/pro';
import { Checkbox, Button } from "uiw";

interface columnsProps {
  companyList?: any,
  dictObject?: any,
  onCheck?: (rowData: KktproKeys, e: KktproKeys) => void;
  onEdit?: (rowData: KktproKeys, e: KktproKeys) => void;
}

export const columns = ({
  companyList,
  dictObject,
  onCheck,
  onEdit
}: columnsProps) => [
    {
      key: "checked",
      render: (text: any, key: any, rowData: any) => {
        return (
          <Checkbox
            checked={rowData.checked}
            onClick={(e) => {
              onCheck?.(rowData, e);
            }}
          />
        );
      },
    },
    {
      title: "姓名",
      key: "name",
    },
    {
      title: "公司",
      key: "company",
      render: (text: any, key: any, rowData: any) => {
        let company = "";
        companyList.map((item: any, index: number) => {
          if (item.id === Number(text)) {
            company = item.companyName;
            return company;
          } else {
            return null;
          }
        });
        return <div>{company}</div>;
      },
    },
    {
      title: "部门",
      key: "department",
      render: (text: any, key: any, rowData: any) => {
        let department = "";
        const data = companyList?.filter((item: any) => item.id === Number(rowData?.company))?.[0]
        data?.department?.map((items: any) => {
          if (items.id === Number(text)) {
            department = items.departmentName;
            return department;
          } else {
            return null;
          }
        })
        return <div>{department}</div>;
      },
    },
    {
      title: "职位",
      key: "post",
      render: (text: any, key: any, rowData: any) => {
        const data = dictObject['post']?.child.filter((item: any) => item.value === text)?.[0]
        return <div>{data?.label}</div>;
      }
    },
    {
      title: "手机号",
      key: "phone",
    },
    {
      title: "邮箱",
      key: "email",
    },
    {
      title: "入职日期",
      key: "entryDate",
    },
    {
      title: "身份证号",
      key: "idNumber",
    },
    {
      title: "出生日期",
      key: "birth",
    },
    {
      title: "性别",
      key: "gender",
      render: (text: any, key: any, rowData: any) => {
        const data = dictObject['sex']?.child.filter((item: any) => item.value === text)?.[0]
        return <div>{data?.label}</div>;
      }
    },
    {
      title: "籍贯",
      key: "nativePlace",
    },
    {
      title: "婚姻状况",
      key: "isMarried",
      render: (text: any, key: any, rowData: any) => {
        const data = dictObject['married']?.child.filter((item: any) => item.value === text)?.[0]
        return <div>{data?.label}</div>;
      }
    },
    {
      title: "现居地",
      key: "livingPlace",
    },
    {
      title: "政治面貌",
      key: "politicalStatus",
    },
    {
      title: "员工状态",
      key: "state",
      render: (text: any, key: any, rowData: any) => {
        return <div>{text === 1 ? '在职' : text === 2 ? '离职' : text === 3 ? '入场' : ''}</div>;
      }
    },
    {
      title: "操作",
      key: "edit",
      width: 80,
      render: (text: any, key: any, rowData: any) => {
        return (
          <Button
            icon="edit"
            type="primary"
            onClick={(e) => {
              onEdit?.(rowData, e);
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ]