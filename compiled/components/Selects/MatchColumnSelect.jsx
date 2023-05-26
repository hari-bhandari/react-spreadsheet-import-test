import { Select } from "chakra-react-select";
import { customComponents } from "./MenuPortal";
import { useStyleConfig } from "@chakra-ui/react";
export const MatchColumnSelect = ({ onChange, value, options, placeholder, name }) => {
    const styles = useStyleConfig("MatchColumnsStep");
    return (<Select value={value || null} colorScheme="gray" onChange={onChange} placeholder={placeholder} options={options} chakraStyles={styles.select} menuPosition="fixed" components={customComponents} aria-label={name}/>);
};
