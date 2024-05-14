import React, { Component } from 'react';
import Link from 'next/link';

class ServiceSidebar extends Component {
    render() {
        return (
            <div className="service-sidebar-area">
                <div className="service-list">
                    <h3 className="service-details-title">Facilities</h3>
                    <ul>
                        <li>
                            <Link href="/service-details">
                                <a>
                                    Technology
                                    <i className='bx bx-check'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/service-details">
                                <a>
                                    Tips
                                    <i className='bx bx-check'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/service-details">
                                <a>
                                    AI & IT
                                    <i className='bx bx-check'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/service-details">
                                <a>
                                    Solution
                                    <i className='bx bx-check'></i>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="service-list">
                    <h3 className="service-details-title">Contact Info</h3>
                    <ul>
                        <li>
                            +52 747 102 7244
                            <i className='bx bx-phone-call bx-rotate-270'></i>
                        </li>
                        <li>
                            08083206@@uagro.mx
                            <i className='bx bx-envelope'></i>
                        </li>
                        <li>
                            Av. Los Gobernadores N 48, Col. Milpizaco, Gro. México
                            <i className='bx bx-location-plus'></i>
                        </li>
                        <li>
                            9:00 AM – 9:00 PM
                            <i className='bx bx-time'></i>
                        </li>
                    </ul>
                </div>

                {/*<div className="service-list">
                    <h3 className="service-details-title">Download Brochures</h3>
                    <ul>
                        <li>
                            <Link href="#">
                                <a>
                                    PDF File (1)
                                    <i className='bx bxs-cloud-download'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    PDF File (2)
                                    <i className='bx bxs-cloud-download'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    PDF File (3)
                                    <i className='bx bxs-cloud-download'></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>
                                    PDF File (4)
                                    <i className='bx bxs-cloud-download'></i>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>*/}
            </div>
        );
    }
}

export default ServiceSidebar;