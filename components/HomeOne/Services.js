import Link from 'next/link'

const Services = () => {
    
    return (
        <section className="offer-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span>Services</span>
                    <h2>Our Professional Services For You</h2>
                    <p>Adonay Industries is offering the next Services.</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-chip"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Robotics & Drones</a>
                                </Link>
                            </h3>
                            <p>Starting research with IA library and API's.</p>                            
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-vr"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Math and Education</a>
                                </Link>
                            </h3>
                            <p>The company is specially in the Math process.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-blockchain"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Blockchain Project</a>
                                </Link>
                            </h3>
                            <p>Adonay Industries can develop Blockchain Projects based.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-target"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Image Processing</a>
                                </Link>
                            </h3>
                            <p>Can process images with 3 Thrd APIS.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-choice"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Order Management</a>
                                </Link>
                            </h3>
                            <p>Assistant for order project or product by Adonay Industries.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-offer">
                            <i className="flaticon-deep-learning"></i>
                            <h3>
                                <Link href="/service-details">
                                    <a>Machine Learning</a>
                                </Link>
                            </h3>
                            <p>Investigation in IA process.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="offer-shape">
                <img src="/images/shape/services-shape/1.png" alt="Image" />
                <img src="/images/shape/services-shape/2.png" alt="Image" />
                <img src="/images/shape/services-shape/3.png" alt="Image" />
                <img src="/images/shape/services-shape/4.png" alt="Image" />
                <img src="/images/shape/services-shape/5.png" alt="Image" />
                <img src="/images/shape/services-shape/6.png" alt="Image" />
            </div>
        </section>
    )
}

export default Services;