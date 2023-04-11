import { KktproKeys } from '@kkt/pro';

export const formList = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: "角色名称",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: "角色名",
    key: "desc",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
]

export const getMenus = (data: KktproKeys[] = []) => {
  return data.map((item: KktproKeys) => {
    let obj: KktproKeys  = {
      label: item.menuName,
      key: item.menuId
    }
    if (item.children && item.children.length > 0) {
      obj.children = getMenus(item.children);
    }
    return obj
  })
}