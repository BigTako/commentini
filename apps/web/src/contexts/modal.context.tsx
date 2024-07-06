import { createContext, useContext, useState } from "react";

const ModalContext = createContext({});

interface IModalContext {
  opened: string;
  handleOpen: (_id: string) => void;
  handleClose: () => void;
}

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState("");

  const handleOpen = (id: string) => {
    setOpened(id);
  };

  const handleClose = () => {
    setOpened("");
  };

  return (
    <ModalContext.Provider
      value={{
        handleOpen,
        handleClose,
        opened,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal(): IModalContext {
  const context = useContext(ModalContext) as IModalContext;
  if (context === undefined)
    throw new Error("ModalContext was used outside the ModalProvider");
  return context;
}

export { ModalProvider, useModal };
