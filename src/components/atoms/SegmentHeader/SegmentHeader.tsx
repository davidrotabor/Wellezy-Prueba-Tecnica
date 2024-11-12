import styles from './SegmentHeader.module.sass'

interface SegmentHeaderProps {
  optionNumber: string;
  totalSegments: number;
  totalDuration: string;
}

const SegmentHeader: React.FC<SegmentHeaderProps> = ({ optionNumber, totalSegments, totalDuration }) => {
  return (
    <tr className={styles.segmentHeader}>
      <td colSpan={9}>
        <strong>Opción {optionNumber}</strong>: {totalSegments} segmentos
      </td>
    </tr>
  );
};

export default SegmentHeader;
