import React, { Component } from 'react';
import Link from 'next/link';

class ProductosByCorp extends Component {
    render() {
        return (
            <section className="features-area features-area-inner-style ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                            <i className="bx bxl-android"></i>
                                <h3>Android App</h3>
                                <p>StepsV2 for Android, with real time camera image scanner and voice recognition.</p>
                                
                                <a href='https://play.google.com/store/apps/details?id=com.adonaysoft.stepsV2' className="read-more-icon">
                                    <span className="flaticon-right-arrow"></span>
                                </a>                                
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                            <i className="bx bxl-apple"></i>
                                <h3>iOS</h3>
                                <p>Coming son... </p>
                                <br />                                
                                                                
                                <a className="read-more-icon">
                                    <span className="flaticon-right-arrow"></span>
                                </a>                                
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="bx bx-navigation"></i>
                                <h3>Steps Web</h3>
                                <p>Steps widget for Web browsers, same code from mobile app without image OCR and voice recognition.</p>
                                
                                <Link href="/steps">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        {/*<div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="flaticon-technical-support"></i>
                                <h3>Safe Security</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="flaticon-shield"></i>
                                <h3>Technical Support</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="flaticon-success"></i>
                                <h3>Live Support</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="flaticon-machine-learning"></i>
                                <h3>Heavy Industry</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-features">
                                <i className="flaticon-artificial-intelligence"></i>
                                <h3>Transportation</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0">
                            <div className="single-features">
                                <i className="flaticon-health"></i>
                                <h3>Health Care</h3>
                                <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                <Link href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="page-navigation-area">
                                <nav aria-label="Page navigation example text-center">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <Link href="#">
                                                <a className="page-link page-links">
                                                    <i className='bx bx-chevrons-left'></i>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className="page-item active">
                                            <Link href="#">
                                                <a className="page-link">1</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link href="#">
                                                <a className="page-link">2</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link href="#">
                                                <a className="page-link">3</a>
                                            </Link>
                                        </li>

                                        <li className="page-item">
                                            <Link href="#">
                                                <a className="page-link">
                                                    <i className='bx bx-chevrons-right'></i>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </section>
        );
    }
}

export default ProductosByCorp;