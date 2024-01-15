import { Row } from "./models";
import { TableHead } from "./table-head";
import { TableBody } from "./table-body";
import { TableFoot } from "./table-foot";
import { flattenRows } from "./utils";

interface Props {
  title: string;
  rows: Row[];
}

export function Table({ title, rows }: Props) {
  const flattenedRows = flattenRows(rows);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <table className="table-auto">
        <TableHead cells={rows[0].cells} />
        <TableBody rows={flattenedRows} />
        <TableFoot rows={flattenedRows} />
      </table>
    </div>
  );
}
