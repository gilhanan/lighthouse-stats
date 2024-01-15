import { LhrViewerLink } from "../components/lhr-viewer-link";
import { Row } from "../components/table";
import { Category, Run } from "./models";

export function calculateRuns({
  runs,
  category,
}: {
  runs: Run[];
  category: Category;
}) {
  const rows = runs.map(({ id, representative, lhr }) => {
    const {
      environment: { benchmarkIndex },
      audits,
      categories,
    } = lhr;
    const currentCategory = category && categories[category.id];
    return {
      id,
      className: representative ? "border" : "",
      children: <LhrViewerLink lhr={lhr} />,
      cells: [
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
                        value: Math.round(score * 100),
                      },
                    ],
                  };
                }),
            ]
          : []),
      ],
    } satisfies Row;
  });

  return rows;
}
