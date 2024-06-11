import React from 'react';
// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import MailIcon from '@mui/icons-material/Mail';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import { useGetMeQuery } from 'core/api';
import { useAuth } from 'core/auth';
import { AUTH_ROLE } from 'core/auth/types';
import { Toast } from 'modules/ui';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header';

import styles from './Page.module.scss';

export const Page = () => {
    const { user } = useAuth();
    useGetMeQuery(null);

    // const [open, setOpen] = useState(true);

    // const toggleDrawer = (newOpen: boolean) => () => {
    //     setOpen(newOpen);
    // };

    // const DrawerList = (
    //     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    //         <List>
    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem key={text} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                         <ListItemText primary={text} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem key={text} disablePadding>
    //                     <ListItemButton>
    //                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                         <ListItemText primary={text} />
    //                     </ListItemButton>
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </Box>
    // );

    return (
        <>
            <div className={styles.page}>
                {/* {user?.role === AUTH_ROLE['admin'] ? (
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                ) : ( */}
                <Header />
                {/* )} */}
                <Outlet />
                <Toast />
                {user?.role !== AUTH_ROLE['admin'] && <Footer />}
            </div>
        </>
    );
};
