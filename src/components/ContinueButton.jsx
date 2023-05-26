import { Button, ModalFooter } from "@chakra-ui/react";
export const ContinueButton = ({ onContinue, title, isLoading }) => (<ModalFooter>
    <Button size="lg" w="21rem" onClick={onContinue} isLoading={isLoading}>
      {title}
    </Button>
  </ModalFooter>);
