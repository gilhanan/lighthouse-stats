import { Row } from "./models";
import { flattenRows, getCellIndexToMedian } from "./utils";

export function TableBody({ rows }: { rows: Row[] }) {
  const flattenedRows = flattenRows(rows);
  const cellIndexToMediansRowIndex = getCellIndexToMedian(flattenedRows);

  return (
    <tbody>
      {flattenedRows.map(({ id, cells }, rowIndex) => {
        return (
          <tr key={rowIndex}>
            <td></td>
            {cells.map(({ value }, cellIndex) => {
              const isMedian =
                cellIndexToMediansRowIndex[cellIndex]?.rowIndex === rowIndex;
              const className = `p-2 ${isMedian ? "font-bold" : ""}`;

              return (
                <td key={`${id}-${cellIndex}`} className={className}>
                  {value?.toString()}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
