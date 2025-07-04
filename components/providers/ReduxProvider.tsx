"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/redux/store";

type ReduxProviderProps = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
