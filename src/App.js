import { ChakraProvider } from "@chakra-ui/react";
import Brand from "./UI/Pages/Brand";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Brand />
      </ChakraProvider>
    </div>
  );
}

export default App;
