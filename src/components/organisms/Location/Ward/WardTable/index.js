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
} from '../../../../../redux/reducers/location/wardReducer';

const headCells = [
  { id: "name", label: "Ward Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "district", label: "District" },
  { id: "province", label: "Province" },
  { id: "status", label: "Status" },
];

const TableRowModule = ({ name, slugName, districtName, provinceName, status }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>{districtName}</TableCell>
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
  wardList,
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
        wardList
        : wardList.filter(item => item.status === filters.status)
    }
    searchKeywords={searchKeywords}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={wardId => onOpenUpdate(wardId)}
  >
    <FilterStatus
      statusValue={filters.status}
      listStatus={LIST_STATUS}
      onChangeStatus={onChangeStatus}
    />
  </TableModule>
)

export default function WardTable() {
  const selector = useSelector(({
    wardReducer: { wardList, filters, searchKeywords, loading }
  }) => ({ wardList, filters, searchKeywords, loading }), shallowEqual)

  if (!selector.wardList) {
    selector.wardList = []
  }

  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: wardId => dispatch(getUpdateAction(wardId)),
    onDelete: wardId => dispatch(doDelete(wardId)),
    onChangeStatus: status => dispatch(doFilters({ ...selector.filters, status })),
  }

  return <Render {...renderProps} />
}