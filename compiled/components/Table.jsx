import DataGrid from "react-data-grid";
import { useRsi } from "../hooks/useRsi";
export const Table = ({ className, ...props }) => {
    const { rtl } = useRsi();
    return <DataGrid className={"rdg-light " + className || ""} direction={rtl ? "rtl" : "ltr"} {...props}/>;
};
