import React from 'react';
import heroBackground from '../../assets/hero-website-6.jpg';

export const Hero = () => {
    return (
        <section className="section-intro">
            <div className="intro-banner-wrap">
                <img src={heroBackground} className="w-100 img-fluid" />
            </div>
        </section>
    )
};
