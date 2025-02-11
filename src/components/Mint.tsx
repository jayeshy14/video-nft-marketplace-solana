// import { useState, useEffect } from "react";
// import React from "react";
// import { provider, program } from "../anchorProvider";
// import { web3 } from "@coral-xyz/anchor";
// import {
//   getAssociatedTokenAddress,
//   ASSOCIATED_TOKEN_PROGRAM_ID,
//   TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";
// import { getProvider } from "../detectProvider";

// const Mint: React.FC = () => {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [price, setPrice] = useState<any | null>(0);
//   const [rooms, setRooms] = useState<any | null>(0);
//   const [bathrooms, setBathrooms] = useState<any | null>(0);
//   const [parking, setParking] = useState<any | null>(0);
//   const [area, setArea] = useState<any | null>(0);
//   const [image, setImage] = useState<any | null>(null);
//   const [uri, setUri] = useState<string>("");
//   const [stateInitialized, setStateInitialized] = useState<boolean>(false);
//   const [mintAccount, setMintAccount] = useState<any | null>("");
//   const [associatedTokenAccount, setAssociatedTokenAccount] = useState<any | null>("");
//   const [currentProvider, setCurrentProvider] = useState<any | null>("");
//   const [stateAccount, setStateAccount] = useState<web3.PublicKey>(
//     new web3.PublicKey("9Vj7E3HAc3bcVHz2ZB3J3vTT4DGirdQ7eHawhde1fRUZ")
//   ); //checking
//   const REACT_APP_PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

//   useEffect(() => {
//     const checkInitialization = async () => {
//       try {
//         // const [stateAccountPublicKey] = web3.PublicKey.findProgramAddressSync(
//         //   [Buffer.from("state")],
//         //   program.programId
//         // );
//         // console.log("state account: ", stateAccountPublicKey.toString());

//         const stateAccountPublicKey = new web3.PublicKey(
//           "9Vj7E3HAc3bcVHz2ZB3J3vTT4DGirdQ7eHawhde1fRUZ"
//         );
//         console.log(stateAccountPublicKey);
//         setStateAccount(stateAccountPublicKey);

//         const stateAccount = await provider.connection.getAccountInfo(
//           stateAccountPublicKey
//         );
//         console.log(stateAccount);
//         if (stateAccount) {
//           setStateInitialized(true);
//         }
//       } catch (error) {
//         console.error("Error checking initialization:", error);
//       }
//     };

//     checkInitialization();
//   }, []);

//   const handleFileChange = (event: any) => {
//     if (!event.target.files) return;
//     setImage(event.target.files[0]);
//   };

//   const initializeState = async () => {
//     try {
//       const tx = await program.methods
//         .initialize()
//         .accounts({
//           state: new web3.PublicKey(
//             "9Vj7E3HAc3bcVHz2ZB3J3vTT4DGirdQ7eHawhde1fRUZ" // state account derived from solana pg, not by seeds in code
//           ),
//           signer: provider.wallet.publicKey,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .rpc();
//       console.log("Initialize tx signature: ", tx);

//       setStateInitialized(true);
//     } catch (error) {
//       console.error("Error initializing state:", error);
//     }
//   };

//   const mintNft = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     // check if state is initialized, if not, do it
//     if (!stateInitialized) {
//       alert("State is not initialized. Initializing the state first.");
//       await initializeState();
//       return;
//     }

//     try {
//       const provider = getProvider();
//       console.log(provider);
//       setCurrentProvider(provider._publicKey.toString());
//       console.log("calling get counter function");
//       const currentCounter = await program.methods
//         .getCounter()
//         .accounts({
//           state: new web3.PublicKey(
//             "9Vj7E3HAc3bcVHz2ZB3J3vTT4DGirdQ7eHawhde1fRUZ"
//           ),
//           signer: provider.publicKey,
//         })
//         .view();
//       console.log("current counter: ", currentCounter);


//     const counterBytes = new Uint8Array(4);
//     new DataView(counterBytes.buffer).setUint32(0, currentCounter, true);

//     const seeds = [
//       new TextEncoder().encode("mint"),
//       provider.publicKey.toBuffer(),
//       counterBytes,
//     ];

//     const [mintAccountPublicKey] = web3.PublicKey.findProgramAddressSync(
//       seeds,
//       program.programId
//     );

//       // const counterBytes = Buffer.alloc(4);
//       // counterBytes.writeUInt32LE(currentCounter, 0);
//       // const seeds = [
//       //   Buffer.from("mint"),
//       //   provider.publicKey.toBuffer(),
//       //   counterBytes,
//       // ];
//       // const [mintAccountPublicKey] = web3.PublicKey.findProgramAddressSync(
//       //   seeds,
//       //   program.programId
//       // );
//       setMintAccount(mintAccountPublicKey);

//       const ata = await getAssociatedTokenAddress(
//         mintAccountPublicKey,
//         new web3.PublicKey(provider._publicKey.toString()),
//         false
//       );
//       setAssociatedTokenAccount(ata.toBase58());

