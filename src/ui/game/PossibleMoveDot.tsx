type Props = {
  onClick?: () => void;
};

export default function PossibleMoveDot({onClick}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#f5e0b7',
        border: '1px solid #191919',
        borderRadius: '50%',
        cursor: 'pointer',
        height: 40,
        width: 40,
      }}
    />
  );
}
