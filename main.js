import {
  configureChains,
  getAccount,
  mainnet,
  prepareWriteContract,
  writeContract,
  createConfig,
  InjectedConnector,
  connect,
  disconnect,
} from "@wagmi/core";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "@wagmi/core/providers/public";
import "./style.css";
import { abi } from "./abi-lib/JBController3_1.json";

document.querySelector("#app").innerHTML = `
<button id="connect">Connect</button>
<button id="disconnect">Disconnect</button>
<button id="account">Log Account</button>
<button id="transact">Transaction</button>
`;

const SIMULATING = false;
const JBController3_1 = "0x97a5b9D9F0F7cD676B69f584F29048D0Ef4BB59b";

const connectButton = document.getElementById("connect");
const disconnectButton = document.getElementById("disconnect");
const transactionButton = document.getElementById("transact");
const accountButton = document.getElementById("account");

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  SIMULATING
    ? [
        jsonRpcProvider({
          rpc: () => ({
            http: import.meta.env.VITE_JSON_RPC_ENDPOINT,
          }),
        }),
      ]
    : [
        infuraProvider({
          apiKey: import.meta.env.VITE_INFURA_API_KEY,
        }),
        publicProvider(),
      ]
);

const connector = new InjectedConnector({ chains });

createConfig({
  autoConnect: false,
  connectors: [connector],
  publicClient,
  webSocketPublicClient,
});

connectButton.onclick = async () => await connect({ connector });
disconnectButton.onclick = async () => await disconnect();
accountButton.onclick = () => console.log(getAccount());

transactionButton.onclick = async () => {
  const { request } = await prepareWriteContract({
    address: JBController3_1,
    functionName: "reconfigureFundingCyclesOf",
    abi,
    args: [
      488n,
      [3628800n, 0n, 0n, "0x19D8C293D35EA4b2879A864A68D45a2025694929"],
      [
        [false, false, false],
        3000n,
        10000n,
        10000n,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        "0x0000000000000000000000000000000000000000",
        0n,
      ],
      1n,
      [
        [
          1n,
          [
            [
              false,
              false,
              188235294n,
              470n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              11764706n,
              0n,
              "0x90eda5165e5E1633E0Bdb6307cDecaE564b10ff7",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              470588235n,
              0n,
              "0xb045708e396E20071324C1aed2E4CFB90A0764FE",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              117647059n,
              0n,
              "0x30670d81e487c80b9edc54370e6eaf943b6eab39",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              58823529n,
              421n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              41176471n,
              0n,
              "0x2DdA8dc2f67f1eB94b250CaEFAc9De16f70c5A51",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              82352941n,
              0n,
              "0xB05Ba6660B9fAde3634466bF7834CdFC76fA4886",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              29411765n,
              477n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
          ],
        ],
        [
          2n,
          [
            [
              false,
              false,
              94117647n,
              470n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              5882353n,
              0n,
              "0x90eda5165e5E1633E0Bdb6307cDecaE564b10ff7",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              235294118n,
              0n,
              "0xb045708e396E20071324C1aed2E4CFB90A0764FE",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              58823529n,
              0n,
              "0x30670d81e487c80b9edc54370e6eaf943b6eab39",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              29411765n,
              421n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              20588235n,
              0n,
              "0x2DdA8dc2f67f1eB94b250CaEFAc9De16f70c5A51",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              41176471n,
              0n,
              "0xB05Ba6660B9fAde3634466bF7834CdFC76fA4886",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              14705882n,
              477n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              300000000n,
              0n,
              "0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
            [
              false,
              false,
              200000000n,
              0n,
              "0x7F7a60dFa52C5126e454E0387d98bcC8c4F44524",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
          ],
        ],
      ],
      [
        [
          "0xFA391De95Fcbcd3157268B91d8c7af083E607A5C",
          "0x000000000000000000000000000000000000EEEe",
          42500000000000000000000n,
          2n,
          0n,
          0n,
        ],
      ],
      "Sunlight - Herbie Hancock",
    ],
  });

  await writeContract(request)
    .then((tx) => console.log(tx))
    .catch((e) => console.error(e));
};
