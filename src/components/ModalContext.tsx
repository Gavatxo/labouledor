"use client";

import { createContext, useContext } from "react";

export const ModalContext = createContext<{ openModal: (concours?: string) => void }>({
  openModal: () => {},
});

export const useModal = () => useContext(ModalContext);
