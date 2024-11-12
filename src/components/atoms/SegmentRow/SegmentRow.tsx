import styles from './SegmentRow.module.sass'

interface SegmentRowProps {
  segment: {
    productDateTime: {
      dateFormatDeparture: string;
      timeOfDeparture: string;
      dateFormatArrival: string;
      timeOfArrival: string;
    };
    location: { locationName: string }[];
    companyId: { marketingCarrier: string };
    flightOrtrainNumber: string;
    equipment: string;
  };
}

const SegmentRow: React.FC<SegmentRowProps> = ({ segment }) => {
  const {
    productDateTime: { dateFormatDeparture, timeOfDeparture, dateFormatArrival, timeOfArrival },
    location,
    companyId,
    flightOrtrainNumber,
    equipment
  } = segment;

  return (
    <tr className={styles.segmentRow}>
      <td>{dateFormatDeparture}</td>
      <td>{timeOfDeparture}</td>
      <td>{dateFormatArrival}</td>
      <td>{timeOfArrival}</td>
      <td>{location[0].locationName}</td>
      <td>{location[1].locationName}</td>
      <td>{companyId.marketingCarrier}</td>
      <td>{flightOrtrainNumber}</td>
      <td>{equipment}</td>
    </tr>
  );
};

export default SegmentRow;
