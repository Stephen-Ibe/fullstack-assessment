import { Loader } from "@mantine/core";
import React, { useMemo } from "react";
import { Table } from "../../atom";

type Props = {
  isLoading: boolean;
  userRows: React.ReactNode;
};

export const UsersTable = React.memo(({ isLoading, userRows }: Props) => {
  const renderedRows = useMemo(() => {
    if (isLoading) {
      return (
        <Table.Tr>
          <Table.Td colSpan={3} className="text-center">
            <div className="mx-auto w-fit">
              <Loader color="#7F56D9" type="dots" />
            </div>
          </Table.Td>
        </Table.Tr>
      );
    }
    return userRows;
  }, [isLoading, userRows]);

  return (
    <div className="users-table-wrapper">
      <Table
        withTableBorder
        highlightOnHover
        withRowBorders={false}
        horizontalSpacing="xl"
        verticalSpacing="lg"
        style={{ minWidth: 320, width: "100%" }}
      >
        <Table.Thead style={{ borderBottom: "none" }}>
          <Table.Tr>
            <Table.Th
              className="user-table-ellipsis table-head-small"
              style={{ minWidth: 120 }}
            >
              Full Name
            </Table.Th>
            <Table.Th
              className="user-table-ellipsis table-head-small"
              style={{ minWidth: 160 }}
            >
              Email Address
            </Table.Th>
            <Table.Th
              className="table-head-small"
              style={{ minWidth: 180, maxWidth: 392 }}
            >
              Address
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderedRows}</Table.Tbody>
      </Table>
      <style>{`
        .users-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }
        .user-table-ellipsis {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .table-head-small {
          font-size: 0.8rem !important;
          border-bottom: none !important;
        }
        @media (max-width: 900px) {
          .user-table-ellipsis {
            max-width: 100px !important;
          }
          .table-head-small {
            font-size: 0.8rem !important;
          }
          .mantine-Table-root {
            font-size: 0.95rem;
          }
          .mantine-Table-th, .mantine-Table-td {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
        }
        @media (max-width: 600px) {
          .user-table-ellipsis {
            max-width: 70px !important;
          }
          .table-head-small {
            font-size: 0.8rem !important;
          }
          .mantine-Table-root {
            font-size: 0.85rem;
          }
          .mantine-Table-th, .mantine-Table-td {
            padding-left: 6px !important;
            padding-right: 6px !important;
          }
          .mantine-Table-th {
            min-width: 80px !important;
          }
          .mantine-Table-td {
            min-width: 80px !important;
          }
        }
      `}</style>
    </div>
  );
});
