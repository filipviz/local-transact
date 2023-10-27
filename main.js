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
            http: import.meta.env.JSON_RPC_ENDPOINT,
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
      580n,
      [0n, 0n, 0n, "0x0000000000000000000000000000000000000000"],
      [
        [false, false, false],
        0n,
        0n,
        0n,
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
              1000000000n,
              0n,
              "0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e",
              0n,
              "0x0000000000000000000000000000000000000000",
            ],
          ],
        ],
        [
          2n,
          [],
        ],
      ],
      [
        [
          "0x1d9619E10086FdC1065B114298384aAe3F680CC0",
          "0x000000000000000000000000000000000000EEEe",
          1000000000000000000000n,
          1n,
          0n,
          0n,
        ],
      ],
      "The Creator – Piano Marine Mike",
    ],
  });

  await writeContract(request)
    .then((tx) => console.log(tx))
    .catch((e) => console.error(e));
};
