import Home from "./components/Home";
import Mint from "./components/Mint";
import MyNfts from "./components/MyNfts";
import React, { FC, ReactNode, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const App: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  return (
    <div className="justify-center h-screen w-full bg-gray-500 justify-items-center">
      <BrowserRouter>
      <header className="bg-sky-800 shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              <Link to="/">Video Marketplace</Link>
            </h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-800 hover:text-gray-600"  >
              Home
            </Link>
            <Link to="/home" className="text-gray-800 hover:text-gray-600">
              All NFTs
            </Link>
            <Link to="/mint" className="text-gray-800 hover:text-gray-600">
              Mint
            </Link>
            <Link to="/my-nfts" className="text-gray-800 hover:text-gray-600">
              My NFTs
            </Link>
          </div>
          <WalletMultiButton />
        </div>
      </header>
      <div className="py-4"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/my-nfts" element={<MyNfts />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};
// import "./App.css";
// import Home from "./components/Home";
// import Mint from "./components/Mint";
// import MyNfts from "./components/MyNfts";
// import Navbar from "./components/Navbar";
// import React, { FC, ReactNode, useMemo } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   BrowserRouter,
// } from "react-router-dom";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import {
//   WalletModalProvider,
// } from "@solana/wallet-adapter-react-ui";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
// import "@solana/wallet-adapter-react-ui/styles.css";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";

// const App: FC = () => {
//   return (
//     <Context>
//       <Content />
//     </Context>
//   );
// };

// export default App;

// const Context: FC<{ children: ReactNode }> = ({ children }) => {
//   const network = WalletAdapterNetwork.Devnet;
//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//   const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>{children}</WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

// const Content: FC = () => {
//   return (
//     <div className="App">
//       <Navbar />
//       <div className="container mx-auto px-6 py-8">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/mint" element={<Mint />} />
//             <Route path="/my-nfts" element={<MyNfts />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// };
