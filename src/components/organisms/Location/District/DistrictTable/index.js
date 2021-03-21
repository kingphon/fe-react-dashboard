import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";

import { DEFAULT_STATUS, ALL, ACTIVE, HIDDEN } from '../../../../../constants/entities'
import FilterStatus from '../../../../molecules/FilterStatus';
import TableModule from "../../../../molecules/TableModule";
import StatusLabel from '../../../../atoms/StatusLabel';
// REDUX
import { doFilters, getUpdateAction, doDelete } from '../../../../../redux/reducers/location/districtReducer'

const headCells = [
  { id: "name", label: "District Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "province", label: "Province" },
  { id: "status", label: "Status" },
];

const TableRowModule = ({ name, slugName, provinceName, status }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>{provinceName}</TableCell>
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
  districtList,
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
        districtList
        : districtList.filter(item => item.status === filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={districtId => onOpenUpdate(districtId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function DistrictTable() {
  const selector = useSelector(({
    districtReducer: { districtList, filters, searchKeywords, loading }
  }) => ({ districtList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.districtList) {
    selector.districtList = []
  }

  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: districtId => dispatch(getUpdateAction(districtId)),
    onDelete: districtId => dispatch(doDelete(districtId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}