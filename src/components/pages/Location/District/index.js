import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../organisms/Header'
import DistrictTable from '../../../organisms/Location/District/DistrictTable'
import DistrictModal from '../../../organisms/Location/District/DistrictModal'
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import {
  fetchAll,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/districtReducer';


const Render = ({
  // createButtonLoading,
  onChangeSearchKeywords,
  onOpenCreate
}) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Huyện"}
        headerLogo={<LocationCityRoundedIcon />}
        onOpenCreate={onOpenCreate}
        // // createButtonLoading={createButtonLoading}
        onChangeSearchKeywords={onChangeSearchKeywords}
      />
      <ToastContainer />
      <DistrictTable />
      <DistrictModal />
    </div>
  )
}

const District = () => {
  const selector = useSelector(({
    districtReducer: {
      // createButtonLoading,
    }
  }) => ({
    // createButtonLoading,
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetSystemErrors())
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
export default District