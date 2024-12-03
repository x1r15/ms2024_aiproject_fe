import { commonStyles } from '../../styles/commonStyles';

interface Column {
    key: string;
    header: string;
    width?: string;
}

interface DataTableProps {
    columns: Column[];
    children: React.ReactNode;
}

export function DataTable({ columns, children }: DataTableProps) {
    const { dataTable } = commonStyles;

    return (
        <div className={dataTable.wrapper}>
            <table className={dataTable.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className={`${dataTable.th} ${column.width ? column.width : ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={dataTable.tbody}>
                    {children}
                </tbody>
            </table>
        </div>
    );
} 