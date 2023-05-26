import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext } from "react";
export const RsiContext = createContext({});
export const rootId = "chakra-modal-rsi";
export const Providers = ({ children, theme, rsiValues }) => {
    const mergedTheme = extendTheme(theme);
    if (!rsiValues.fields) {
        throw new Error("Fields must be provided to react-spreadsheet-import");
    }
    return (<RsiContext.Provider value={rsiValues}>
      <ChakraProvider>
        {/* cssVarsRoot used to override RSI defaultTheme but not the rest of chakra defaultTheme */}
        <ChakraProvider cssVarsRoot={`#${rootId}`} theme={mergedTheme}>
          {children}
        </ChakraProvider>
      </ChakraProvider>
    </RsiContext.Provider>);
};
