import { rootId } from "../Providers";
import { Select } from "chakra-react-select";
import { useStyleConfig } from "@chakra-ui/react";
export const TableSelect = ({ onChange, value, options }) => {
    const styles = useStyleConfig("ValidationStep");
    return (<Select autoFocus size="sm" value={value} onChange={onChange} placeholder=" " closeMenuOnScroll menuPosition="fixed" menuIsOpen menuPortalTarget={document.getElementById(rootId)} options={options} chakraStyles={styles.select}/>);
};
