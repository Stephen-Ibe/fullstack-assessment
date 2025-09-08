import { Button, Text } from "@mantine/core";

type Props = {
  allUsersError?: Error | string | null;
};

export const UsersError = ({ allUsersError }: Props) => (
  <tr>
    <td
      colSpan={3}
      style={{ textAlign: "center", padding: "2rem 0" }}
      className=""
    >
      <Text>
        {allUsersError
          ? typeof allUsersError === "string"
            ? allUsersError
            : allUsersError.message
          : "No users found."}
      </Text>
      <Button
        size="xs"
        onClick={() => window.location.reload()}
        className="mt-2"
      >
        Try Again
      </Button>
    </td>
  </tr>
);
