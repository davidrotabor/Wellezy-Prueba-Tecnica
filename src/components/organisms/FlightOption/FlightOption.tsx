
import SegmentHeader from '../../atoms/SegmentHeader/SegmentHeader';
import SegmentRow from '../../atoms/SegmentRow/SegmentRow';


interface FlightOptionProps {
  option: {
    segments: SegmentRowProps["segment"][];
    num: string;
  };
}

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

const FlightOption: React.FC<FlightOptionProps> = ({ option }) => {
  const totalSegments = option.segments.length;
  const totalDuration = option.segments.reduce((acc, segment) => {
    return acc;
  }, 0);

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <tbody className="flight-option">
      <SegmentHeader
        optionNumber={option.num}
        totalSegments={totalSegments}
        totalDuration={formatDuration(totalDuration)}
      />
      {option.segments.map((segment, index) => (
        <SegmentRow key={index} segment={segment} />
      ))}
    </tbody>
  );
};

export default FlightOption;
