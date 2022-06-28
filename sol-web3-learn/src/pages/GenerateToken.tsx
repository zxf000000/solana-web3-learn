import {FC, useCallback, useState} from "react";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import { useConnection, useWallet} from "@solana/wallet-adapter-react";
import {WalletError} from "@solana/wallet-adapter-base";
import { useSnackbar } from 'notistack';
import {
    createInitializeMintInstruction,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    MintLayout,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {
    Keypair, LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import EventEmitter from "events";
import GetOrCreateAssociatedTokenAccount from "../components/GetOrCreateAssociatedTokenAccount";

declare global {
    interface Window {
        tx: any;
    }
}

const GenerateToken: FC = () => {

    const {connection} = useConnection();
    const {publicKey, sendTransaction, signTransaction} = useWallet();
    const [token, setToken] = useState('');
    const [generating, setGenerating] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const tapGenerate = async () => {

        if (!publicKey) {
            enqueueSnackbar('Not connected');
            return;
        }
        setGenerating(true);
        const mintAccount = Keypair.generate();
        console.log(mintAccount);
        const rent = await getMinimumBalanceForRentExemptMint(connection);
        console.log(rent);
        console.log(publicKey.toBase58());
        const params = {
            fromPubkey: publicKey,
            newAccountPubkey: mintAccount.publicKey,
            space: MINT_SIZE,
            lamports: LAMPORTS_PER_SOL,
            programId: TOKEN_PROGRAM_ID,
        };
        let tx = (new Transaction()).add(
            SystemProgram.createAccount(params),
            createInitializeMintInstruction(
                mintAccount.publicKey,
                8,
                publicKey,
                publicKey,
                TOKEN_PROGRAM_ID,
            )
        )
        try {
            const blockHash = await connection.getLatestBlockhash();
            tx.recentBlockhash = blockHash.blockhash;
            tx.feePayer = publicKey;
            if (signTransaction) {
                tx.partialSign(mintAccount);
                // 先签名后发送交易
                // const signedTx = await signTransaction(tx);
                // const signature = await connection.sendRawTransaction(signedTx.serialize())
                // 直接发送交易
                const signature = await sendTransaction(tx, connection);
                console.log(signature, ' signature');
                const res = await connection.confirmTransaction({
                    blockhash: blockHash.blockhash,
                    lastValidBlockHeight: blockHash.lastValidBlockHeight,
                    signature: signature,
                }, 'processed');
                console.log(res, ' token');
            }
            setToken(mintAccount.publicKey.toString());
            setGenerating(false);
        } catch (e) {
            setGenerating(false);
            enqueueSnackbar(`${(e as Error).message}`);
        }
    }
    return (
        <Box
            sx={{
                gridGap: '30px',
            }}
            display="flex" flexDirection="column">
            <Typography variant="h4">
                Generate token
            </Typography>
            <Box
                display="flex" alignItems="center">
                <Button
                    sx={{
                        mr: 2,
                    }}
                    disabled={generating}
                    onClick={tapGenerate}
                    variant="contained">Generate Token</Button>
                {
                    generating ?
                        <CircularProgress></CircularProgress>
                        : null
                }
            </Box>
            <Typography>
                Generated Token: {token}
            </Typography>
            <GetOrCreateAssociatedTokenAccount></GetOrCreateAssociatedTokenAccount>
        </Box>
    )
}

export default GenerateToken;
