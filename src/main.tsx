import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
    </QueryClientProvider>

  </>
);
