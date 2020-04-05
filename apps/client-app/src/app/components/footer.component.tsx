import React from 'react';

export const Footer = () => {
    return (
        <footer className="section-footer border-top">
            <div className="container">
                <section className="footer-top padding-y">
                    <div className="row">
                        <aside className="col-md col-6">
                            <h6 className="title">Brands</h6>
                            <ul className="list-unstyled">
                                <li><a href="#">Adidas</a></li>
                                <li><a href="#">Puma</a></li>
                                <li><a href="#">Reebok</a></li>
                                <li><a href="#">Nike</a></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h6 className="title">Company</h6>
                            <ul className="list-unstyled">
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Career</a></li>
                                <li><a href="#">Find a store</a></li>
                                <li><a href="#">Rules and terms</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h6 className="title">Help</h6>
                            <ul className="list-unstyled">
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Money refund</a></li>
                                <li><a href="#">Order status</a></li>
                                <li><a href="#">Shipping info</a></li>
                                <li><a href="#">Open dispute</a></li>
                            </ul>
                        </aside>
                        <aside className="col-md col-6">
                            <h6 className="title">Account</h6>
                            <ul className="list-unstyled">
                                <li><a href="#"> User Login </a></li>
                                <li><a href="#"> User register </a></li>
                                <li><a href="#"> Account Setting </a></li>
                                <li><a href="#"> My Orders </a></li>
                            </ul>
                        </aside>
                        <aside className="col-md">
                            <h6 className="title">Social</h6>
                            <ul className="list-unstyled">
                                <li><a href="#"> <i className="fab fa-facebook"/> Facebook </a></li>
                                <li><a href="#"> <i className="fab fa-twitter"/> Twitter </a></li>
                                <li><a href="#"> <i className="fab fa-instagram"/> Instagram </a></li>
                                <li><a href="#"> <i className="fab fa-youtube"/> Youtube </a></li>
                            </ul>
                        </aside>
                    </div>
                </section>

                <section className="footer-bottom border-top row">
                    <div className="col-md-2">
                        <p className="text-muted"> © 2019 Company name </p>
                    </div>
                    <div className="col-md-8 text-md-center">
                        <span className="px-2">info@pixsellz.io</span>
                        <span className="px-2">+879-332-9375</span>
                        <span className="px-2">Street name 123, Avanue abc</span>
                    </div>
                    <div className="col-md-2 text-md-right text-muted">
                        <i className="fab fa-lg fa-cc-visa"/>
                        <i className="fab fa-lg fa-cc-paypal"/>
                        <i className="fab fa-lg fa-cc-mastercard"/>
                    </div>
                </section>
            </div>
        </footer>
    )
};
