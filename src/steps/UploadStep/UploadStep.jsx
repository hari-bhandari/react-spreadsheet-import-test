import { Box, Heading, ModalBody, Text, useStyleConfig } from "@chakra-ui/react";
import { DropZone } from "./components/DropZone";
import { useRsi } from "../../hooks/useRsi";
import { ExampleTable } from "./components/ExampleTable";
import { useCallback, useState } from "react";
import { FadingOverlay } from "./components/FadingOverlay";
export const UploadStep = ({ onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);
    const styles = useStyleConfig("UploadStep");
    const { translations, fields } = useRsi();
    const handleOnContinue = useCallback(async (data, file) => {
        setIsLoading(true);
        await onContinue(data, file);
        setIsLoading(false);
    }, [onContinue]);
    return (<ModalBody>
      <Heading sx={styles.heading}>{translations.uploadStep.title}</Heading>
      <Text sx={styles.title}>{translations.uploadStep.manifestTitle}</Text>
      <Text sx={styles.subtitle}>{translations.uploadStep.manifestDescription}</Text>
      <Box sx={styles.tableWrapper}>
        <ExampleTable fields={fields}/>
        <FadingOverlay />
      </Box>
      <DropZone onContinue={handleOnContinue} isLoading={isLoading}/>
    </ModalBody>);
};
