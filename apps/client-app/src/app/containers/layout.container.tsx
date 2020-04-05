import React from 'react';
import { Content } from '../components/content.component';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';

export const Layout = (props) => {
    console.log('layout props', props);

    return (
        <>
            <Header />

            <Content children={props.children} />

            <Footer />
        </>
    )
};
