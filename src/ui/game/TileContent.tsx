import {ReactNode} from 'react';
import styled from 'styled-components';

const StyledTileContentDiv = styled.div`
  left: 50%;
  position: relative;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: fit-content;
`;

type Props = {
  children?: ReactNode | null;
};

export default function TileContent({children = null}: Props) {
  return <StyledTileContentDiv>{children}</StyledTileContentDiv>;
}
