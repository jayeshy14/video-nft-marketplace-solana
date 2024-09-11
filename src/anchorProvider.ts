import {
  AnchorProvider,
  Program,
  web3,
  Idl,
  setProvider,
} from "@coral-xyz/anchor";
import idl from "./contracts/idl.json";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);
const wallet = window.solana;

const provider = new AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});
console.log(provider);
setProvider(provider);

const program = new Program(idl as Idl, provider);
console.log(program);

export {connection, provider, program };
