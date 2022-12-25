import {ReactNode} from 'react';
import PieceModel from '../../models/pieces/Piece';
import Team from '../../models/pieces/Team';

const TEAM_COLOR_MAP = {
  [Team.One]: '#0081a7',
  [Team.Two]: '#f07167',
};

type Props = {
  isHighlighted?: boolean;
  onClick?: () => void;
  piece: PieceModel;
};

export default function Piece({isHighlighted = false, onClick, piece}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: !isHighlighted
          ? TEAM_COLOR_MAP[piece.getTeam()]
          : '#f5e0b7',
        border: '1px solid #191919',
        borderRadius: '50%',
        cursor: 'pointer',
        height: 60,
        width: 60,
      }}>
      <div
        style={{
          left: '50%',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          width: 'fit-content',
        }}>
        {piece.getName()}
      </div>
    </div>
  );
}
