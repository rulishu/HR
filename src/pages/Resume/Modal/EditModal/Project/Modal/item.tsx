export const formDatasList = (
  projectObj: any
) => {
  return [
    {
      label: "学历教育",
      key: "academicEducation",
      widget: "textarea",
      initialValue: projectObj?.academicEducation,
      span: "24",
      readSpan: 1,
      widgetProps: {
        rows: 10
      },
    },
    {
      label: "专业技能",
      key: "professionalSkills",
      widget: "textarea",
      initialValue: projectObj?.professionalSkills,
      span: "24",
      readSpan: 1,
      widgetProps: {
        rows: 10
      },
      rules: [
        { message: '请输入专业技能' },
      ],
    },
    {
      label: "自我评价",
      key: "selfEvaluation",
      widget: "textarea",
      initialValue: projectObj?.selfEvaluation,
      span: "24",
      readSpan: 1,
      widgetProps: {
        rows: 10
      },
      rules: [
        { message: '请输入自我评价' },
      ],
    },
  ]
}