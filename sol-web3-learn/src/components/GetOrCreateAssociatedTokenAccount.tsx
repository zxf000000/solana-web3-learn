import React, {FC, useState} from "react";
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";


const GetOrCreateAssociatedTokenAccount: FC = () => {

    const [token, setToken] = useState('');
    const [loading ,setLoading] = useState(false);
    const tokenInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }

    const createAccount = () => {
        setLoading(true);
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="start">
            <Typography variant="h4">
                Get or generate associated token account
            </Typography>
            <TextField
                sx={{
                    minWidth: '400px',
                    mt: 4,
                }}
                variant="standard"
                label="token pubkey"
                value={token}
                onChange={tokenInput}>
            </TextField>
            <Box
                sx={{
                    mt: 4,
                }}
                display="flex" alignItems="center">
                <Button
                    sx={{
                        mr: 2,
                    }}
                    variant="contained"
                    onClick={createAccount}
                    disabled={
                        token.length === 0 || loading
                    }
                >
                    Create/Find Account
                </Button>
                {
                    loading ?
                        <CircularProgress size={30}></CircularProgress>
                        : null
                }
            </Box>
        </Box>
    )
}

export default GetOrCreateAssociatedTokenAccount;
