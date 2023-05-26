import { Box, Flex, IconButton, Text, useStyleConfig } from "@chakra-ui/react";
import { CgClose, CgUndo } from "react-icons/cg";
import { ColumnType } from "../MatchColumnsStep";
import { dataAttr } from "@chakra-ui/utils";
export const UserTableColumn = (props) => {
    const styles = useStyleConfig("MatchColumnsStep");
    const { column: { header, index, type }, entries, onIgnore, onRevertIgnore, } = props;
    const isIgnored = type === ColumnType.ignored;
    return (<Box>
      <Flex px={6} justifyContent="space-between" alignItems="center" mb={4}>
        <Text sx={styles.userTable.header} data-ignored={dataAttr(isIgnored)}>
          {header}
        </Text>
        {type === ColumnType.ignored ? (<IconButton aria-label="Ignore column" icon={<CgUndo />} onClick={() => onRevertIgnore(index)} {...styles.userTable.ignoreButton}/>) : (<IconButton aria-label="Ignore column" icon={<CgClose />} onClick={() => onIgnore(index)} {...styles.userTable.ignoreButton}/>)}
      </Flex>
      {entries.map((entry, index) => (<Text key={(entry || "") + index} sx={styles.userTable.cell} data-ignored={dataAttr(isIgnored)}>
          {entry}
        </Text>))}
    </Box>);
};
