import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react";

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const PUBLIC_API_KEY = "ad30f9a246614faaa6a03374f83554c9";

export default async function Page(props: PageProps) {
  const { initializeNodeRuntime } = await import(
    "@builder.io/sdk-react/node/init"
  );
  initializeNodeRuntime();

  //   const urlPath = "/" + (props.params?.slug?.join("/") || "")

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(props.searchParams),
    apiKey: PUBLIC_API_KEY,
    model: "page",
    userAttributes: { urlPath: "/data-symbols" },
  });

  const canShowContent = content || isPreviewing(props.searchParams);

  if (!canShowContent) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at Builder.io.</p>
      </>
    );
  }
  return <Content content={content} apiKey={PUBLIC_API_KEY} model="page" />;
}
