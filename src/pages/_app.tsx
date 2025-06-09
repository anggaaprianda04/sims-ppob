import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AppShell from "@/components/commons/AppShell/AppShell";
import RendererModal from "@/components/commons/RendererModal/RendererModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppShell>
            <Component {...pageProps} />
            <RendererModal />
          </AppShell>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
