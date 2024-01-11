import { Cell, Row } from "./models";

function extractValues({ value }: Cell): unknown[] {
  if (Array.isArray(value)) {
    return value.flatMap((nestedCell) => extractValues(nestedCell));
  }
  return [value];
}

function TableRow(row: Row) {
  const cells = row.cells.flatMap((cell) => {
    const values = extractValues(cell);
    return values.map((value, index) => (
      <td key={`${row.id}-${cell.label}-${index}`}>{value?.toString()}</td>
    ));
  });

  return <tr key={row.id}>{cells}</tr>;
}

export function TableBody({ rows }: { rows: Row[] }) {
  return <tbody>{rows.map(TableRow)}</tbody>;
}
