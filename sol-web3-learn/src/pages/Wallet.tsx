import {FC, useEffect, useState} from "react";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Outlet} from "react-router-dom";
import {LAMPORTS_PER_SOL, TransactionSignature} from "@solana/web3.js";
import {useSnackbar} from "notistack";

const Wallet: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    useEffect( () => {
        getBalance();
    })

    const getBalance = async () => {
        if (!publicKey) {
            return;
        }
        // 获取 balance
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
    }

    const requestAirdrop = async () => {
        if (!publicKey) {
            enqueueSnackbar("Not connected");
            return;
        }
        try {
            setLoading(true);
            const airdropSig = await connection.requestAirdrop(
                publicKey,
                LAMPORTS_PER_SOL * 10,
            )
            const lastestBlockhash = await connection.getLatestBlockhash();
            const config = {
                blockhash: lastestBlockhash.blockhash,
                lastValidBlockHeight: lastestBlockhash.lastValidBlockHeight,
                signature: airdropSig,
            };
            const res = await connection.confirmTransaction(config);
            console.log(res);
            setLoading(false);
            getBalance();
        } catch (e) {
            setLoading(false);
            enqueueSnackbar((e as Error).toString());
        }

    }

    return (
        <Box
            sx={{padding: '32px', pt: '64px',}}
        >
            <Typography variant="h2" component="h2">Account Page</Typography>
            <Box display="flex">
                <Button
                    disabled={loading}
                    variant="contained" onClick={requestAirdrop}>
                    Airdrop
                </Button>
                {loading ? <CircularProgress></CircularProgress> : null}
            </Box>
            <Typography sx={{
                my: 3,
            }}>
                Balance:  {balance} SOL
            </Typography>
            <Outlet></Outlet>
        </Box>
    );
}

export default Wallet;
