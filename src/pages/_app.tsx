import type { AppProps } from "next/app";
import "@tamagui/core/reset.css";

import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme,
} from "@tamagui/next-theme";
import { useMemo } from "react";
import Head from "next/head";
import { TamaguiProvider } from "tamagui";

import config from "../../tamagui.config";
import { useServerInsertedHTML } from "next/navigation";

if (process.env.NODE_ENV === "production") {
  require("../public/tamagui.css");
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();

  // memo to avoid re-render on dark/light change
  const contents = useMemo(() => {
    return <Component {...pageProps} />;
  }, [pageProps]);

  useServerInsertedHTML(() => {
    // this first time this runs you'll get the full CSS including all themes
    // after that, it will only return CSS generated since the last call
    return <>{config.getNewCSS()}</>;
  });

  return (
    <>
      <Head>
        <script
          key="tamagui-animations-mount"
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </Head>
      <NextThemeProvider
        onChangeTheme={(name) => setTheme(name as ColorScheme)}
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          {contents}
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  );
}
