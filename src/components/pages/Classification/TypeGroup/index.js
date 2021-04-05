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
import TypeGroupTable from '../../../organisms/Classification/TypeGroup/TypeGroupTable'
import TypeGroupModal from '../../../organisms/Classification/TypeGroup/TypeGroupModal'
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import {
  fetchAll,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/classification/typeGroupReducer';


const Render = ({
  createButtonLoading,
  onChangeSearchKeywords,
  onOpenCreate
}) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Nhóm Loại"}
        headerLogo={<CategoryRoundedIcon />}
        onOpenCreate={onOpenCreate}
        createButtonLoading={createButtonLoading}
        onChangeSearchKeywords={onChangeSearchKeywords}
      />
      <ToastContainer />
      <TypeGroupTable />
      <TypeGroupModal />
    </div>
  )
}

const TypeGroup = () => {
  const selector = useSelector(({
    typeGroupReducer: {
      createButtonLoading,
    }
  }) => ({
    createButtonLoading,
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
export default TypeGroup