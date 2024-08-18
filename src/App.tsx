import { PropsWithChildren, useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [friendTipPercentage, setFriendTipPercentage] = useState(0);

  function resetDefaults() {
    setBill(0);
    setTipPercentage(0);
    setFriendTipPercentage(0);
  }

  function handleSetBill(bill: number) {
    if (isNaN(bill)) return;
    setBill(bill);
  }

  return (
    <>
      <Bill bill={bill} onBillChanged={(bill) => handleSetBill(bill)}>
        How much was the bill?
      </Bill>
      <Tip tipPercentage={tipPercentage} onTipChanged={setTipPercentage}>
        How did you like the service?
      </Tip>
      <Tip
        tipPercentage={friendTipPercentage}
        onTipChanged={setFriendTipPercentage}
      >
        How did your friend like the service?
      </Tip>
      {bill > 0 && (
        <>
          <Payment
            bill={bill}
            tip={tipPercentage}
            tip2={friendTipPercentage}
          ></Payment>
          <Reset onReset={resetDefaults}></Reset>
        </>
      )}
    </>
  );
}

interface BillProps {
  bill: number;
  onBillChanged: (bill: number) => void;
}

function Bill({ bill, onBillChanged, children }: PropsWithChildren<BillProps>) {
  return (
    <>
      <p>{children}</p>
      <input
        type="text"
        value={bill}
        onChange={(e) => onBillChanged(+e.target.value)}
      ></input>
    </>
  );
}

interface TipProps {
  tipPercentage: number;
  onTipChanged: (tip: number) => void;
}

function Tip({
  tipPercentage,
  onTipChanged,
  children,
}: PropsWithChildren<TipProps>) {
  return (
    <>
      <p>{children}</p>
      <select
        value={tipPercentage}
        onChange={(e) => onTipChanged(+e.target.value)}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="0.05">It was okay (5%)</option>
        <option value="0.1">It was good (10%)</option>
        <option value="0.2">Absolutely amazing! (20%)</option>
      </select>
    </>
  );
}

interface PaymentProps {
  bill: number;
  tip: number;
  tip2: number;
}

function Payment({ bill, tip, tip2 }: PaymentProps) {
  const calculatedTip = tip * bill;
  const calculatedTip2 = tip2 * bill;
  const tipAverage = (calculatedTip + calculatedTip2) / 2;
  const payment = bill + tipAverage;

  return (
    <h3>{`You pay $${payment.toFixed(2)} ($${bill.toFixed(
      2
    )} + $${tipAverage.toFixed(2)}) tip`}</h3>
  );
}

interface ResetProps {
  onReset: () => void;
}

function Reset({ onReset }: ResetProps) {
  return <button onClick={onReset}>Reset</button>;
}

export default App;
