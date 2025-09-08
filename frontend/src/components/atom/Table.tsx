import {
  Table as MantineTable,
  type TableProps,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";

type Props = TableProps;

const Table = ({ children, ...props }: Props) => (
  <MantineTable {...props}>{children}</MantineTable>
);

Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tr = TableTr;
Table.Th = TableTh;
Table.Td = TableTd;

export { Table };
