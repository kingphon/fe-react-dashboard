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
import CategoryTable from '../../../organisms/Classification/Category/CategoryTable'
import CategoryModal from '../../../organisms/Classification/Category/CategoryModal'
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import {
  fetchAll,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/classification/categoryReducer';


const Render = ({
  createButtonLoading,
  onChangeSearchKeywords,
  onOpenCreate
}) => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Danh mục"}
        headerLogo={<CategoryRoundedIcon />}
        onOpenCreate={onOpenCreate}
        createButtonLoading={createButtonLoading}
        onChangeSearchKeywords={onChangeSearchKeywords}
      />
      <ToastContainer />
      <CategoryTable />
      <CategoryModal />
    </div>
  )
}

const Category = () => {
  const selector = useSelector(({
    categoryReducer: {
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
export default Category