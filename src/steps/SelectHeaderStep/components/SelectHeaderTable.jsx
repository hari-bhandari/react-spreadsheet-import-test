import { useMemo } from "react";
import { Table } from "../../../components/Table";
import { generateSelectionColumns } from "./columns";
export const SelectHeaderTable = ({ data, selectedRows, setSelectedRows }) => {
    const columns = useMemo(() => generateSelectionColumns(data), [data]);
    return (<Table rowKeyGetter={(row) => data.indexOf(row)} rows={data} columns={columns} selectedRows={selectedRows} onSelectedRowsChange={(newRows) => {
            // allow selecting only one row
            newRows.forEach((value) => {
                if (!selectedRows.has(value)) {
                    setSelectedRows(new Set([value]));
                    return;
                }
            });
        }} onRowClick={(row) => {
            setSelectedRows(new Set([data.indexOf(row)]));
        }} headerRowHeight={0} className="rdg-static"/>);
};
