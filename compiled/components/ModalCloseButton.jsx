import { IconButton } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { ConfirmCloseAlert } from "./Alerts/ConfirmCloseAlert";
import { useState } from "react";
export const ModalCloseButton = ({ onClose }) => {
    const [showModal, setShowModal] = useState(false);
    return (<>
      <ConfirmCloseAlert isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={() => {
            setShowModal(false);
            onClose();
        }}/>
      <IconButton variant="unstyled" aria-label="Close modal" icon={<CgClose />} color="white" position="absolute" transform="translate(50%, -50%)" right="14px" top="20px" onClick={() => setShowModal(true)} zIndex="toast" dir="ltr"/>
    </>);
};
