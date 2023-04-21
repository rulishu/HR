import TipButton from '@/components/TipButton'

export const columns = () => ([
  {
    title: "学历教育",
    key: "academicEducation ",
  },
  {
    title: "专业技能",
    key: "professionalSkills ",
  },
  {
    title: "自我评价",
    key: "selfEvaluation ",
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: any, rowData: any, rowNumber: number) => {
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
          // onClick={() => onEdit?.(rowData, rowNumber)}
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
          // onClick={() => onRemove?.(rowData, rowNumber)}
          />
        </>
      );
    },
  },
])