import Head from "next/head";

interface Proptypes {
  title?: string;
}

const PageHead = (props: Proptypes) => {
  const { title = "Home" } = props;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href="/images/Logo.png" type="image/x-icon" />
    </Head>
  );
};

export default PageHead;
