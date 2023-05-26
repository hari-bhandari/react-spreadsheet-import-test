import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ModalCloseButton } from "./ModalCloseButton";
import { useRsi } from "../hooks/useRsi";
export const ModalWrapper = ({ children, isOpen, onClose }) => {
    const { rtl } = useRsi();
    return (<Modal isOpen={isOpen} onClose={onClose} id="rsi" variant="rsi" closeOnEsc={false} closeOnOverlayClick={false} scrollBehavior="inside">
      <div dir={rtl ? "rtl" : "ltr"}>
        <ModalOverlay />
        <ModalCloseButton onClose={onClose}/>
        <ModalContent>{children}</ModalContent>
      </div>
    </Modal>);
};
