import { useState } from "react";
import PriceView from "./Price";
import QuoteView from "./Quote";
import type { PriceResponse } from "./api/types";
import GetTransactions from "./Wallet"
import GetTokenTransfer from "./Token"
import { useAccount } from "wagmi";

export default function Home() {
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState<PriceResponse | undefined>();
  const [quote, setQuote] = useState();
  const { address } = useAccount();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {finalize && price ? (
        <div>
        <div className="div-swap-balance">
        <div>
        <QuoteView
          takerAddress={address}
          price={price}
          quote={quote}
          setQuote={setQuote}
        />
        </div>
        <div className="div-token-balance">
          <GetTokenTransfer />
        </div>
        </div>
        <div>
          <GetTransactions />
        </div>
        </div>
      ) : (
        <div>
        <div className="div-swap-balance">
        <div>
        <PriceView
          takerAddress={address}
          price={price}
          setPrice={setPrice}
          setFinalize={setFinalize}
        />
        </div>
        <div className="div-token-balance">
          <GetTokenTransfer />
        </div>
        </div>
        <div>
          <GetTransactions />
        </div>
        </div>
      )}
    </main>
  );
}
