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
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 0",
    }}
    className="w-full px-2"
  >
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
          minWidth: "clamp(28px, 8vw, 36px)",
          fontSize: "clamp(0.85rem, 3vw, 1rem)",
          padding: "0 clamp(4px, 2vw, 8px)",
          "&[dataActive]": { color: "#7F56D9" },
        },
      }}
      nextIcon={() => (
        <PaginationIcons>
          <span className="hidden md:inline">Next</span>
          <FaArrowRight />
        </PaginationIcons>
      )}
      previousIcon={() => (
        <PaginationIcons>
          <FaArrowLeft />
          <span className="hidden md:inline">Previous</span>
        </PaginationIcons>
      )}
    />
    <style>{`
      @media (max-width: 480px) {
        .mantine-Pagination-root {
          gap: 2px;
        }
        .mantine-Pagination-control {
          min-width: 28px !important;
          font-size: 0.85rem !important;
          padding: 0 4px !important;
        }
      }
    `}</style>
  </div>
);
