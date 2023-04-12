import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import Table from './Table';
import Modal from './Modal';

export type iconListType = {
  label: string;
  value: string;
}

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  const [iconList, setIconList] = useState<iconListType[]>([]);

  useEffect(() => {
    if (iconList.length === 0) {
      const req = (require as any).context('@/icons', true, /.svg$/)
      const imageNames = req.keys().map((imagePath: any) => {
        const icon = imagePath.substring(2, imagePath.lastIndexOf('.'))
        return {
          label: icon,
          value: icon
        };
      });
      setIconList(imageNames)
    }
  }, [iconList])

  useEffect(() => {
    if (userData) {
      dispatch.sysRoute.selectMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  return (
    <Fragment>
      <Table />
      <Modal icons={iconList} />
    </Fragment>
  )
}

export default Page;