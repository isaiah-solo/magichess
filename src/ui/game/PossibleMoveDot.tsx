import styled from 'styled-components';

type Props = {
  onClick?: () => void;
};

const StyledPossibleMoveDotDiv = styled.div`
  background-color: #f5e0b7;
  border: 1px solid #191919;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
`;

export default function PossibleMoveDot({onClick}: Props) {
  return <StyledPossibleMoveDotDiv onClick={onClick} />;
}
