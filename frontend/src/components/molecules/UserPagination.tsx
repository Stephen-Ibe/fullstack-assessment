import { Pagination } from "@mantine/core";
import { Fragment } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { UsersCount } from "../../lib";

type Props = {
  activePage: number;
  usersCount: UsersCount;
  handlePaginationChange: (page: number) => void;
};

export const UserPagination = ({
  activePage,
  usersCount,
  handlePaginationChange,
}: Props) => (
  <Pagination
    value={activePage + 1}
    total={usersCount ? Math.ceil(usersCount.count / 4) : 1}
    onChange={handlePaginationChange}
    color="grape.1"
    autoContrast
    styles={{
      control: {
        border: "none",
        color: "#717680",
        "&[dataActive]": { color: "#7F56D9" },
      },
    }}
    nextIcon={() => (
      <Fragment>
        <div className="flex items-center gap-x-2 py-2.5 px-3">
          <span>Next</span>
          <FaArrowRight />
        </div>
      </Fragment>
    )}
    previousIcon={() => (
      <Fragment>
        <div className="flex items-center gap-x-2 p-2">
          <FaArrowLeft />
          <span>Previous</span>
        </div>
      </Fragment>
    )}
  />
);
