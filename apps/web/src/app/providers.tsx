"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "~/contexts/modal.context";
import { SocketProvider } from "~/contexts/socket.context";
import { PostQueryProvider } from "~/contexts/post-query.context";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ReactQueryStreamedHydration>
          <SocketProvider>
            <PostQueryProvider>
              <ModalProvider>{children}</ModalProvider>
            </PostQueryProvider>
          </SocketProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3 * 1000,
              },
              error: {
                duration: 5 * 1000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-primary-50",
                color: "var(--color-primary-800)",
              },
            }}
          />
        </ReactQueryStreamedHydration>
      </ThemeProvider>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
