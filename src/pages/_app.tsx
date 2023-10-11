// @ts-nocheck
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { theme } from "../../config/themeConfig";
import createEmotionCache from "../../config/emotionCache";
import { AuthProvider } from "../../components/context/authContext";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: any) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <>
            <ReactQueryDevtools initialIsOpen={false} />
            <SnackbarProvider />
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
