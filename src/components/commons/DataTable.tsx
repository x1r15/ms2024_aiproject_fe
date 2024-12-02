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
    return (
        <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-800/50">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className={`px-4 py-2 text-left text-xs font-medium text-gray-400 
                                    uppercase tracking-wider bg-gray-900/30 first:pl-6 last:pr-6
                                    ${column.width ? column.width : ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                    {children}
                </tbody>
            </table>
        </div>
    );
} 