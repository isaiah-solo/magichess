import styled from 'styled-components';

const StyledPossibleMoveDotDiv = styled.div`
  background-color: #f5e0b7;
  border: 1px solid #191919;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
`;

type Props = {
  onClick?: () => void;
};

export default function PossibleMoveDot({onClick}: Props) {
  return <StyledPossibleMoveDotDiv onClick={onClick} />;
}
