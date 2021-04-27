import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../organisms/Header'
import TypeTable from '../../../organisms/Classification/Type/TypeTable'
import TypeModal from '../../../organisms/Classification/Type/TypeModal'


import {
  fetchAll,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/classification/typeReducer';


const Render = ({
  createButtonLoading,
  onChangeSearchKeywords,
  onOpenCreate
}) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Loại"}
        headerLogo={<CategoryRoundedIcon />}
        onOpenCreate={onOpenCreate}
        createButtonLoading={createButtonLoading}
        onChangeSearchKeywords={onChangeSearchKeywords}
      />
      <ToastContainer />
      <TypeTable />
      <TypeModal />
    </div>
  )
}

const Type = () => {
  const selector = useSelector(({
    typeReducer: {
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
export default Type