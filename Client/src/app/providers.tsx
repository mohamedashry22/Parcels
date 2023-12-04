"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import ReduxProvider from '../redux/provider';

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </ReduxProvider>
  );
};

export default UiProvider;
