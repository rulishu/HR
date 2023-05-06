import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Card, Tabs, Loader } from 'uiw';
import { FormPage, Archives, ArchivesType } from '@/components';
import Search from './Search';
import Table from './Table';
import Modals from './Modals/information';
import './style/index.css';

const Page = () => {
  const {
    loading,
    employeeInduction: { companyList = [] },
    employeeProfile: { queryInfo, activeKey },
    // global: { userData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const archivesRef = useRef<ArchivesType>(null);

  useEffect(() => {
    dispatch.employeeProfile.updateState({
      activeKey: '1',
    });
    dispatch.employeeProfile.selectStaffFile();
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.employeeInduction.updateState({
            companyList: data,
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 提交
   */
  const onSubmit = async () => {
    // const { userId } = userData as any || {};
    const values: KktproKeys = (await archivesRef.current?.submitvalidate()) || {};
    if (Object.keys(values).length !== 0) {
      dispatch.employeeInduction.submit({
        ...values,
        // userId,
        callback: () => {
          dispatch.employeeProfile.selectStaffFile();
          dispatch.employeeProfile.updateState({
            activeKey: '1',
          });
          if (!values.id) {
            onReset();
          }
        },
      });
    }
  };

  const onReset = async () => {
    archivesRef.current?.reset();
  };

  return (
    <Loader
      loading={loading.effects.employeeProfile.filesDownload}
      tip="加载中..."
      style={{ width: '100%', height: '100%', flex: 1 }}
      bgColor="rgba(255, 255, 255, .7)"
    >
      <Fragment>
        <Tabs
          className="tabsRecordTop"
          type="line"
          activeKey={activeKey}
          onTabClick={(key, tab, e) => {
            dispatch.employeeProfile.updateState({
              activeKey: key,
            });
          }}
        >
          <Tabs.Pane label="人员信息档案记录" key="1">
            <Card noHover style={{ marginBottom: 14 }}>
              <Search />
            </Card>
            <Card noHover>
              <Table />
            </Card>
          </Tabs.Pane>
          {queryInfo?.id ? (
            <Tabs.Pane disabled={activeKey !== '2'} label="人员信息档案" key="2">
              <FormPage
                buttons={[
                  {
                    type: 'primary',
                    label: '提交',
                    onClick: onSubmit,
                  },
                  {
                    label: '重置',
                    hide: queryInfo?.id,
                    onClick: onReset,
                  },
                ]}
              >
                <Archives ref={archivesRef} data={queryInfo} contract={1} />
              </FormPage>
            </Tabs.Pane>
          ) : (
            ''
          )}
        </Tabs>
        <Modals />
      </Fragment>
    </Loader>
  );
};

export default Page;
