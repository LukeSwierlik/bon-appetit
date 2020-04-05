import React from 'react';

export const Title = (props) => {
    return (
        <section className="section-pagetop bg">
            <div className="container">
                <h2 className="title-page">{ props.title }</h2>
            </div>
        </section>
    )
};
