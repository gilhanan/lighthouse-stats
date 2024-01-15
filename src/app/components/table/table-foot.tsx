import { Cell, Row } from "./models";
import {
  flattenRows,
  getCellIndexToAverage,
  getCellIndexToDeviation,
  getCellIndexToMedian,
} from "./utils";

function FooterRow({
  header,
  cells,
  cellIndexToValue,
}: {
  header: string;
  cells: Cell[];
  cellIndexToValue: Record<number, unknown>;
}) {
  return (
    <tr>
      <th className="text-start border p-2 bg-gray-50">{header}</th>
      {cells.map((_, cellIndex) => {
        const value = cellIndexToValue[cellIndex];

        return (
          <td key={cellIndex} className="p-2">
            {typeof value === "number" ? value.toFixed(2) : ""}
          </td>
        );
      })}
    </tr>
  );
}

export function TableFoot({ rows }: { rows: Row[] }) {
  const flattenedRows = flattenRows(rows);
  const cells = flattenedRows[0]?.cells || [];
  const cellIndexToMedian = getCellIndexToMedian(flattenedRows);
  const cellIndexToAverage = getCellIndexToAverage(flattenedRows);
  const cellIndexToDeviation = getCellIndexToDeviation(flattenedRows);

  return (
    <tfoot className="border">
      <FooterRow
        header="Median"
        cells={cells}
        cellIndexToValue={Object.fromEntries(
          Object.entries(cellIndexToMedian).map(([key, { value }]) => [
            key,
            value,
          ])
        )}
      />
      <FooterRow
        header="Average"
        cells={cells}
        cellIndexToValue={cellIndexToAverage}
      />
      <FooterRow
        header="Deviation"
        cells={cells}
        cellIndexToValue={cellIndexToDeviation}
      />
    </tfoot>
  );
}
