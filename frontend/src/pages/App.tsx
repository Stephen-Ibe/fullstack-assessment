import { Title } from "@mantine/core";
import { PageHelmet } from "../components";

function App() {
  return (
    <>
      <PageHelmet title="Home" />
      <section className="container mx-auto p-24 h-screen">
        <div>
          <Title order={1}>Users</Title>
        </div>
      </section>
    </>
  );
}

export default App;
