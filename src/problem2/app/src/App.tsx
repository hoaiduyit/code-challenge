import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useCallback, useContext, useState } from "react";

import viteLogo from "/vite.svg";

import styles from "./App.module.css";
import reactLogo from "./assets/react.svg";
import { SwapFormType } from "./types/swapForm.type";
import { SwapForm } from "./components/SwapForm/SwapForm";
import { SwapTokenContext } from "./contexts/swapToken.context";
import { Formik } from "formik";
import { swapFormValidationSchema } from "./validations/swapForm";
import { NumericFormat } from "react-number-format";

function App() {
  const { exchangeRate, isSending, setExchangeRate, setIsSending } =
    useContext(SwapTokenContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (values: SwapFormType) => {
      setLoading(true);
      setTimeout(() => {
        setExchangeRate(
          isSending ? values.rate * values.amount : values.amount / values.rate,
        );
        setLoading(false);
      }, 2000);
    },
    [isSending],
  );

  const handleChangeExchangeState = () => {
    setIsSending((pre) => !pre);
    setExchangeRate(null);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={`${styles.logo} ${styles.react}`}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Swap Assests</h1>
      <Formik<SwapFormType>
        initialValues={{ rate: 1, amount: 1 }}
        validationSchema={swapFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit: onSubmit }) => (
          <div className={styles.card}>
            <form className={styles.formWrapper} onSubmit={onSubmit}>
              <SwapForm />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleChangeExchangeState}
                >
                  {`To ${isSending ? "Receive" : "Send"}`}
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={loading}
                >
                  Swap
                </LoadingButton>
              </div>
              {exchangeRate && (
                <div className="w-full text-center">
                  <label>Amount to {isSending ? "receive" : "send"}: </label>
                  <NumericFormat
                    thousandSeparator
                    id="amountToReceive"
                    name="amountToReceive"
                    renderText={(value) => <b>{value}</b>}
                    displayType="text"
                    value={exchangeRate}
                  />
                </div>
              )}
            </form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default App;
