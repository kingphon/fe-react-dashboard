import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

import Header from '../../../organisms/Header'
import ProvinceTable from '../../../organisms/Province/ProvinceTable'
import ProvinceModal from '../../../organisms/Province/ProvinceModal'
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import { fetchAll, getCreateAction } from '../../../../redux/reducers/provinceReducer';


const Render = ({ createButtonLoading, onOpenCreate }) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Tỉnh"}
        headerLogo={<BusinessRoundedIcon />}
        onOpenCreate={onOpenCreate}
        createButtonLoading={createButtonLoading}
      />
      <ProvinceTable />
      <ProvinceModal />
    </div>
  )
}

const Province = () => {
  const selector = useSelector(({
    provinceReducer: { createButtonLoading }
  }) => ({ createButtonLoading }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSystemErrors())
    dispatch(fetchAll())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderProps = {
    ...selector,
    onOpenCreate: () => dispatch(getCreateAction())
  }

  return <Render {...renderProps} />
}
export default Province