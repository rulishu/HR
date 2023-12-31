import { Fragment, useEffect, useState } from 'react';
import { List, Row, Col, Button, Empty, Tag, Tooltip, Alert } from 'uiw';
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import formatter from '@uiw/formatter';
import LinkContent from '../Modal/LinkContent';

const Index = () => {
  const {
    trainingDevelopment: { dataList, isDelete, delId },
    employeeInduction: { companyList = [] },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const [content, setContent] = useState('');
  // const [sort, setSort] = useState<string | undefined>("");
  // const [vis, setVis] = useState(false);

  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        dispatch.employeeInduction.updateState({
          companyList: data,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let comOption = companyList.map((item: any) => {
    return {
      label: item.companyName,
      value: item.id,
    };
  });

  const onDelClosed = () => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: 'none',
        editVisible: false,
        formData: {},
        isDelete: false,
      },
    });
  };
  const onConfirm = () => {
    dispatch({
      type: 'trainingDevelopment/deleteList',
      payload: {
        id: delId,
      },
    });
  };

  const handle = (type: any, itemData: any) => {
    dispatch({
      type: 'trainingDevelopment/update',
      payload: {
        editType: type,
      },
    });
    if (type === 'delete') {
      dispatch({
        type: 'trainingDevelopment/update',
        payload: {
          isDelete: true,
          delId: itemData?.id,
        },
      });
    }
  };

  // const menu = (item: any) => (
  //   <div>
  //     <Menu bordered style={{ minWidth: 120 }}>
  //       <Menu.Item
  //         icon="caret-up"
  //         text="置顶"
  //         active={sort === ""}
  //         onClick={() => {
  //           setSort('caret-up')
  //           dispatch({
  //             type: 'trainingDevelopment/editList',
  //             payload: {
  //               topping: 1,
  //               id: item?.id
  //             }
  //           })
  //         }}
  //       />
  //       <Menu.Item
  //         icon="caret-down"
  //         text="降序"
  //         active={sort === "DESC"}
  //         onClick={() => {
  //           setSort('DESC')
  //           // clickMenus("DESC");
  //           dispatch({
  //             type: 'trainingDevelopment/selectList',
  //             payload: {
  //               topping: 0
  //             }
  //           })
  //         }}
  //       />
  //       <Menu.Item
  //         icon="caret-up"
  //         text="升序"
  //         active={sort === "ASC"}
  //         onClick={() => {
  //           setSort('ASC')
  //           // clickMenus("ASC");
  //           dispatch({
  //             type: 'trainingDevelopment/selectList',
  //             payload: {
  //               topping: 1
  //             }
  //           })
  //         }}
  //       />
  //     </Menu>
  //   </div>
  // );

  const handleUp = (item: any) => {
    dispatch({
      type: 'trainingDevelopment/editList',
      payload: {
        topping: 1,
        id: item?.id,
      },
    });
  };
  return (
    <Fragment>
      {dataList.length > 0 ? (
        <Row>
          <List
            // header={<div>列表头部</div>}
            // footer={}
            noHover
            size="small"
            style={{ width: '100%' }}
            dataSource={dataList}
            renderItem={(item) => {
              let comName = comOption.find((it: any) => it.value === item.companyId);
              let formatCreateTime = formatter('YYYY年MM月DD日 HH:MM', new Date(item.createTime));
              return (
                <List.Item>
                  <Col>
                    {item.topping === 1 && <Tag>置顶</Tag>}
                    <Button
                      basic
                      type="link"
                      onClick={() => {
                        setContent(item?.context);
                        dispatch({
                          type: 'trainingDevelopment/update',
                          payload: {
                            linkVisible: true,
                          },
                        });
                      }}
                    >
                      {item?.title}
                    </Button>
                  </Col>
                  <Col>{comName?.label}</Col>
                  <Col>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {formatCreateTime}
                      <div style={{ paddingLeft: '15%' }}>
                        {/* <Dropdown
                        trigger="hover"
                        menu={menu(item)}
                      // isOpen={vis}
                      // onVisibleChange={(isVisiable) => {
                      //   setVis(isVisiable);
                      // }}
                      > */}
                        <div>
                          <Button
                            icon="delete"
                            size="small"
                            onClick={() => {
                              handle('delete', item);
                            }}
                          />
                          <Tooltip placement="top" content="置顶">
                            <Button
                              size="small"
                              icon="caret-up"
                              onClick={() => {
                                handleUp(item);
                              }}
                            ></Button>
                          </Tooltip>
                        </div>
                        {/* </Dropdown> */}
                      </div>
                    </div>
                  </Col>
                </List.Item>
              );
            }}
          />
        </Row>
      ) : (
        <div style={{ margin: 50, width: '100 %', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Empty />
        </div>
      )}
      <Alert
        isOpen={isDelete}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      />
      <LinkContent content={content} />
    </Fragment>
  );
};
export default Index;
