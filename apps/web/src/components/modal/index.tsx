import { Box, Modal, styled } from "@mui/material";
import { ReactNode } from "react";
import { useModal } from "~/contexts/modal.context";
import { ModalCloseButton } from "./close-button.component";

interface IModalBoxProps {
  $width: string;
}

const StyledModalBox = styled(Box)<IModalBoxProps>`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => props.$width};
    background-color: var(--color-primary-50);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    transition: all 1s ease-out;
  }
`;

const StyledInnerModalContainer = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledModaContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;

  & > .form-header {
    text-align: center;
  }
`;

export function ModalWindow({
  name,
  title,
  width,
  children,
}: {
  name: string;
  title: string;
  width: string;
  children: ReactNode;
}) {
  const { handleClose, opened } = useModal();
  const isOpened = opened === name;

  return (
    <>
      <Modal open={isOpened} onClose={handleClose}>
        <StyledModalBox $width={width}>
          <StyledInnerModalContainer>
            <ModalCloseButton onClose={handleClose} />
            <StyledModaContentContainer>
              <h3 className="form-header">{title}</h3>
              {children}
            </StyledModaContentContainer>
          </StyledInnerModalContainer>
        </StyledModalBox>
      </Modal>
    </>
  );
}
