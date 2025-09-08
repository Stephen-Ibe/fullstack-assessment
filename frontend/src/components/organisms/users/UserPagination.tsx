import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { UsersCount } from "../../../lib";
import { Pagination } from "../../atom";
import { PaginationIcons } from "../../molecules";

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
      <PaginationIcons>
        <span>Next</span>
        <FaArrowRight />
      </PaginationIcons>
    )}
    previousIcon={() => (
      <PaginationIcons>
        <FaArrowLeft />
        <span>Previous</span>
      </PaginationIcons>
    )}
  />
);
