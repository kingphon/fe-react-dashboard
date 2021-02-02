// import React from 'react'
// import { Pagination, Icon } from 'semantic-ui-react'
// import style from './styles.module.scss'
// import './style.css'

// const Render = ({ handleOnPageChage, ...rest }) => (
//     <Pagination
//         className={`${style.root}`}
//         prevItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron left" />} />}
//         nextItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron right" />} />}
//         ellipsisItem={<Pagination.Item className={`${style.paginationItem}`} content="..." />}
//         firstItem={null}
//         lastItem={null}
//         pageItem={<Pagination.Item className={`${style.paginationItem}`} />}
//         onPageChange={handleOnPageChage}
//         {...rest}
//     />
// )

// const TablePagination = ({ onPageChange, ...rest }) => {
//     const renderProps = {
//         ...rest,
//         handleOnPageChage: (_, page) => onPageChange(page.activePage)
//     }

//     return <Render {...renderProps} />
// }

// export default TablePagination