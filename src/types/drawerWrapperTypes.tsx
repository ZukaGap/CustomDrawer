import {ReactNode} from 'react';

export type DrawerWrapperProps = {
  children: ReactNode;
};

export type DrawerWrapperRefProps = {
  openDrawer: () => void;
};
