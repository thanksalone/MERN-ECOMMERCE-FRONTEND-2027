// import type { ClassAttributes, TdHTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
// import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
// import { usePagination, useSortBy, useTable, type Column, type Row, type TableOptions } from "react-table";
// import type { JSX } from "react/jsx-runtime";




// function TableHOC<T extends Object>(
//   columns: Column<T>[],
//   data: T[],
//   containerClassname: string,
//   heading: string,
//   showPagination: boolean =false

// ){
//   return function HOC(){
//     const options: TableOptions<T>={
//       columns,
//       data,
//       initialState: {
//         pageSize: 6,
//       },
//     };

//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       page,
//       prepareRow,
//       nextPage,
//       pageCount,
//       state: {pageIndex},
//       previousPage,

//     } = useTable(options, useSortBy, usePagination);
    
//     return(
//       <div className={containerClassname}>
//         <h2 className="heading"> {heading}</h2>

//         <table className="table" {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup)=> (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column)=> (
//                   <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                     {column.render("Header")}
//                     {column.isSorted && (
//                       <span>
//                         {""}
//                         {column.isSortedDesc ? (
//                           <AiOutlineSortDescending />
//                         ):(<AiOutlineSortAscending />)}
//                       </span>
//                     )}

//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row: Row<T>) => {
//               prepareRow(row);

//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableDataCellElement> & TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>                                               
//               );
//             })}
//           </tbody>

//         </table>

//                   {showPagination && (
//           <div className="table-pagination">
//             <button disabled={pageIndex === 0} onClick={previousPage}>
//               Prev
//             </button>
//             <span>{`${pageIndex + 1} of ${pageCount}`}</span>
//             <button disabled={pageIndex +1 === pageCount} onClick={nextPage}>
//               Next
//             </button>
//           </div>
//         )}

        
//       </div>
//     );
//   };
// }

// export default TableHOC









//////.....learning...//////
// Remove unused imports
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { usePagination, useSortBy, useTable, type Column, type TableOptions } from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      } as any,
    };

    const tableInstance = useTable(options, useSortBy, usePagination) as any;
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
    } = tableInstance;
    
    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => {
              const headerProps = headerGroup.getHeaderGroupProps();
              const { key: headerKey, ...restHeaderProps } = headerProps;
              
              return (
                <tr key={headerKey} {...restHeaderProps}>
                  {headerGroup.headers.map((column: any) => {
                    const columnProps = column.getHeaderProps(column.getSortByToggleProps());
                    const { key: columnKey, ...restColumnProps } = columnProps;
                    
                    return (
                      <th key={columnKey} {...restColumnProps}>
                        {column.render("Header")}
                        {column.isSorted && (
                          <span>
                            {""}
                            {column.isSortDesc ? (
                              <AiOutlineSortAscending />
                            ) : (
                              <AiOutlineSortDescending />
                            )}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, rowIndex: number) => {
              prepareRow(row);
              
              const rowProps = row.getRowProps();
              const { key: rowKey, ...restRowProps } = rowProps;

              return (
                <tr key={rowKey} {...restRowProps}>
                  {row.cells.map((cell: any, cellIndex: number) => {
                    const cellProps = cell.getCellProps();
                    // Extract key and create safe props without key
                    const { key, ...safeCellProps } = cellProps;
                    
                    return (
                      <td 
                        key={`${rowIndex}-${cellIndex}`} 
                        {...safeCellProps}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button disabled={pageIndex === 0} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={pageIndex + 1 === pageCount} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;