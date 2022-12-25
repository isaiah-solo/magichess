import {ReactNode} from 'react';

type Props = {
  children?: ReactNode | null;
};

export default function TileContent({children = null}: Props) {
  return (
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
  );
}
