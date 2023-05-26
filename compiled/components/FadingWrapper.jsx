import { Box } from "@chakra-ui/react";
export const FadingWrapper = ({ gridColumn, gridRow }) => (<>
    <Box gridColumn={gridColumn} gridRow={gridRow} borderRadius="1.2rem" border="1px solid" borderColor="border" pointerEvents="none"/>
    <Box gridColumn={gridColumn} gridRow={gridRow} pointerEvents="none" bgGradient="linear(to bottom, backgroundAlpha, background)"/>
  </>);
