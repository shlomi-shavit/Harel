import React from 'react';
import { useHistory } from 'react-router-dom';
// Style
import classes from './table.module.scss';
// Packages
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from 'react-table';

// Global Filter component
const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    // const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div className={classes.search_field}>
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder='פילטר'
            // placeholder={`${count} תוצאות...`}
            />
        </div>
    )
}

// Change date format
const dateFormat = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
};

// Table component
const Table = ({ columns, data }) => {

    const history = useHistory();

    const editPageLink = id => {
        history.push({
            pathname: '/edit',
            search: '?' + id
        });
    };

    // Table Instances
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter, },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
    )

    return (
        <div className={classes.container}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className={classes.table_wrap} {...getTableProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        if (row.original.date) {
                            row.original.date = dateFormat(row.original.date)
                        }
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={() => editPageLink(row.original.id)}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;