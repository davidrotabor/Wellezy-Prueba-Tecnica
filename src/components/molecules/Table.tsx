import TableHeader from '../atoms/TableHeader/TableHeader';
import TableRow from '../atoms/TableRow';

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="table">
      <TableHeader headers={headers} />
      <tbody>
        {rows.map((rowData, index) => (
          <TableRow key={index} rowData={rowData} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
