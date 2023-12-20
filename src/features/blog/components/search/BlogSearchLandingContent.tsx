interface BlogSearchLandingContentProps {
  categoryName: string;
}

export function BlogSearchLandingContent({
  categoryName,
}: BlogSearchLandingContentProps) {
  // eslint-disable-next-line quotes
  const title = categoryName || "Hi 👋🏻, I'm kimchanghoe";

  return (
    <section className="text-center py-16 sm:py-20">
      <h1 className="text-3xl font-bold mt-3 text-primary-900 sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      {!categoryName && (
        <div className="text-secondary-900 py-6 sm:py-8 text-md font-medium sm:text-lg lg:text-xl">
          <p className="my-3">Development, Insights,</p>
          <p>Work approaches and More</p>
        </div>
      )}
    </section>
  );
}
