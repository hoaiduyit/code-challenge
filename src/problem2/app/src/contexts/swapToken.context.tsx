import { createContext, Dispatch, SetStateAction, useState } from "react";

type SwapTokenContextType = {
  exchangeRate: number | null;
  setExchangeRate: Dispatch<SetStateAction<number | null>>;

  isSending: boolean;
  setIsSending: Dispatch<SetStateAction<boolean>>;
};

const initState: SwapTokenContextType = {
  exchangeRate: null,
  setExchangeRate: () => {
    // This will be set by the provider
  },

  isSending: false,
  setIsSending: () => {
    // This will be set by the provider
  },
};

export const SwapTokenContext = createContext(initState);

export const SwapTokenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  return (
    <SwapTokenContext.Provider
      value={{ exchangeRate, setExchangeRate, isSending, setIsSending }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
