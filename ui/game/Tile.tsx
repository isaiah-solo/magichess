import {ReactNode} from 'react';
import styled, {css} from 'styled-components';

export enum Color {
  Positive = 1,
  Negative,
}

const StyledTileDiv = styled.div`
  height: 80px;
  position: relative;
  width: 80px;

  ${({colorType}: {colorType: Color}) => {
    switch (colorType) {
      case Color.Positive:
        return css`
          background-color: #4d6d92;
        `;
      case Color.Negative:
        return css`
          background-color: #ececd7;
        `;
    }
  }}
`;

type Props = {
  children?: ReactNode | null;
  color: Color;
  onClick?: () => void;
};

export default function Tile({children = null, color, onClick}: Props) {
  return (
    <StyledTileDiv colorType={color} onClick={onClick}>
      {children}
    </StyledTileDiv>
  );
}
