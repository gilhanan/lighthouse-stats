import { Statistic } from "../models";

export default function Statistics({
  statistics,
}: {
  statistics: Statistic[];
}) {
  return (
    <div className="inline-flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Statistics</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Benchmark</th>
            {statistics[0].audits.map(({ id }) => (
              <th key={id} className="px-4 py-2" colSpan={2}>
                {id.replace("page-load-time-", "") /* Too Specific*/}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statistics.map(({ id, benchmarkIndex, audits }) => (
            <tr key={id}>
              <td className="border px-4 py-2">{benchmarkIndex}</td>
              {audits.map(({ numericValue, score }) => [
                <td key="numericValue" className="border px-4 py-2">
                  {Math.round(numericValue)}
                </td>,
                <td key="score" className="border px-4 py-2">
                  {score}
                </td>,
              ])}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
