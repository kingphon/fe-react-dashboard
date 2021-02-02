// import React from "react";
// import { Table, Checkbox } from "semantic-ui-react";

// import "./style.css";

// const CHECKBOX_CELL_WIDTH = 50;
// const ACTION_CELL_WIDTH = 100;

// const SaleTable = ({
//   loading = false,
//   checkAllItem = false,
//   onCheckAllItem,
//   showCheckbox = true,
//   header,
//   children,
//   currentItems,
//   emptyColSpan = 1,
//   emptyMessage = "Table data is empty...",
//   counter
// }) => {
//   return (
//     <Table
//       celled
//       selectable
//       className={loading ? `table-sale-data loading` : `table-sale-data`}
//     >
//       <Table.Header>
//         <Table.Row>
//           {showCheckbox && (
//             <Table.HeaderCell
//               style={{
//                 width: `${CHECKBOX_CELL_WIDTH}px`,
//                 minWidth: `${CHECKBOX_CELL_WIDTH}px`,
//                 maxWidth: `${CHECKBOX_CELL_WIDTH}px`
//               }}
//               textAlign="center"
//             >
//               <Checkbox
//                 checked={checkAllItem}
//                 onChange={(_, checkbox) => onCheckAllItem(checkbox.checked)}
//               />
//             </Table.HeaderCell>
//           )}
//           {header}
//         </Table.Row>
//       </Table.Header>
//       <Table.Body>{children}</Table.Body>
//       <Table.Footer>
//         <Table.Row>
//           {currentItems > 0 ? (
//             <Table.HeaderCell colSpan={emptyColSpan}>
//               Đã chọn {counter} sản phẩm
//             </Table.HeaderCell>
//           ) : (
//             !loading && (
//               <EmptyRow colSpan={emptyColSpan} message={emptyMessage} />
//             )
//           )}
//         </Table.Row>
//       </Table.Footer>
//     </Table>
//   );
// };

// const EmptyRow = ({ colSpan, message }) => (
//   <Table.Cell colSpan={colSpan} textAlign="center">
//     {message}
//   </Table.Cell>
// );

// const TableRow = ({
//   checked = false,
//   children,
//   showCheckbox = false,
//   onCheckItem,
//   onChange,
//   onDelete,
//   ...rest
// }) => (
//   <Table.Row {...rest}>
//     {showCheckbox && (
//       <Table.Cell
//         style={{
//           width: `${CHECKBOX_CELL_WIDTH}px`,
//           minWidth: `${CHECKBOX_CELL_WIDTH}px`,
//           maxWidth: `${CHECKBOX_CELL_WIDTH}px`
//         }}
//         textAlign="center"
//       >
//         <Checkbox
//           checked={checked}
//           onChange={(_, checkbox) => onCheckItem(checkbox.checked)}
//         />
//       </Table.Cell>
//     )}
//     {children}
//   </Table.Row>
// );

// const TableCell = ({ width, style, children, ...rest }) => (
//   <Table.Cell style={{ ...style, width }} {...rest}>
//     {children}
//   </Table.Cell>
// );

// const TableHeaderCell = ({ width, style, children, ...rest }) => (
//   <Table.HeaderCell style={{ ...style, width }} {...rest}>
//     {children}
//   </Table.HeaderCell>
// );

// const calcCellWidth = (cellWidths, showCheckbox = true) => {
//   const windowWidth = document.body.clientWidth;
//   const tableWidth = windowWidth - 104;
//   const perCell = showCheckbox
//     ? tableWidth - CHECKBOX_CELL_WIDTH - ACTION_CELL_WIDTH
//     : tableWidth - ACTION_CELL_WIDTH;
//   return cellWidths.map(item => `${(item / 100) * perCell}px`);
// };

// export { SaleTable, TableRow, TableCell, TableHeaderCell, calcCellWidth };
