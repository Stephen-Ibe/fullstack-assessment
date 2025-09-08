import { Fragment } from "react";

type Props = {
  children: React.ReactNode;
};

export const PaginationIcons = ({ children }: Props) => (
  <Fragment>
    <div className="flex items-center gap-x-2 py-2.5 px-3">{children}</div>
  </Fragment>
);
