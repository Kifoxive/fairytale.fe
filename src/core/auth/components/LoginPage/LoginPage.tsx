import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { CssBaseline, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { LogoSquareIcon } from 'assets/icons';
import { useLoginUserMutation } from 'core/api';
import { TextField } from 'modules/form';
import { AnonymousLayout } from 'modules/layout';

import { config } from '../../../../config/index';
import { useDocumentTitle } from '../../../application/hooks/useDocumentTitle';
import { LoginForm, loginFormSchema } from './types';

// import styles from './LoginPage.module.scss';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Kifoxive
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const LoginPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.login'));

    const [loginUser] = useLoginUserMutation();

    const formDefaultValues = {
        email: 'palianycia@seznam.cz',
        password: '12345678',
    };

    const methods = useForm<LoginForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(loginFormSchema(t)),
    });
    const { handleSubmit } = methods;

    const onSubmit = async (formData: LoginForm) => {
        try {
            await loginUser({ data: formData }).unwrap();
            toast.success(t('login.success'));
        } catch (error) {
            toast.error(t('login.error'));
        }
    };

    return (
        <AnonymousLayout>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LogoSquareIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    {t('login.form.signIn')}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField name="email" label={t('login.form.email')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="password"
                                                type="password"
                                                label={t('login.form.password')}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        {t('login.form.signIn')}
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href={config.routes.resetPassword} variant="body2">
                                                {t('login.form.forgotPassword')}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href={config.routes.register} variant="body2">
                                                {t('login.form.signUp')}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </AnonymousLayout>
    );
};
