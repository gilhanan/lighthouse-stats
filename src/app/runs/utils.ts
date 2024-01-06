import { Category, Row, Run } from "./models";

export function calculateRuns({
  runs,
  category,
}: {
  runs: Run[];
  category: Category;
}) {
  const rows = runs.map(
    ({
      id,
      representative,
      lhr: {
        environment: { benchmarkIndex },
        audits,
        categories,
      },
    }) => {
      const currentCategory = category && categories[category.id];
      return {
        id,
        cells: [
          { label: "Representative", value: representative },
          { label: "Benchmark", value: benchmarkIndex },
          ...(currentCategory
            ? [
                {
                  label: currentCategory.title,
                  value: currentCategory.score,
                },
                ...currentCategory.auditRefs
                  .filter(({ weight }) => weight)
                  .map(({ id }) => {
                    const audit = audits[id];
                    return {
                      label: audit.title.replace(" time is too slow", ""), // TODO: remove this hack
                      value: audit.score,
                    };
                  }),
              ]
            : []),
        ],
      } satisfies Row;
    }
  );

  return rows;
}
