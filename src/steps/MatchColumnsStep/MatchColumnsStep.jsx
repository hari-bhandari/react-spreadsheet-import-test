import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { UserTableColumn } from "./components/UserTableColumn";
import { useRsi } from "../../hooks/useRsi";
import { TemplateColumn } from "./components/TemplateColumn";
import { ColumnGrid } from "./components/ColumnGrid";
import { setColumn } from "./utils/setColumn";
import { setIgnoreColumn } from "./utils/setIgnoreColumn";
import { setSubColumn } from "./utils/setSubColumn";
import { normalizeTableData } from "./utils/normalizeTableData";
import { getMatchedColumns } from "./utils/getMatchedColumns";
import { UnmatchedFieldsAlert } from "../../components/Alerts/UnmatchedFieldsAlert";
import { findUnmatchedRequiredFields } from "./utils/findUnmatchedRequiredFields";
export var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["empty"] = 0] = "empty";
    ColumnType[ColumnType["ignored"] = 1] = "ignored";
    ColumnType[ColumnType["matched"] = 2] = "matched";
    ColumnType[ColumnType["matchedCheckbox"] = 3] = "matchedCheckbox";
    ColumnType[ColumnType["matchedSelect"] = 4] = "matchedSelect";
    ColumnType[ColumnType["matchedSelectOptions"] = 5] = "matchedSelectOptions";
})(ColumnType || (ColumnType = {}));
export const MatchColumnsStep = ({ data, headerValues, onContinue }) => {
    const toast = useToast();
    const dataExample = data.slice(0, 2);
    const { fields, autoMapHeaders, autoMapDistance, translations } = useRsi();
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState(
    // Do not remove spread, it indexes empty array elements, otherwise map() skips over them
    [...headerValues].map((value, index) => ({ type: ColumnType.empty, index, header: value ?? "" })));
    const [showUnmatchedFieldsAlert, setShowUnmatchedFieldsAlert] = useState(false);
    const onChange = useCallback((value, columnIndex) => {
        const field = fields.find((field) => field.key === value);
        const existingFieldIndex = columns.findIndex((column) => "value" in column && column.value === field.key);
        setColumns(columns.map((column, index) => {
            columnIndex === index ? setColumn(column, field, data) : column;
            if (columnIndex === index) {
                return setColumn(column, field, data);
            }
            else if (index === existingFieldIndex) {
                toast({
                    status: "warning",
                    variant: "left-accent",
                    position: "bottom-left",
                    title: translations.matchColumnsStep.duplicateColumnWarningTitle,
                    description: translations.matchColumnsStep.duplicateColumnWarningDescription,
                    isClosable: true,
                });
                return setColumn(column);
            }
            else {
                return column;
            }
        }));
    }, [
        columns,
        data,
        fields,
        toast,
        translations.matchColumnsStep.duplicateColumnWarningDescription,
        translations.matchColumnsStep.duplicateColumnWarningTitle,
    ]);
    const onIgnore = useCallback((columnIndex) => {
        setColumns(columns.map((column, index) => (columnIndex === index ? setIgnoreColumn(column) : column)));
    }, [columns, setColumns]);
    const onRevertIgnore = useCallback((columnIndex) => {
        setColumns(columns.map((column, index) => (columnIndex === index ? setColumn(column) : column)));
    }, [columns, setColumns]);
    const onSubChange = useCallback((value, columnIndex, entry) => {
        setColumns(columns.map((column, index) => columnIndex === index && "matchedOptions" in column ? setSubColumn(column, entry, value) : column));
    }, [columns, setColumns]);
    const unmatchedRequiredFields = useMemo(() => findUnmatchedRequiredFields(fields, columns), [fields, columns]);
    const handleOnContinue = useCallback(async () => {
        if (unmatchedRequiredFields.length > 0) {
            setShowUnmatchedFieldsAlert(true);
        }
        else {
            setIsLoading(true);
            await onContinue(normalizeTableData(columns, data, fields), data, columns);
            setIsLoading(false);
        }
    }, [unmatchedRequiredFields.length, onContinue, columns, data, fields]);
    const handleAlertOnContinue = useCallback(async () => {
        setShowUnmatchedFieldsAlert(false);
        setIsLoading(true);
        await onContinue(normalizeTableData(columns, data, fields), data, columns);
        setIsLoading(false);
    }, [onContinue, columns, data, fields]);
    useEffect(() => {
        if (autoMapHeaders) {
            setColumns(getMatchedColumns(columns, fields, data, autoMapDistance));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
      <UnmatchedFieldsAlert isOpen={showUnmatchedFieldsAlert} onClose={() => setShowUnmatchedFieldsAlert(false)} fields={unmatchedRequiredFields} onConfirm={handleAlertOnContinue}/>
      <ColumnGrid columns={columns} onContinue={handleOnContinue} isLoading={isLoading} userColumn={(column) => (<UserTableColumn column={column} onIgnore={onIgnore} onRevertIgnore={onRevertIgnore} entries={dataExample.map((row) => row[column.index])}/>)} templateColumn={(column) => <TemplateColumn column={column} onChange={onChange} onSubChange={onSubChange}/>}/>
    </>);
};
