import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";

import { DEFAULT_STATUS, ALL, ACTIVE, HIDDEN } from '../../../../../constants/entities'
import FilterStatus from '../../../../molecules/FilterStatus';
import TableModule from "../../../../molecules/TableModule";
import StatusLabel from '../../../../atoms/StatusLabel';
// REDUX
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/classification/categoryReducer'

const headCells = [
  { id: "name", label: "Category Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "status", label: "Status" },
];

const TableRowModule = ({ name, slugName, status }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>
      <StatusLabel {...DEFAULT_STATUS[status]} />
    </TableCell>
  </>
)

const LIST_STATUS = [
  { key: ALL, label: "All" },
  { key: ACTIVE, label: "Active" },
  { key: HIDDEN, label: "Hidden" },
]
const Render = ({
  categoryList,
  filters,
  loading,
  searchKeywords,
  onOpenUpdate,
  onChangeStatus,
  onDelete
}) => (
  <TableModule
    loading={loading}
    selectKey="id"
    headCells={headCells}
    dataSources={filters.status === ALL ? categoryList :
      categoryList.filter(item => item.status === filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={categoryId => onOpenUpdate(categoryId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function CategoryTable() {
  const selector = useSelector(({
    categoryReducer: { categoryList, filters, searchKeywords, loading }
  }) => ({ categoryList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.categoryList) {
    selector.categoryList = []
  }
  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: categoryId => dispatch(getUpdateAction(categoryId)),
    onDelete: categoryId => dispatch(doDelete(categoryId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}