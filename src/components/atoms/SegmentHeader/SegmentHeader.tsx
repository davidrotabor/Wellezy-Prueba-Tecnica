import Button from '../Button/Button';
import styles from './SegmentHeader.module.sass'

interface SegmentHeaderProps {
  optionNumber: string;
  totalSegments: number;
  totalDuration: string;
  onClickReserve: () => void
}

const SegmentHeader: React.FC<SegmentHeaderProps> = ({ optionNumber, totalSegments, totalDuration, onClickReserve }) => {
  return (
    <tr className={styles.segmentHeader}>
      <td colSpan={9}>
        <strong>Opción {optionNumber}</strong>: {totalSegments} segmentos
      </td>
      <td><Button onClick={onClickReserve}>Reservar</Button></td>
    </tr>
  );
};

export default SegmentHeader;
