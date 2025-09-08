import { Loader, Pagination, Table, Title } from "@mantine/core";
import { Fragment, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PageHelmet, UserTableRow } from "../components";
import { useUsers, type User } from "../lib";

function App() {
  const {
    user: { allUsers, isLoading, gotoUserPosts, usersCount },
  } = useUsers();

  const userRows = useMemo(() => {
    if (!allUsers) return null;
    return allUsers.map(({ id, name, email, address }: User) => (
      <UserTableRow
        key={id}
        data={{ name, email, address }}
        onClick={() => gotoUserPosts({ id, name, email })}
      />
    ));
  }, [allUsers, gotoUserPosts]);

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
            <div className="my-6 ml-auto w-fit">
              <Pagination
                total={usersCount ? Math.ceil(usersCount.count / 4) : 1}
                color="grape.1"
                autoContrast
                styles={{
                  control: {
                    border: "none",
                    color: "#717680",
                    "&[data-active]": { color: "#7F56D9" },
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
