import React from 'react';
import { Form, Input, Select, Row, Col, Button, Card, DateInput, TimePicker } from 'uiw';
function AttendanceSettings() {
  return (
    <div className='formRecord'>
      <Card>
      <Form
        onSubmit={({initial, current}) => {
          console.log('-->>', initial, current);
        }}
        fields={{
          dateStart: {
            initialValue: '',
            labelClassName: 'fieldLabel',
            labelFor: 'date-inline',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '开始考勤日期',
            children: <DateInput datePickerProps={{ todayButton: '今天' }} id="date-inline" />
          },
          dateEnd: {
            initialValue: '',
            labelClassName: 'fieldLabel',
            labelFor: 'date-inline',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '结束考勤日期',
            children: <DateInput datePickerProps={{ todayButton: '今天' }} id="date-inline" />
          },
          timeStart: {
            labelClassName: 'fieldLabel',
            labelFor: 'date-inline',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '最早签退',
            children: <TimePicker />
          },
          timeEnd: {
            labelClassName: 'fieldLabel',
            labelFor: 'date-inline',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '最晚签到',
            children: <TimePicker />
          },
          hoursWorking: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '每天工作工时',
            children: <Input />
          },
          daysWorking: {
            
            labelClassName: 'fieldLabel',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '每周工作天数',
            children: (
              <Select>
                <Select.Option>周一～周五</Select.Option>
                <Select.Option value="1">周一～周六</Select.Option>
                <Select.Option value="2">周一～周日</Select.Option>
                <Select.Option value="3">周日～周四</Select.Option>
                <Select.Option value="4">周日～周五</Select.Option>
              </Select>
            ),
          },
          reviewedName: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '审核人',
            children: <Input />
          },
          IP: {
            initialValue: '',
            labelClassName: 'fieldLabel',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: 'IP列表',
            children: <Input />
          },
          attendanceNo: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 200, textAlign:'right', marginRight: 20},
            inline: true,
            label: '无需考勤者',
            children: (
              <Select> 
                <Select.Option>无</Select.Option>
                <Select.Option value="1">admin</Select.Option>
                <Select.Option value="2">demo</Select.Option>
              </Select>
            ),
          },
        }}
      >
        {({ fields, state, canSubmit }: any) => {
          console.log('fields:', state);
          return (
            <div className='attendanceSettings'>
              <Row><Col>{fields.dateStart}</Col></Row>
              <Row><Col>{fields.dateEnd}</Col></Row>
              <Row><Col>{fields.timeStart}</Col></Row>
              <Row><Col>{fields.timeEnd}</Col></Row>
              <Row><Col>{fields.hoursWorking}</Col></Row>
              <Row><Col>{fields.daysWorking}</Col></Row>
              <Row><Col>{fields.reviewedName}</Col></Row>
              <Row><Col>{fields.IP}</Col></Row>
              <Row><Col>{fields.attendanceNo}</Col></Row>
              <Row>
                <Col fixed style={{ width: 220 }} />
                <Col><Button style={{width: 100}} disabled={!canSubmit()} type="primary" htmlType="submit">提交</Button></Col>
              </Row>
            </div>
          )
        }}
      </Form>
      </Card>
    </div>
  );
}

export default AttendanceSettings