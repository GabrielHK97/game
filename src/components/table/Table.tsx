export interface TableColumns {
  name: string;
  key?: string;
  width?: string;
  element?: any;
}

interface IProps {
  columns: TableColumns[];
  data: any[];
}

function Table({ columns, data }: IProps) {
  return (
    <table
      className="w-full table table-pin-rows"
    >
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th className={`bg-primary p-2 text-neutral ${column.width}`}>
                {column.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => {
          return (
            <tr>
              {columns.map((column) => {
                return <td className="p-2">{column.key ? <>{item[column.key]}</> : column.element}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
