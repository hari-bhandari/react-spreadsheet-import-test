import { chakra, useStyleConfig, Flex } from "@chakra-ui/react";
import { dataAttr } from "@chakra-ui/utils";
import { CgCheck } from "react-icons/cg";
export const MatchIcon = (props) => {
    const style = useStyleConfig("MatchIcon", props);
    return (<chakra.div __css={style} minW={6} minH={6} w={6} h={6} ml="0.875rem" mr={3} data-highlighted={dataAttr(props.isChecked)} data-testid="column-checkmark">
      {props.isChecked && (<Flex style={{
                opacity: props.isChecked ? 1 : 0,
                transform: props.isChecked ? 'scale(1)' : 'scale(0.5)',
                transition: 'all 0.1s',
            }}>
          <CgCheck size="1.5rem"/>
        </Flex>)}
    </chakra.div>);
};
