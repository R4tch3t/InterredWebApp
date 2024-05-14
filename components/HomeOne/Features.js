import Link from 'next/link'

const Features = () => {
        return (
            <div className="features-area pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 p-0">
                            <div className="single-features">
                                <i className="bx bx-signal-3"></i>
                                <h3>30 Megas</h3>
                                <p>Adquiere el paquete de 30 Megas, por 300 pesos al mes.</p>

                                {/*<Link href="/service-details">*/}
                                    <a href='https://play.google.com/store/apps/details?id=com.adonaysoft.stepsV2' className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                {/*</Link>*/}
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 p-0">
                            <div className="single-features">
                                <i className="bx bx-signal-4"></i>
                                <h3>50 Megas</h3>
                                <p>Adquiere el paquete de 50 Megas, por 500 pesos al mes. </p>
                                <br />                                
                                
                                {/*<Link href="/service-details">*/}
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                {/*</Link>*/}
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0 p-0">
                            <div className="single-features">
                                <i className="bx bx-signal-5"></i>
                                <h3>100 Megas</h3>
                                <p>Adquiere el paquete de 100 Megas, por 600 pesos al mes. </p>
                                
                                <Link href="/steps">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Features;