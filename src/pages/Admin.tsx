import React, { PropsWithChildren } from 'react';

const Admin: React.FC = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Admin;
