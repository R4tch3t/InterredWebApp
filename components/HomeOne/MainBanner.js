import React from 'react';
import Link from 'next/link';

const MainBanner = () => {
    return (
        <section className="main-banner-area main-banner-area-one">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-text">
                            <h1>interred</h1>
                            <p>Compañia dedicada a la instalación de internet, fichas de internet y mantenimiento de redes. </p>	

                            <div className="banner-btn">
                                <Link href="/steps">
                                    <a className="default-btn">
                                        Adquirir servicio
                                    </a>
                                </Link>

                                {/*<Link href="/contact" aria-disabled={true} >*/}
                                    <a className="primary-btn">
                                      Contactar
                                    </a>
                                {/*</Link>*/}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        {/* Main Image */}
                        <div className="banner-main-img banner-one-main-img">
                            <img 
                                style={{borderRadius: 10}} 
                                src="/images/home-one/main-img1.png" alt="Image" />
                        </div>

                        {/* Banner Shape Images */}
                        <div className="banner-img">
                            <img 
                                className="animate__animated animate__fadeInUp animate__fast" 
                                src="/images/home-one/shape1.png" 
                                alt="Image" 
                            />
                            <img 

                                className="animate__animated animate__fadeInUp animate__fast" 
                                src="/images/home-one/shape2.jpg" 
                                alt="Image" 
                            /> 
                            <img 
                                className="animate__animated animate__fadeInRight animate__fast" 
                                src="/images/home-one/shape3.png" 
                                alt="Image" 
                            />
                            <img 
                                className="animate__animated animate__fadeInDown animate__fast" 
                                src="/images/home-one/shape4.jpg" 
                                alt="Image" 
                            />
                        </div>
                    </div>
                </div>
            </div> 

            {/* Shape Images */}
            <div className="over-shape">
                <img src="/images/home-one/shape/animate1.png" alt="Image" />
                <img src="/images/home-one/shape/animate2.png" alt="Image" />
                <img src="/images/home-one/shape/animate3.png" alt="Image" />
            </div>

            <div className="white-shape">
                <img src="/images/home-one/bottom-shape.png" alt="Image" />
            </div>
        </section>
    )
}

export default MainBanner;