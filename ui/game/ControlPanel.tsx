import {
  useCheckAndAssumeWinnerEffect,
  useSelectCurrentTurn,
  useSelectWinner,
} from '../../state/game/gameSlice';
import Team from '../../models/pieces/Team';
import styled from 'styled-components';

const COLOR_MAP = {
  [Team.One]: '#0081a7',
  [Team.Two]: '#f07167',
};

const StyledControlPanelDiv = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  height: fit-content;
  padding: 16px;
  width: 100%;
`;

export default function ControlPanel() {
  const currentTurn = useSelectCurrentTurn();
  const winner = useSelectWinner();

  useCheckAndAssumeWinnerEffect();

  return (
    <StyledControlPanelDiv>
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
    </StyledControlPanelDiv>
  );
}
