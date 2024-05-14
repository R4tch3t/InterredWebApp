import React, { Component } from 'react';
import ServiceSidebar from './ServiceSidebar';
import AskQuestionForm from './AskQuestionForm';

class ServiceDetailsContent extends Component {
    render() {
        return (
            <section className="service-details-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="service-details-wrap">
                                <div className="service-img">
                                    <img src="/images/services-details/services-details.jpg" alt="Image" />
                                </div>

                                <h3>Service Of System Design</h3>
                                <p>This company offers the design and creation of systems made through the most popular Frameworks..</p>

                                <p>The resulting products are highly professional and it is always at the forefront of change updating Framework dependencies.</p>

                                <p>We can build in the language or framework that the client requests, we can also recommend with respect to what is requested.</p>

                                <div className="car-service-list-wrap">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="service-list-img">
                                                <img src="/images/services-details/services-details2.png" alt="Image" />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                            <div className="car-service-list">
                                                <ul>
                                                    <li>
                                                        <i className='bx bx-check'></i>
                                                        Creation and design of database
                                                    </li>
                                                    <li>
                                                        <i className='bx bx-check'></i>
                                                        Creation and design of computer systems
                                                    </li>
                                                    <li>
                                                        <i className='bx bx-check'></i>
                                                        Framework management
                                                    </li>
                                                    <li>
                                                        <i className='bx bx-check'></i>
                                                        Optimizing processes
                                                    </li>
                                                    <li>
                                                        <i className='bx bx-check'></i>
                                                        Maintenance of completed projects
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <AskQuestionForm />
                            </div>
                        </div>


                        <div className="col-lg-4">
                            <ServiceSidebar />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServiceDetailsContent;