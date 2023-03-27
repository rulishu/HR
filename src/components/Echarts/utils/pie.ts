import { EchartsData } from '../index'

export const pieLeftConfig = (data: EchartsData[]) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'middle',
      right: 20,
      orient: 'vertical',
      itemWidth: 16,
      itemHeight: 16,
    },
    series: [
      {
        name: '人员统计',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          formatter: '{b} {num|{c}} 人',
          rich: {
            num: {
              fontSize: 16,
              color: '#000'
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 40,
          maxSurfaceAngle: 80
        },
        data
      }
    ]
  }
}