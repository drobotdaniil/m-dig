import * as React from 'react';

export const DefaultPageLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <main>{children}</main>;
};
