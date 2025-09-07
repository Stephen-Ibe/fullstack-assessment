import { Loader, Table, Title } from "@mantine/core";
import { useMemo } from "react";
import { PageHelmet, UserTableRow } from "../components";
import { useUsers, type User } from "../lib";

function App() {
  const { data, isLoading, gotoUserPosts } = useUsers();

  const userRows = useMemo(() => {
    if (!data) return null;
    return data.map(({ id, name, email, address }: User) => (
      <UserTableRow
        key={id}
        data={{ name, email, address }}
        onClick={() => gotoUserPosts({ id, name, email })}
      />
    ));
  }, [data]);

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
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
