import { useMemo } from "react";
import { Table } from "../../../components/Table";
import { generateColumns } from "./columns";
import { generateExampleRow } from "../utils/generateExampleRow";
export const ExampleTable = ({ fields }) => {
    const data = useMemo(() => generateExampleRow(fields), [fields]);
    const columns = useMemo(() => generateColumns(fields), [fields]);
    return <Table rows={data} columns={columns} className={"rdg-example"}/>;
};
