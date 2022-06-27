import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Outlet} from "react-router-dom";

const Wallet: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    return (
        <Box
            sx={{padding: '32px', pt: '64px',}}
        >
            <Typography variant="h2" component="h2">Account Page</Typography>
            <Outlet></Outlet>
        </Box>
    );
}

export default Wallet;
