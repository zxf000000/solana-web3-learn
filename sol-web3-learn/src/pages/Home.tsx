import {Box, Button} from "@mui/material";

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction} from '@solana/web3.js';
import React, { FC, useCallback } from 'react';


const Home: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: LAMPORTS_PER_SOL,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <Box mt="100px">
            Home
            <Button onClick={onClick} disabled={!publicKey}>
                Send 1 lamport to a random address!
            </Button>
        </Box>
    );
}

export default Home;
