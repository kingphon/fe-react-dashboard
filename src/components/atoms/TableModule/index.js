// import React from "react";
// import {
//     Table,
//     Checkbox,
//     Icon
// } from "semantic-ui-react";

// import "./style.css";
// import ConfirmPopup from "../../atoms/ConfirmPopup";
// import TablePagination from "../TablePagination";

// const CHECKBOX_CELL_WIDTH = 50;
// const ACTION_CELL_WIDTH = 100;

// const TableModule = ({
//     loading = false,
//     checkAllItem = false,
//     onCheckAllItem,
//     showCheckbox = true,
//     header,
//     children,
//     currentItems,
//     emptyColSpan = 1,
//     emptyMessage = "Table data is empty...",
//     totalPages,
//     defaultActivePage,
//     onChangePage,
// }) => {
//     return (
//         <Table celled selectable className={loading ? `table-data loading` : `table-data`}>
//             <Table.Header>
//                 <Table.Row>
//                     {showCheckbox && (
//                         <Table.HeaderCell
//                             style={{ width: `${CHECKBOX_CELL_WIDTH}px`, minWidth: `${CHECKBOX_CELL_WIDTH}px`, maxWidth: `${CHECKBOX_CELL_WIDTH}px` }}
//                             textAlign="center"
//                         >
//                             <Checkbox
//                                 checked={checkAllItem}
//                                 onChange={(_, checkbox) => onCheckAllItem(checkbox.checked)}
//                             />
//                         </Table.HeaderCell>
//                     )}
//                     {header}
//                     <Table.HeaderCell
//                         style={{ width: `${ACTION_CELL_WIDTH}px`, minWidth: `${ACTION_CELL_WIDTH}px`, maxWidth: `${ACTION_CELL_WIDTH}px` }}
//                         textAlign="center"
//                     >
//                         Actions
//                     </Table.HeaderCell>
//                 </Table.Row>
//             </Table.Header>
//             <Table.Body>{children}</Table.Body>
//             <Table.Footer>
//                 <Table.Row>
//                     {currentItems > 0 ?
//                     <Table.HeaderCell colSpan={emptyColSpan}>
//                         <TablePagination
//                             disabled={loading}
//                             totalPages={totalPages}
//                             defaultActivePage={defaultActivePage}
//                             onPageChange={onChangePage}
//                         />
//                     </Table.HeaderCell>
//                     : (!loading && <EmptyRow colSpan={emptyColSpan} message={emptyMessage} />)
//                     }
//                 </Table.Row>
//             </Table.Footer>
//         </Table>
//     );
// };

// const EmptyRow = ({ colSpan, message }) => (
//     <Table.Cell colSpan={colSpan} textAlign="center">
//         {message}
//     </Table.Cell>
// )

// const TableRow = ({
//     checked = false,
//     children,
//     showCheckbox = false,
//     onCheckItem,
//     onChange,
//     onDelete,
//     ...rest
// }) => (
//     <Table.Row {...rest}>
//         {showCheckbox && (
//         <Table.Cell
//             style={{ width: `${CHECKBOX_CELL_WIDTH}px`, minWidth: `${CHECKBOX_CELL_WIDTH}px`, maxWidth: `${CHECKBOX_CELL_WIDTH}px` }}
//             textAlign="center"
//         >
//             <Checkbox
//                 checked={checked}
//                 onChange={(_, checkbox) => onCheckItem(checkbox.checked)} 
//             />
//         </Table.Cell>
//         )}
//         {children}
//         <Table.Cell style={{ width: `${ACTION_CELL_WIDTH}px`, minWidth: `${ACTION_CELL_WIDTH}px`, maxWidth: `${ACTION_CELL_WIDTH}px` }} textAlign="center">
//             <Icon className="action-icon-button" color="orange" name="edit outline" onClick={onChange} />
//             <ConfirmPopup
//                 className="action-icon-button"
//                 color="red"
//                 name="trash alternate"
//                 onPositive={onDelete}
//             />
//         </Table.Cell>
//     </Table.Row>
// );

// const TableCell = ({ width, style, children, ...rest }) => (
//     <Table.Cell style={{ ...style, width }} {...rest}>
//         {children}
//     </Table.Cell>
// );

// const TableHeaderCell = ({ width, style, children, ...rest }) => (
//     <Table.HeaderCell style={{ ...style, width }} {...rest}>
//         {children}
//     </Table.HeaderCell>
// );

// const calcCellWidth = (cellWidths, showCheckbox = true) => {
//     const windowWidth = document.body.clientWidth;
//     const tableWidth = windowWidth - 104;
//     const perCell = showCheckbox
//         ? tableWidth - CHECKBOX_CELL_WIDTH - ACTION_CELL_WIDTH
//         : tableWidth - ACTION_CELL_WIDTH;
//     return cellWidths.map(item => `${(item / 100) * perCell}px`);
// };


// export { TableModule, TableRow, TableCell, TableHeaderCell, calcCellWidth };
