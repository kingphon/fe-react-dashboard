import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";

import { DEFAULT_STATUS, ALL, ACTIVE, HIDDEN } from '../../../../../constants/entities'
import FilterStatus from '../../../../molecules/FilterStatus';
import TableModule from "../../../../molecules/TableModule";
import StatusLabel from '../../../../atoms/StatusLabel';
// REDUX
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/classification/typeGroupReducer'

const headCells = [
  { id: "name", label: "Type Group Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "category", label: "Category" },
  { id: "status", label: "Status" },
];

const TableRowModule = ({ name, slugName, categoryName, status }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>{categoryName}</TableCell>
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
  typeGroupList,
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
    dataSources={
      filters.status === ALL ?
        typeGroupList
        : typeGroupList.filter(item => item.status === filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={typeGroupId => onOpenUpdate(typeGroupId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function TypeGroupTable() {
  const selector = useSelector(({
    typeGroupReducer: { typeGroupList, filters, searchKeywords, loading }
  }) => ({ typeGroupList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.typeGroupList) {
    selector.typeGroupList = []
  }

  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: typeGroupId => dispatch(getUpdateAction(typeGroupId)),
    onDelete: typeGroupId => dispatch(doDelete(typeGroupId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}