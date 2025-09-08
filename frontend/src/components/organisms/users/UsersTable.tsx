import { Loader } from "@mantine/core";
import { Table } from "../../atom";

type Props = {
  isLoading: boolean;
  userRows: React.ReactNode;
};

export const UsersTable = ({ isLoading, userRows }: Props) => (
  <Table withTableBorder horizontalSpacing="lg" verticalSpacing="md">
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Full Name</Table.Th>
        <Table.Th>Email Address</Table.Th>
        <Table.Th style={{ width: 392 }}>Address</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {isLoading ? (
        <Table.Tr>
          <Table.Td colSpan={3} className="text-center">
            <div className="mx-auto w-fit">
              <Loader color="#7F56D9" type="dots" />
            </div>
          </Table.Td>
        </Table.Tr>
      ) : (
        userRows
      )}
    </Table.Tbody>
  </Table>
);
