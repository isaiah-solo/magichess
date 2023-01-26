import styled, {css} from 'styled-components';
import PieceModel from '../../models/pieces/Piece';
import Team from '../../models/pieces/Team';

const StyledPieceDiv = styled.div`
  border: 1px solid #191919;
  border-radius: 50%;
  cursor: pointer;
  height: 60px;
  width: 60px;

  ${({isHighlighted, team}: {isHighlighted: boolean; team: Team}) => {
    if (isHighlighted) {
      return css`
        background-color: #f5e0b7;
      `;
    }

    switch (team) {
      case Team.One:
        return css`
          background-color: #0081a7;
        `;
      case Team.Two:
        return css`
          background-color: #f07167;
        `;
    }
  }}
`;

const StyledPieceContentDiv = styled.div`
  left: 50%;
  position: relative;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: fit-content;
`;

type Props = {
  isHighlighted?: boolean;
  onClick?: () => void;
  piece: PieceModel;
};

export default function Piece({isHighlighted = false, onClick, piece}: Props) {
  return (
    <StyledPieceDiv
      isHighlighted={isHighlighted}
      onClick={onClick}
      team={piece.getTeam()}>
      <StyledPieceContentDiv>{piece.getName()}</StyledPieceContentDiv>
    </StyledPieceDiv>
  );
}
