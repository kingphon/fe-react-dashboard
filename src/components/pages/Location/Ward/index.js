import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../organisms/Header'
import WardTable from '../../../organisms/Location/Ward/WardTable'
import WardModal from '../../../organisms/Location/Ward/WardModal'

import {
  fetchAll,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/location/wardReducer';


const Render = ({
  createButtonLoading,
  onChangeSearchKeywords,
  onOpenCreate
}) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Xã"}
        headerLogo={<HouseRoundedIcon />}
        onOpenCreate={onOpenCreate}
        createButtonLoading={createButtonLoading}
        onChangeSearchKeywords={onChangeSearchKeywords}
      />
      <ToastContainer />
      <WardTable />
      <WardModal />
    </div>
  )
}

const Ward = () => {
  const selector = useSelector(({
    wardReducer: {
      createButtonLoading,
    }
  }) => ({
    createButtonLoading,
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAll())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderProps = {
    ...selector,
    onOpenCreate: () => dispatch(getCreateAction()),
    onChangeSearchKeywords: (searchKeywords) => dispatch(setSearchKeywords(searchKeywords)),
  }

  return <Render {...renderProps} />
}
export default Ward