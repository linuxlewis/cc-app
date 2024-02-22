import { useState, useCallback } from 'react';
import { Button, Grid, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';

import { AxiosError, AxiosResponse } from 'axios';

import { useMutation } from 'react-query';

type ValidateResponse = {
    message: string;
};

type CreditCard = {
    number: string;
};

const Home = () => {
    const cardMutation = useMutation<
        AxiosResponse<ValidateResponse>,
        AxiosError<ValidateResponse>,
        CreditCard,
        unknown
    >(({ number }: CreditCard) => {
        return axios.post<ValidateResponse>('/api/validate', { number });
    });

    const [number, setNumber] = useState<string>('');

    const onClick = useCallback(() => {
        cardMutation.mutate({ number });
    }, [number]);

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            <Paper
                sx={{
                    margin: 'auto',
                    maxWidth: 720,
                    padding: 4,
                    maxHeight: 500,
                }}
            >
                <Grid container spacing={3} flexDirection="column">
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Credit Card Validator
                        </Typography>
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Credit Card Number"
                            fullWidth
                            placeholder="1111222233334444"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                            error={cardMutation.isError}
                            helperText={
                                cardMutation.isError
                                    ? cardMutation.error.response?.data?.message
                                    : ''
                            }
                        />

                        {cardMutation.isSuccess && (
                            <Typography>
                                {cardMutation.data.data.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item>
                        <Button
                            onClick={onClick}
                            disabled={cardMutation.isLoading}
                            variant="outlined"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
export default Home;
