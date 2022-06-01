import { Connection, Keypair, Transaction } from "@solana/web3.js";
import fetch from "cross-fetch";
import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";

const connection = new Connection("https://ssc-dao.genesysgo.net");
