import { FlattenRow } from "./models";
import { getCellIndexToMedian } from "./utils";

export function TableBody({ rows }: { rows: FlattenRow[] }) {
  const cellIndexToMediansRowIndex = getCellIndexToMedian(rows);

  return (
    <tbody>
      {rows.map(({ id, className, children, cells }, rowIndex) => {
        return (
          <tr key={rowIndex} className={className}>
            <td>{children}</td>
            {cells.map(({ value }, cellIndex) => {
              const isMedian =
                cellIndexToMediansRowIndex[cellIndex]?.rowIndex === rowIndex;
              const className = `p-2 ${isMedian ? "font-bold" : ""}`;

              return (
                <td key={`${id}-${cellIndex}`} className={className}>
                  {value}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
