import {
  useCheckAndAssumeWinnerEffect,
  useSelectCurrentTurn,
  useSelectWinner,
} from '../../state/game/gameSlice';
import Team from '../../models/pieces/Team';

const COLOR_MAP = {
  [Team.One]: '#0081a7',
  [Team.Two]: '#f07167',
};

export default function ControlPanel() {
  const currentTurn = useSelectCurrentTurn();
  const winner = useSelectWinner();

  useCheckAndAssumeWinnerEffect();

  return (
    <div
      style={{
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'grid',
        gridGap: 16,
        gridTemplateColumns: '1fr',
        height: 'fit-content',
        padding: 16,
        width: '100%',
      }}>
      <div
        style={{
          backgroundColor: COLOR_MAP[winner ?? currentTurn],
          boxSizing: 'border-box',
          height: 60,
          padding: 16,
          width: '100%',
        }}>
        {winner !== null ? 'Winner!' : 'Current Turn'}
      </div>
    </div>
  );
}
