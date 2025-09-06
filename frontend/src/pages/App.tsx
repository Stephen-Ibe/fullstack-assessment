import { Table, Title } from "@mantine/core";
import { PageHelmet } from "../components";
import { useGetAllUsers } from "../lib/api";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

function App() {
  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      style={{ cursor: "pointer" }}
      onClick={() => alert(`Clicked row: ${element.name}`)}
    >
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
    </Table.Tr>
  ));

  const { data } = useGetAllUsers(0, 4);
  console.log(data);

  return (
    <>
      <PageHelmet title="Home" />
      <section className="container mx-auto p-24 h-screen">
        <div>
          <Title order={1}>Users</Title>

          <div className="my-8">
            <Table withTableBorder horizontalSpacing="lg" verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Full Name</Table.Th>
                  <Table.Th>Email Address</Table.Th>
                  <Table.Th style={{ width: 392 }}>Address</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
