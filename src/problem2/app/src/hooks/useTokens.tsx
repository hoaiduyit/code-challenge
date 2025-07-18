import { CurrencyType } from "@app/types/currency.type";
import axios from "axios";
import { useEffect, useState } from "react";

export const useTokens = () => {
  const [tokens, setTokens] = useState<CurrencyType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://interview.switcheo.com/prices.json",
      );

      // the data is not unique, so we need to filter it base on the latest date and currency type
      const uniqCurrencies: CurrencyType[] = Array.from(
        data
          .reduce((map: Map<string, CurrencyType>, item: CurrencyType) => {
            const existing = map.get(item.currency);

            if (!existing || new Date(item.date) > new Date(existing.date)) {
              map.set(item.currency, item);
            }

            return map;
          }, new Map())
          .values(),
      );

      setTokens(uniqCurrencies);
    })();
  }, []);

  return tokens;
};
