import { QueryClient } from "@tanstack/react-query";
import "./App.css";
import { AppProvider } from "./providers/App";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
