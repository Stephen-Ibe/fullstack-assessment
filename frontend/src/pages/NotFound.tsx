import { Button } from "@mantine/core";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div className="not_found">
        <h1 className="text-8xl">404</h1>
        <p className="tracking-widest	text-lg">Page Not Found</p>
        <Link to="/" className="my-4">
          <Button size="md">Go back HOME </Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
