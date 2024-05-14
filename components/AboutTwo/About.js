import React, { Component } from 'react';
import Link from 'next/link';

class About extends Component {
    render() {
        return (
            <section className="about-area pt-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img src="/images/about-img-three.png" alt="Image" />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="about-content">
                                <span>About Us</span>
                                <h2>We Complete Every Project With Extra Care As Customer Need</h2>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present.</p>
                               
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6">
                                        <ul>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                Advanced caching
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                Unlimited  applications
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                HTML5 views designed
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <ul>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                Javascript, JQuery and NodeJS core base
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                24/7 Free extra support
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                Optimized stack
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <Link href="/about">
                                    <a className="default-btn">
                                        Learn More
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;