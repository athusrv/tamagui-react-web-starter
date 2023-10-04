import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Tamagui from "../../tamagui.config";

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const page = await renderPage();

    return {
      ...page,
      styles: (
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: Tamagui.getCSS({
                // if you are using "outputCSS" option, you should use this "exclude"
                // if not, then you can leave the option out
                exclude:
                  process.env.NODE_ENV === "production"
                    ? "design-system"
                    : null,
              }),
            }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
