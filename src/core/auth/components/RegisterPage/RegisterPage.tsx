import React, { useCallback, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LogoSquareIcon } from 'assets/icons';
import { useLazyRegisterUserQuery } from 'core/api';
import useChange from 'hooks/useChange';
import { debounce } from 'lodash';
import { TextField } from 'modules/form';
import { AnonymousLayout } from 'modules/layout';
import { useLazyGetEmailAvailabilityQuery } from 'pages/UserTablePage';

import { config } from '../../../../config/index';
import { useDocumentTitle } from '../../../application/hooks/useDocumentTitle';
import { RegisterForm } from './types';
import { registerFormSchema } from './types/index';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {/* <Link color="inherit" href="https://mui.com/">
                Kifoxive
            </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const RegisterPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.register'));

    const [checkEmailAvailability] = useLazyGetEmailAvailabilityQuery();
    const [registerUser] = useLazyRegisterUserQuery();
    const [isEmailCheckFetching, setIsEmailCheckFetching] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(true);

    const formDefaultValues = {
        firstName: 'Yuriy 2',
        lastName: 'Pereginyak 2',
        email: 'yura835.ru@gmail.com',
        password: '12345678',
    };

    const methods = useForm<RegisterForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(registerFormSchema(t)),
    });
    const { control, handleSubmit, setError, trigger } = methods;

    const { email } = useWatch({ control });

    const onSubmit = async (formData: RegisterForm) => {
        try {
            await registerUser({ data: formData }).unwrap();

            if (isEmailCheckFetching) {
                return methods.setError('email', { message: t('register.waitCheckEmail') });
            } else if (!isEmailAvailable) {
                return methods.setError('email', { message: t('register.emailNotUnique') });
            }
            toast.success(t('register.success'));
        } catch (error) {
            toast.error(t('register.error'));
        }
    };

    // check is email available
    const fetchIsEmailAvailable = async (email: string) => {
        // do not check the email availability, if email is not valid
        const isEmailValid = await trigger('email');
        if (!isEmailValid) return;

        try {
            await checkEmailAvailability({ email }).unwrap();
            setIsEmailAvailable(true);
        } catch (e) {
            console.log(e);
            setError('email', { message: t('register.emailNotUnique') });
            setIsEmailAvailable(false);
        } finally {
            setIsEmailCheckFetching(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchDelay = useCallback(
        debounce((email: string) => {
            fetchIsEmailAvailable(email);
        }, 1500),
        [],
    );

    // handle the email change & check email after delay
    useChange(() => {
        setIsEmailCheckFetching(true);
        if (!email) return;
        fetchDelay(email);
    }, [email]);

    // React.useEffect(() => {
    // checkEmailAvailability({
    //     email: 'palianycia@seznam.cz',
    // });
    // setError('email', { message: t('register.emailNotUnique') });
    // }, [email]);

    return (
        <AnonymousLayout>
            <Box maxWidth="xs" sx={{ paddingX: 3 }}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LogoSquareIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t('register.form.signUp')}
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="firstName" fullWidth label={t('register.form.firstName')} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="lastName" fullWidth label={t('register.form.lastName')} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="email"
                                            label={t('register.form.email')}
                                            fullWidth
                                            isLoading={isEmailCheckFetching}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="password"
                                            type="password"
                                            label={t('register.form.password')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    {t('register.form.signUp')}
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to={config.routes.login}>
                                            <Typography variant="subtitle2" color="primary" sx={{ color: '#1770ff' }}>
                                                {t('register.form.signIn')}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        {/* <Copyright sx={{ mt: 5 }} /> */}
                    </form>
                </FormProvider>
            </Box>
        </AnonymousLayout>
    );
};
{
    /* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */
}
