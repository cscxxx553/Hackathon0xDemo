import { Address } from "wagmi";

// https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price#response
export interface PriceResponse {
  chainId: number;
  price: string;
  estimatedPriceImpact: string;
  value: string;
  gasPrice: string;
  gas: string;
  estimatedGas: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  buyAmount: string;
  sellTokenAddress: string;
  sellAmount: string;
  sources: any[];
  allowanceTarget: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}

// https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#response
export interface QuoteResponse {
  chainId: number;
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: string;
  from: string;
  data: Address;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: any[];
  orders: any[];
  allowanceTarget: string;
  decodedUniqueId: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}

// Moralis.EvmApi.transaction.getWalletTransactionsVerbose
export interface transactionArr {
  block_hash: string;
  block_number: string;
  block_timestamp: string;
  from_address: string;
  from_address_label: string;
  gas: string;
  gas_price: string;
  hash: string;
  input: string;
  nonce: string;
  receipt_contract_address: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_root: string;
  receipt_status: string;
  to_address: string;
  to_address_label: string;
  transaction_index: string;
  decoded_call: {label: string;};
  logs: Array<{
      log_index: number;
      transaction_hash: string;
      transaction_index: number;
      address: string;
      data: string;
      topic0: string;
      topic1: string;
      topic2: string;
      topic3: string;
      block_timestamp: string;
      block_number: number;
      block_hash: string;
      transfer_index: Array<number>;
      transaction_value: string;
      decoded_event: {
        signature: string;
        label: string;
        type: string;
        params: Array<{
          name: string;
          value: string;
          type: string;
        }>;
      };
    }>;
  }
  
  // Moralis.EvmApi.token.getWalletTokenTransfers
  export interface TokenTransfer {
      token_name: string;
      token_symbol: string;
      token_logo: string | null;
      token_decimals: string;
      from_address: string;
      from_address_label: string | null;
      to_address: string;
      to_address_label: string | null;
      address: string;
      block_hash: string;
      block_number: number;
      block_timestamp: string;
      transaction_hash: string;
      transaction_index: number;
      log_index: number;
      value: string;
      possible_spam: boolean;
      value_decimal: string;
  }

  // Moralis.EvmApi.token.getWalletTokenBalances
  export interface TokenBalances {
    token_address: string;
    name: string;
    symbol: string;
    logo: string | null;
    thumbnail: string | null;
    decimals: number;
    balance: string;
    possible_spam: boolean;
  }
  