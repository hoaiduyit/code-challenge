import { SwapTokenProvider } from "@app/contexts/swapToken.context";
import App from "./App";

const Root = () => {
  return (
    <SwapTokenProvider>
      <App />
    </SwapTokenProvider>
  );
};

export default Root;
