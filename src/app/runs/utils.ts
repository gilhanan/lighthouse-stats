import { Row } from "../components/table";
import { Category, Run } from "./models";

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
          // { label: "Representative", value: representative },
          { label: "Benchmark", value: Math.round(benchmarkIndex) },
          ...(currentCategory
            ? [
                {
                  label: currentCategory.title,
                  value: Math.round(currentCategory.score * 100),
                },
                ...currentCategory.auditRefs
                  .filter(({ weight }) => weight)
                  .map(({ id }) => {
                    const { title, numericValue, score } = audits[id];

                    return {
                      label: title.replace(" time is too slow", ""), // TODO: remove this hack
                      value: [
                        {
                          label: "Duration",
                          value: Math.round(numericValue),
                        },
                        {
                          label: "Score",
                          value: score * 100,
                        },
                      ],
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
