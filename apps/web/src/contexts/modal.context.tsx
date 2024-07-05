import { createContext, useContext, useState } from "react";

const ModalContext = createContext({});

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

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside the ModalProvider");
  return context;
}

export { ModalProvider, useModal };
