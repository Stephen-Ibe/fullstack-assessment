import { Text, Title } from "@mantine/core";
import { useMemo } from "react";
import {
  PageHelmet,
  UserPagination,
  UsersTable,
  UserTableRow,
} from "../components";
import { useUsers, type User } from "../lib";

function App() {
  const {
    user: {
      allUsers,
      isLoading,
      gotoUserPosts,
      usersCount,
      allUsersError,
      paginationData: { activePage, handlePaginationChange },
    },
  } = useUsers();

  console.log(allUsersError);

  const userRows = useMemo(() => {
    if (!allUsers)
      return (
        <tr>
          <td colSpan={3} style={{ textAlign: "center", padding: "2rem 0" }}>
            <Text>
              {allUsersError
                ? typeof allUsersError === "string"
                  ? allUsersError
                  : allUsersError.message
                : "No users found."}
              {` Please try again.`}
            </Text>
          </td>
        </tr>
      );
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
      <section className="container mx-auto p-8 lg:p-24 h-screen">
        <div>
          <Title order={1}>Users</Title>
          <div className="my-8">
            <UsersTable isLoading={isLoading} userRows={userRows ?? <></>} />
            <div className="my-6 ml-auto w-fit">
              <UserPagination
                activePage={activePage}
                usersCount={usersCount ?? { count: 10 }}
                handlePaginationChange={handlePaginationChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
