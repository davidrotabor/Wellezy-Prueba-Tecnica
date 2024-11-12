import styles from './TableHeader.module.sass'

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className={styles.tableHeader}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
