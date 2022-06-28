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
    Keypair,
    SystemProgram,
    Transaction
} from "@solana/web3.js";

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
        const mintAccount = Keypair.generate();
        console.log(mintAccount);
        const rent = await getMinimumBalanceForRentExemptMint(connection);
        console.log(rent);
        console.log(publicKey.toBase58());
        const params = {
            fromPubkey: publicKey,
            newAccountPubkey: mintAccount.publicKey,
            space: MINT_SIZE,
            lamports: rent,
            programId: TOKEN_PROGRAM_ID,
        };
        let tx = (new Transaction()).add(
            SystemProgram.createAccount(params),
            createInitializeMintInstruction(
                mintAccount.publicKey,
                9,
                publicKey,
                null,
                TOKEN_PROGRAM_ID,
            )
        )
        try {
            const signature = await sendTransaction(tx, connection);
            console.log(signature, ' signature');
            const blockHash = await connection.getLatestBlockhash();
            const res = await connection.confirmTransaction({
                blockhash: blockHash.blockhash,
                lastValidBlockHeight: blockHash.lastValidBlockHeight,
                signature: signature,
            }, 'processed');
            console.log(res);
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

        </Box>
    )
}

export default GenerateToken;
