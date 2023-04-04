
import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProForm,useForm } from '@uiw-admin/components'
import { Button,Card } from 'uiw'
import { addItems } from './utils';
import { UseFormProps } from "@uiw-admin/components/lib/ProForm/type";
import { LegacyRef } from "react";

function EducationalInformation(props: { formRefList: { current: (Partial<LegacyRef<UseFormProps>> | undefined)[]; }; }) {
  const {
    employeeProfile: {
      groupItem,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();

  //新增与删除
  const handleAddFormItems = (type: any, idx: number) => {
    if (type === "add") {
      groupItem.push(addItems);
    }
    if (type === "delete") {
      groupItem.splice(idx, 1);
      // formList[idx].setFields([]);
    }
    dispatch({
      type: "employeeProfile/updateState",
      payload: { groupItem: [...groupItem] },
    });
  };
 
  return (
    <div>
     {groupItem.map((item: any, idx: number) => {
         return (
          <Card 
           title={`表单${idx + 1}`} 
           key={idx} 
           style={{ marginBottom:10 }} 
           extra={<span onClick={() => handleAddFormItems("delete", idx)}>
           删除
         </span>}
           >
            <ProForm
             ref={(e) =>(props.formRefList.current[idx] = e)}
             // 表单类型
             formType="pure"
             form={form}
             cardProps={{
               noHover: true,
             }}
             // 更新表单的值
             buttonsContainer={{ justifyContent: 'flex-start' }}
             formDatas={item()}
           />
         </Card>
         )
       })}
      <Button 
       style={{ marginTop:10,width:80 }}  
       type="primary"  
       onClick={() => handleAddFormItems("add", 1)}
       >
        新增
       </Button>
   </div>
 );
}

export default EducationalInformation;
