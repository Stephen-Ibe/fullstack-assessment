import { Table } from "@mantine/core";
import { formatAddress, type Address } from "../../../lib";

type Props = {
  data: {
    name: string;
    email: string;
    address: Address[];
  };
  onClick?: () => void;
};

const TableRow = ({ data: { name, email, address }, onClick }: Props) => {
  return (
    <Table.Tr
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Table.Td>{name}</Table.Td>
      <Table.Td>{email}</Table.Td>
      <Table.Td>
        {address && address.length > 0 ? formatAddress(address[0]) : "-"}
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
