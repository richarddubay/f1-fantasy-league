import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import RootRouter from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
