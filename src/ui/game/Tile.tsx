import {ReactNode} from 'react';

export enum Color {
  Positive = 1,
  Negative,
}

const COLOR_MAP = {
  [Color.Positive]: '#4d6d92',
  [Color.Negative]: '#ececd7',
};

type Props = {
  children?: ReactNode | null;
  color: Color;
  onClick?: () => void;
};

export default function Tile({children = null, color, onClick}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: COLOR_MAP[color],
        height: 80,
        position: 'relative',
        width: 80,
      }}>
      {children}
    </div>
  );
}
