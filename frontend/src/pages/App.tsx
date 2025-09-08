import { Title } from "@mantine/core";
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
      paginationData: { activePage, handlePaginationChange },
    },
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
