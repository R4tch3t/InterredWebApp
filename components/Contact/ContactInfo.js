import React, { Component } from 'react';

class ContactInfo extends Component {
    render() {
        return (
            <div className="contact-info-area pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-contact-info">
                                <i className="bx bx-envelope"></i>
                                <h3>Email Us:</h3>
                                <p><a href="mailto:08083206@uagro.mx">08083206@uagro.mx</a></p>
                                {/*<p><a href="mailto:info@jumpx.com">info@jumpx.com</a></p>*/}
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-contact-info">
                                <i className="bx bx-phone-call"></i>
                                <h3>Call Us:</h3>
                                <p>Tel. + <a href="tel:527471027244">(52) 747-102-72-44</a></p>
                                {/*<p>Tel. + <a href="tel:12415235679874">(124) 1523-567-9874</a></p>*/}
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-contact-info">
                                <i className="bx bx-location-plus"></i>
                                <h3>México</h3>
                                <p>Av. Los Gobernadores N° 48, Col. Milpizaco, Privada Real de Chilpancingo, Casa 30, Guerrero</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="single-contact-info">
                                <i className="bx bx-support"></i>
                                <h3>Live Chat</h3>
                                <p>Coming soon...</p>
                                {/*<p>live chat all the time with our company 24/7</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactInfo;