import { useCallback, useMemo, useState } from "react";
import { Box, Button, Heading, ModalBody, Switch, useStyleConfig } from "@chakra-ui/react";
import { ContinueButton } from "../../components/ContinueButton";
import { useRsi } from "../../hooks/useRsi";
import { addErrorsAndRunHooks } from "./utils/dataMutations";
import { generateColumns } from "./components/columns";
import { Table } from "../../components/Table";
import { SubmitDataAlert } from "../../components/Alerts/SubmitDataAlert";
export const ValidationStep = ({ initialData, file }) => {
    const { translations, fields, onClose, onSubmit, rowHook, tableHook } = useRsi();
    const styles = useStyleConfig("ValidationStep");
    const [data, setData] = useState(useMemo(() => addErrorsAndRunHooks(initialData, fields, rowHook, tableHook), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []));
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [filterByErrors, setFilterByErrors] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const updateData = useCallback((rows) => {
        setData(addErrorsAndRunHooks(rows, fields, rowHook, tableHook));
    }, [setData, rowHook, tableHook, fields]);
    const deleteSelectedRows = () => {
        if (selectedRows.size) {
            const newData = data.filter((value) => !selectedRows.has(value.__index));
            updateData(newData);
            setSelectedRows(new Set());
        }
    };
    const updateRow = useCallback((rows, changedData) => {
        const changes = changedData?.indexes.reduce((acc, index) => {
            // when data is filtered val !== actual index in data
            const realIndex = data.findIndex((value) => value.__index === rows[index].__index);
            acc[realIndex] = rows[index];
            return acc;
        }, {});
        const newData = Object.assign([], data, changes);
        updateData(newData);
    }, [data, updateData]);
    const columns = useMemo(() => generateColumns(fields), [fields]);
    const tableData = useMemo(() => {
        if (filterByErrors) {
            return data.filter((value) => {
                if (value?.__errors) {
                    return Object.values(value.__errors)?.filter((err) => err.level === "error").length;
                }
                return false;
            });
        }
        return data;
    }, [data, filterByErrors]);
    const rowKeyGetter = useCallback((row) => row.__index, []);
    const submitData = async () => {
        const calculatedData = data.reduce((acc, value) => {
            const { __index, __errors, ...values } = value;
            if (__errors) {
                for (const key in __errors) {
                    if (__errors[key].level === "error") {
                        acc.invalidData.push(values);
                        return acc;
                    }
                }
            }
            acc.validData.push(values);
            return acc;
        }, { validData: [], invalidData: [], all: data });
        onSubmit(calculatedData, file);
        setShowSubmitAlert(false);
        onClose();
    };
    const onContinue = () => {
        const invalidData = data.find((value) => {
            if (value?.__errors) {
                return !!Object.values(value.__errors)?.filter((err) => err.level === "error").length;
            }
            return false;
        });
        if (!invalidData) {
            submitData();
        }
        else {
            setShowSubmitAlert(true);
        }
    };
    return (<>
      <SubmitDataAlert isOpen={showSubmitAlert} onClose={() => setShowSubmitAlert(false)} onConfirm={submitData}/>
      <ModalBody pb={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="2rem" flexWrap="wrap" gap="8px">
          <Heading sx={styles.heading}>{translations.validationStep.title}</Heading>
          <Box display="flex" gap="16px" alignItems="center" flexWrap="wrap">
            <Button variant="outline" size="sm" onClick={deleteSelectedRows}>
              {translations.validationStep.discardButtonTitle}
            </Button>
            <Switch display="flex" alignItems="center" isChecked={filterByErrors} onChange={() => setFilterByErrors(!filterByErrors)}>
              {translations.validationStep.filterSwitchTitle}
            </Switch>
          </Box>
        </Box>
        <Box h={0} flexGrow={1}>
          <Table rowKeyGetter={rowKeyGetter} rows={tableData} onRowsChange={updateRow} columns={columns} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} components={{
            noRowsFallback: (<Box display="flex" justifyContent="center" gridColumn="1/-1" mt="32px">
                  {filterByErrors
                    ? translations.validationStep.noRowsMessageWhenFiltered
                    : translations.validationStep.noRowsMessage}
                </Box>),
        }}/>
        </Box>
      </ModalBody>
      <ContinueButton onContinue={onContinue} title={translations.validationStep.nextButtonTitle}/>
    </>);
};
