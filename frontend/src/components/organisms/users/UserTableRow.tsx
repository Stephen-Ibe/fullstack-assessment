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
      style={{
        cursor: onClick ? "pointer" : "default",
        borderBottom: "1px solid #eee",
      }}
    >
      <Table.Td style={{ maxWidth: 140, overflow: "hidden" }}>
        <span
          style={{
            display: "block",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </span>
      </Table.Td>
      <Table.Td style={{ maxWidth: 180, overflow: "hidden" }}>
        <span
          style={{
            display: "block",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {email}
        </span>
      </Table.Td>
      <Table.Td style={{ maxWidth: 392, overflow: "hidden" }}>
        <span
          style={{
            display: "block",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {address && address.length > 0 ? formatAddress(address[0]) : "-"}
        </span>
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
