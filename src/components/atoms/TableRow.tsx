

interface TableRowProps {
  rowData: (string | number)[];
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
  return (
    <tr className="table-row">
      {rowData.map((data, index) => (
        <td key={index} className="table-data">{data}</td>
      ))}
    </tr>
  );
};

export default TableRow;
