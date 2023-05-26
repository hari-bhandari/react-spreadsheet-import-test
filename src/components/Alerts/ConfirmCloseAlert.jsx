import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, } from "@chakra-ui/react";
import { useRef } from "react";
import { useRsi } from "../../hooks/useRsi";
export const ConfirmCloseAlert = ({ isOpen, onClose, onConfirm }) => {
    const { translations } = useRsi();
    const cancelRef = useRef(null);
    return (<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered id="rsi">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{translations.alerts.confirmClose.headerTitle}</AlertDialogHeader>
          <AlertDialogBody>{translations.alerts.confirmClose.bodyText}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="secondary">
              {translations.alerts.confirmClose.cancelButtonTitle}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              {translations.alerts.confirmClose.exitButtonTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>);
};
