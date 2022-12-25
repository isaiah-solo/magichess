import {ReactNode} from 'react';
import Team from '../../models/pieces/Team';

const TEAM_COLOR_MAP = {
  [Team.One]: '#0081a7',
  [Team.Two]: '#f07167',
};

type Props = {
  children?: ReactNode | null;
  onClick?: () => void;
  team: Team;
};

export default function Piece({children = null, onClick, team}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: TEAM_COLOR_MAP[team],
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
        {children}
      </div>
    </div>
  );
}
