import TableCell from "@material-ui/core/TableCell";
import React from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector
} from 'react-redux';

import {
  ACTIVE,
  ALL,
  DEFAULT_STATUS,
  HIDDEN
} from '../../../../../constants/entities';
import StatusLabel from '../../../../atoms/StatusLabel';
import FilterStatus from '../../../../molecules/FilterStatus';
import TableModule from "../../../../molecules/TableModule";

import {
  doDelete,
  doFilters,
  getUpdateAction
} from '../../../../../redux/reducers/classification/typeReducer';

const headCells = [
  { id: "name", label: "Type Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "typeGroup", label: "TypeGroup" },
  { id: "category", label: "Category" },
  { id: "status", label: "Status" },
];

const TableRowModule = ({ name, slugName, typeGroupName, categoryName, status }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>{typeGroupName}</TableCell>
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
  typeList,
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
        typeList
        : typeList.filter(item => item.status === filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={typeId => onOpenUpdate(typeId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function TypeTable() {
  const selector = useSelector(({
    typeReducer: { typeList, filters, searchKeywords, loading }
  }) => ({ typeList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.typeList) {
    selector.typeList = []
  }

  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: typeId => dispatch(getUpdateAction(typeId)),
    onDelete: typeId => dispatch(doDelete(typeId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}