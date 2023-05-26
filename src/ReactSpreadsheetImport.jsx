import merge from "lodash/merge";
import { Steps } from "./steps/Steps";
import { rtlThemeSupport, themeOverrides } from "./theme";
import { Providers } from "./components/Providers";
import { ModalWrapper } from "./components/ModalWrapper";
import { translations } from "./translationsRSIProps";
import 'react-data-grid/lib/styles.css';

export const defaultTheme = themeOverrides;
export const defaultRSIProps = {
    autoMapHeaders: true,
    allowInvalidSubmit: true,
    autoMapDistance: 3,
    translations: translations,
    uploadStepHook: async (value) => value,
    selectHeaderStepHook: async (headerValues, data) => ({ headerValues, data }),
    matchColumnsStepHook: async (table) => table,
    dateFormat: "yyyy-mm-dd",
    parseRaw: true,
};
export const ReactSpreadsheetImport = (props) => {
    const mergedTranslations = props.translations !== translations ? merge(translations, props.translations) : translations;
    const mergedThemes = props.rtl
        ? merge(defaultTheme, rtlThemeSupport, props.customTheme)
        : merge(defaultTheme, props.customTheme);
    return (<Providers theme={mergedThemes} rsiValues={{ ...props, translations: mergedTranslations }}>
      <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
        <Steps />
      </ModalWrapper>
    </Providers>);
};
ReactSpreadsheetImport.defaultProps = defaultRSIProps;
