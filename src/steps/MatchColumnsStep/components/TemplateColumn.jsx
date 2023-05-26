import { Flex, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, useStyleConfig, } from "@chakra-ui/react";
import { useRsi } from "../../../hooks/useRsi";
import { ColumnType } from "../MatchColumnsStep";
import { MatchIcon } from "./MatchIcon";
import { MatchColumnSelect } from "../../../components/Selects/MatchColumnSelect";
import { SubMatchingSelect } from "./SubMatchingSelect";
const getAccordionTitle = (fields, column, translations) => {
    const fieldLabel = fields.find((field) => "value" in column && field.key === column.value).label;
    return `${translations.matchColumnsStep.matchDropdownTitle} ${fieldLabel} (${"matchedOptions" in column && column.matchedOptions.length} ${translations.matchColumnsStep.unmatched})`;
};
export const TemplateColumn = ({ column, onChange, onSubChange }) => {
    const { translations, fields } = useRsi();
    const styles = useStyleConfig("MatchColumnsStep");
    const isIgnored = column.type === ColumnType.ignored;
    const isChecked = column.type === ColumnType.matched ||
        column.type === ColumnType.matchedCheckbox ||
        column.type === ColumnType.matchedSelectOptions;
    const isSelect = "matchedOptions" in column;
    const selectOptions = fields.map(({ label, key }) => ({ value: key, label }));
    const selectValue = selectOptions.find(({ value }) => "value" in column && column.value === value);
    return (<Flex minH={10} w="100%" flexDir="column" justifyContent="center">
      {isIgnored ? (<Text sx={styles.selectColumn.text}>{translations.matchColumnsStep.ignoredColumnText}</Text>) : (<>
          <Flex alignItems="center" minH={10} w="100%">
            <Box flex={1}>
              <MatchColumnSelect placeholder={translations.matchColumnsStep.selectPlaceholder} value={selectValue} onChange={(value) => onChange(value?.value, column.index)} options={selectOptions} name={column.header}/>
            </Box>
            <MatchIcon isChecked={isChecked}/>
          </Flex>
          {isSelect && (<Flex width="100%">
              <Accordion allowMultiple width="100%">
                <AccordionItem border="none" py={1}>
                  <AccordionButton _hover={{ bg: "transparent" }} _focus={{ boxShadow: "none" }} px={0} py={4} data-testid="accordion-button">
                    <AccordionIcon />
                    <Box textAlign="left">
                      <Text sx={styles.selectColumn.accordionLabel}>
                        {getAccordionTitle(fields, column, translations)}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={4} pr={3} display="flex" flexDir="column">
                    {column.matchedOptions.map((option) => (<SubMatchingSelect option={option} column={column} onSubChange={onSubChange} key={option.entry}/>))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>)}
        </>)}
    </Flex>);
};
