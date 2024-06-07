import React from 'react';
import { CssBaseline } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { LogoSquareIcon } from 'assets/icons';
import { useLazyRegisterUserQuery } from 'core/api';
import { TextField } from 'modules/form';
import { AnonymousLayout } from 'modules/layout';

// import { useLazyGetEmailAvailabilityQuery } from 'pages/UserTablePage';
import { config } from '../../../../config/index';
import { useDocumentTitle } from '../../../application/hooks/useDocumentTitle';
import { RegisterForm } from './types';
import { registerFormSchema } from './types/index';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const RegisterPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.register'));

    // const [checkEmailAvailability] = useLazyGetEmailAvailabilityQuery();
    const [registerUser] = useLazyRegisterUserQuery();

    const formDefaultValues = {
        firstName: 'Yuriy',
        lastName: 'Pereginyak',
        email: 'palianycia@seznam.cz',
        password: '12345678',
    };

    const methods = useForm<RegisterForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(registerFormSchema(t)),
    });
    const { handleSubmit } = methods;

    const onSubmit = async (formData: RegisterForm) => {
        try {
            await registerUser({ data: formData }).unwrap();
            toast.success(t('register.success'));
        } catch (error) {
            toast.error(t('register.error'));
        }
    };

    // React.useEffect(() => {
    //     checkEmailAvailability({
    //         email: 'palianycia@seznam.cz',
    //     });
    // }, []);

    return (
        <AnonymousLayout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                                        <TextField name="firstName" label={t('register.form.firstName')} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="lastName" label={t('register.form.lastName')} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name="email" label={t('register.form.email')} fullWidth />
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
                                        <Link href={config.routes.login} variant="body2">
                                            {t('register.form.signIn')}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </form>
                </FormProvider>
            </Container>
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