//       // Upload image to IPFS
//       const formData = new FormData();
//       formData.append("file", image);
//       const options = JSON.stringify({
//         cidVersion: 0,
//       });
//       formData.append("pinataOptions", options);
//       const metadata = JSON.stringify({
//         name: name,
//       });
//       formData.append("pinataMetadata", metadata);

//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
//           },
//           body: formData,
//         }
//       );
//       console.log(res);
//       const resDataJson = await res.json();
//       console.log("res json: ",resDataJson);
//       const tokenImageUri = `https://gold-quick-antelope-719.mypinata.cloud/ipfs/${resDataJson.IpfsHash}`;
//       console.log(tokenImageUri);
//       console.log("NFT image saved to IPFS! Creating metadata...");

//       // create metadata
//       const data = JSON.stringify({
//         pinataContent: {
//           name: name,
//           symbol: name.toUpperCase(),
//           description: "Real Estate NFT",
//           image: tokenImageUri,
//           attributes: [
//             {
//               trait_type: "numberOfRooms",
//               value: rooms,
//             },
//             {
//               trait_type: "numberOfBathrooms",
//               value: bathrooms,
//             },
//             {
//               trait_type: "numberOfParking",
//               value: parking,
//             },
//             {
//               trait_type: "propertyAreaInSqft",
//               value: area,
//             },
//             {
//               trait_type: "address",
//               value: address,
//             },
//             {
//               trait_type: "price",
//               value: price,
//             },
//             {
//               trait_type: "mintAccount",
//               value: mintAccountPublicKey.toBase58(),
//             },
//             {
//               trait_type: "mintAuthority",
//               value: currentProvider,
//             },
//             {
//               trait_type: "associatedTokenAccount",
//               value: ata.toBase58(),
//             },
//           ],
//           properties: {},
//           collection: {},
//         },
//         pinataMetadata: {
//           name: "Metadata.json",
//         },
//       });

//       // send metadata to IPFS
//       const res2 = await fetch(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
//             "Content-Type": "application/json",
//           },
//           body: data,
//         }
//       );
//       const resData2 = await res2.json();
//       setUri(resData2.IpfsHash); // change here made
//       console.log("NFT metadata saved to IPFS!");

//       const tx = await program.methods
//         .initNft(resData2.IpfsHash) //change here made
//         .accounts({
//           state: stateAccount,
//           signer: provider.publicKey,
//           mint: mintAccountPublicKey.toBase58(),
//           associated_token_account: ata.toBase58(),
//           token_program: TOKEN_PROGRAM_ID,
//           associated_token_program: ASSOCIATED_TOKEN_PROGRAM_ID,
//           system_program: web3.SystemProgram.programId,
//           rent: web3.SYSVAR_RENT_PUBKEY,
//         })
//         .rpc();

//       alert("minted NFT successfully");

//       console.log("InItNFT tx signature: ", tx);

//       console.log("mintAccountPublicKey: ", mintAccount);
//       console.log("ata: ", associatedTokenAccount);
//       alert("NFT minted successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <h1>Mint your NFT</h1>
//       {/* <form onSubmit={mintNft}> */}
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Address:
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Price:
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Rooms:
//         <input
//           type="number"
//           value={rooms}
//           onChange={(e) => setRooms(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Bathrooms:
//         <input
//           type="number"
//           value={bathrooms}
//           onChange={(e) => setBathrooms(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Parking:
//         <input
//           type="number"
//           value={parking}
//           onChange={(e) => setParking(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Area:
//         <input
//           type="number"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <label>
//         Image:
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileChange(e)}
//           required
//         />
//       </label>
//       <br />
//       <br />
//       <button onClick={mintNft}>MINT</button>
//       {/* </form> */}
//     </>
//   );
// };

// export default Mint;
// create metadata
import React, { useEffect, useState } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { web3, BN } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import idl from './idl.json'; // Replace with the path to your IDL
import { provider, program } from "../anchorProvider";
import { getProvider } from "../detectProvider";
console.log(provider);
const { SystemProgram } = web3;

const programID = new web3.PublicKey('8zd8SR11prvsNrSfsgyrn3qnUyQnSUMszqNnnbq1KErJ');

