import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";

import { DEFAULT_STATUS, ALL, ACTIVE, HIDDEN, DELETED } from '../../../../../constants/entities'
import FilterStatus from '../../../../molecules/FilterStatus';
import TableModule from "../../../../molecules/TableModule";
import StatusLabel from '../../../../atoms/StatusLabel';
// REDUX
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/provinceReducer'

const headCells = [
  { id: "name", label: "Province Name" },
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
  provinceList,
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
    dataSources={filters.status == ALL ? provinceList :
      provinceList.filter(item => item.status == filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={provinceId => onOpenUpdate(provinceId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function ProvinceTable() {
  const selector = useSelector(({
    provinceReducer: { provinceList, filters, searchKeywords, loading }
  }) => ({ provinceList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.provinceList) {
    selector.provinceList = []
  }
  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: provinceId => dispatch(getUpdateAction(provinceId)),
    onDelete: provinceId => dispatch(doDelete(provinceId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}