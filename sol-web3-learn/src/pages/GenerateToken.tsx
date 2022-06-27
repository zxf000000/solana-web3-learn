import {FC, useCallback, useState} from "react";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import { useConnection, useWallet} from "@solana/wallet-adapter-react";
import {WalletError} from "@solana/wallet-adapter-base";
import { useSnackbar } from 'notistack';
import {createMintToInstruction} from "@solana/spl-token";
import {sendAndConfirmTransaction, SystemProgram, Transaction} from "@solana/web3.js";

const GenerateToken: FC = () => {

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const [generating, setGenerating] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const tapGenerate = async () => {

        if (!publicKey) {
            enqueueSnackbar('Not connected');
            return;
        }
        setGenerating(true);
        const instruction = createMintToInstruction(
            publicKey,
            publicKey,
            publicKey,
            100,
            [],
            SystemProgram.programId,
        );
        const transaction = new Transaction();
        transaction.add(instruction);

        const signature = await sendTransaction(transaction, connection);
        // const res = await connection.confirmTransaction(signature, 'processed');
        console.log(signature);
        setGenerating(false);
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
            {
                generating ?
                    <CircularProgress></CircularProgress>
                    : null
            }
            <Button
                disabled={generating}
                onClick={tapGenerate}
                variant="contained">Generate Token</Button>
        </Box>
    )
}

export default GenerateToken;
