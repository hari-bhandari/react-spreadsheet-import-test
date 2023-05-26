import { Box, Text, useStyleConfig } from "@chakra-ui/react";
import { MatchColumnSelect } from "../../../components/Selects/MatchColumnSelect";
import { getFieldOptions } from "../utils/getFieldOptions";
import { useRsi } from "../../../hooks/useRsi";

export const SubMatchingSelect = ({ option, column, onSubChange }) => {
  const styles = useStyleConfig("MatchColumnsStep");
  const { translations, fields } = useRsi();
  const options = getFieldOptions(fields, column.value);
  const value = options.find((opt) => opt.value == option.value);
  return (


    <Box pl={2} pb="0.375rem">
      <Text sx={styles.selectColumn.selectLabel}>{option.entry}</Text>
      <MatchColumnSelect value={value} placeholder={translations.matchColumnsStep.subSelectPlaceholder}
                         onChange={(value) => onSubChange(value?.value, column.index, option.entry)} options={options}
                         name={option.entry} />
    </Box>);
};