const MintNFT : React.FC =  () => {
  const wallet = useAnchorWallet();
  const { publicKey, sendTransaction } = useWallet();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [video, setVideo] = useState<any | null>(null);
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState<string>("");
  const [mintAccount, setMintAccount] = useState<any | null>("");
  const [associatedTokenAccount, setAssociatedTokenAccount] = useState<any | null>("");
  const [currentProvider, setCurrentProvider] = useState<any | null>("");
  const [stateInitialized, setStateInitialized] = useState<boolean>(false);
  const [stateAccount, setStateAccount] = useState<web3.PublicKey>(
    new web3.PublicKey("4vMbU5QPsQfnMPUP9xja321Js9htTTdS5U9MkqRkNBzP")
  ); //checking


  const REACT_APP_PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

  useEffect(() => {
    const checkInitialization = async () => {
      try {
        const stateAccountPublicKey = new web3.PublicKey("4vMbU5QPsQfnMPUP9xja321Js9htTTdS5U9MkqRkNBzP")
        console.log("state account public key: ", stateAccountPublicKey)
        setStateAccount(stateAccountPublicKey);

        const stateAccountInfo = await provider.connection.getAccountInfo(
          stateAccountPublicKey
        );
        if (stateAccountInfo) {
          setStateInitialized(true);
        }
      } catch (error) {
        console.error("Error checking initialization:", error);
      }
    };

    checkInitialization();
  }, []);


  const initializeState = async () => {
    try {
      const tx = await program.methods
        .initialize()
        .accounts({
          state: stateAccount,
          signer: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      console.log("Initialize tx signature: ", tx);
      setStateInitialized(true);
    } catch (error) {
      console.error("Error initializing state:", error);
    }
  };

  const mintNft = async () => {
    if (!wallet || !publicKey) {
      alert('Please connect your wallet!');
      return;
    }
    if (!stateInitialized) {
      alert("State is not initialized. Initializing the state first.");
      await initializeState();
      return;
    }
    try {
      const provider = getProvider();
      setCurrentProvider(provider._publicKey.toString());

      const currentCounter = await program.methods
        .getCounter()
        .accounts({
          state: new web3.PublicKey("4vMbU5QPsQfnMPUP9xja321Js9htTTdS5U9MkqRkNBzP"),
          signer: provider.publicKey,
        })
        .view();

      const counterBytes = new Uint8Array(4);
      new DataView(counterBytes.buffer).setUint32(0, currentCounter, true);

      const seeds = [
        new TextEncoder().encode("mint"),
        provider.publicKey.toBuffer(),
        counterBytes,
      ];

      const [mintAccountPublicKey] = web3.PublicKey.findProgramAddressSync(
        seeds,
        programID
      );

      setMintAccount(mintAccountPublicKey.toBase58());

      const ata = await getAssociatedTokenAddress(
        mintAccountPublicKey,
        new web3.PublicKey(provider._publicKey.toString()),
        false
      );
      setAssociatedTokenAccount(ata.toBase58());

      // Upload image to IPFS
      const formData = new FormData();
      formData.append("file", video);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      const metadata = JSON.stringify({
        name: title,
      });
      formData.append("pinataMetadata", metadata);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      console.log(res);
      const resDataJson = await res.json();
      console.log("res json: ",resDataJson);
      const tokenVideoUri = `https://gold-quick-antelope-719.mypinata.cloud/ipfs/${resDataJson.IpfsHash}`;
      console.log(tokenVideoUri);
      console.log("NFT image saved to IPFS! Creating metadata...");


//Upload to IPFS
const data = JSON.stringify({
  pinataContent: {
    name: title,
    description: "Video NFT",
    image: uri,
    attributes: [
      {
        trait_type: "description",
        value: description,
      },
      {
        trait_type: "price",
        value: price,
      },
      {
        trait_type: "mintAccount",
        value: mintAccount,
      },
      {
        trait_type: "mintAuthority",
        value: currentProvider,
      },
    ],
    properties: {},
    collection: {},
  },
  pinataMetadata: {
    name: "Metadata.json",
  },
});


// send metadata to IPFS
const res2 = await fetch(
  "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REACT_APP_PINATA_JWT}`,
      "Content-Type": "application/json",
    },
    body: data,
  }
);
const resData2 = await res2.json();
setUri(resData2.IpfsHash); // change here made
console.log("NFT metadata saved to IPFS!");
console.log(`signer: `, provider.publicKey);
console.log(`Rent account address: ${web3.SYSVAR_RENT_PUBKEY}`)

const tx = await program.methods
.mintVideoNft(resData2.IpfsHash, new BN(price))
.accounts({
  state: stateAccount,
  signer: provider.publicKey,
  mint: mintAccountPublicKey,
  tokenAccount: ata,
  tokenProgram: TOKEN_PROGRAM_ID,
  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  systemProgram: web3.SystemProgram.programId,
  rent: web3.SYSVAR_RENT_PUBKEY,
})
.rpc();

alert('NFT minted successfully!');

    } catch (error) {
      console.log(error);
    }
  }

const handleFileChange = (event: any) => {
  if (!event.target.files) return;
  setVideo(event.target.files[0]);
};

return (
<div className="max-w-md mx-auto bg-sky-800 p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Mint Your Video NFT</h2>

  <input
    type="text"
    placeholder="Video Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text"
    placeholder="Video Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(parseInt(e.target.value))}
    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="file"
    accept="video/*"
    onChange={(e) => handleFileChange(e)}
    required
    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    onClick={mintNft}
    className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-300"
  >
    Mint NFT
  </button>
</div>

)};
export default MintNFT;