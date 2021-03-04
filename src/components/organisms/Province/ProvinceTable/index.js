import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import TableCell from "@material-ui/core/TableCell";
import TableModule from "../../../molecules/TableModule";
// REDUX
import { doFilters, getUpdateAction, doDelete } from '../../../../redux/reducers/provinceReducer'

const headCells = [
  { id: "name", label: "Province Name" },
  { id: "slugName", label: "SlugName" },
];

const TableRowModule = ({ name, slugName }) => (
  <>
    <TableCell style={{ maxWidth: '230px' }}>
      <span>{name}</span>
    </TableCell>
    <TableCell>{slugName}</TableCell>
  </>
)

const Render = ({
  provinceList, loading,
  // onOpenUpdate,
  // onDelete
}) => (
  <TableModule
    loading={loading}
    selectKey="id"
    headCells={headCells}
    dataSources={
      provinceList
    }
    row={TableRowModule}
  // onDelete={onDelete}
  // onOpenUpdate={promotionId => onOpenUpdate(promotionId)}
  >
    {/* <div className="p-4 mb-4 bg-white rounded">
      <FilterStatus
        statusValue={filter}
        listStatus={LIST_STATUS}
        onChangeStatus={onChangeStatus}
      />
    </div> */}
  </TableModule>
)

export default function ProvinceTable() {
  const selector = useSelector(({
    provinceReducer: { provinceList, loading }
  }) => ({ provinceList, loading }), shallowEqual)

  // console.log(selector)

  // useEffect(() => {
  //     console.log(selector.promotionList)
  // }, [selector.promotionList])

  // const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    // onChangeStatus: status => setFilter(status),
    // onOpenUpdate: promotionId => dispatch(getUpdateAction(promotionId)),
    // onDelete: promotionId => dispatch(doDelete(promotionId)),
  }

  return <Render {...renderProps} />
}