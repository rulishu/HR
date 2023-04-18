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
      ...item,
      label: item.menuName,
      key: item.menuId
    }
    if (item.children && item.children.length > 0) {
      obj.children = getMenus(item.children);
    } else {
      delete obj.children;
    }
    return obj
  })
}

/**
 * tree 数据组合成一维数组
*/
const getAllTreeData = (data: KktproKeys[] = []) => {
  const newRoutes: KktproKeys[] = [];
  (function setRoutes(arr) {
    arr.forEach(item => {
      const { children, ...other } = item;
      if (children && Array.isArray(children)) {
        setRoutes(children);
      }
      if (other.path) {
        newRoutes.push(other)
      }
    })
  })(data);
  return newRoutes;
}


/**
 * 获取树结构id对应的parentId
*/
export const getCheckIds = (data: KktproKeys[] = [], ids: (string | number | undefined)[] = []) => {
  const newIds: (string | number | undefined)[] = [...ids];
  const all = getAllTreeData(data);

  ids.forEach(item => {
    const data = all.find((cur) => cur.key === item);
    if (data && data.parentId !== 0) {
      newIds.push(data.parentId)
    }
  });
  const uniqueArr = [...new Set(newIds)];
  return uniqueArr;
}