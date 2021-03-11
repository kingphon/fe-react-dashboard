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
  provinceList,
  clearSelected,
  loading,
  onOpenUpdate,
  onDelete
}) => (
  <TableModule
    loading={loading}
    selectKey="id"
    headCells={headCells}
    dataSources={
      provinceList
    }
    clearSelected={clearSelected}
    row={TableRowModule}
    onDelete={onDelete}
    onOpenUpdate={provinceId => onOpenUpdate(provinceId)}
  >
  </TableModule>
)

export default function ProvinceTable() {
  const selector = useSelector(({
    provinceReducer: { provinceList, clearSelected, loading }
  }) => ({ provinceList, clearSelected, loading }), shallowEqual)
  // console.log(selector)

  // useEffect(() => {
  //     console.log(selector.provinceList)
  // }, [selector.provinceList])

  const dispatch = useDispatch()

  const renderProps = {
    ...selector,
    onOpenUpdate: provinceId => dispatch(getUpdateAction(provinceId)),
    onDelete: provinceId => dispatch(doDelete(provinceId)),
  }

  return <Render {...renderProps} />
}