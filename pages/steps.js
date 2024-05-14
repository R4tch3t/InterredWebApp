import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import Steps from '../components/Steps';
import Footer from '../components/Layouts/Footer';

class About1 extends Component {
    render() {
        return (
            <>
                <Navbar />

                <Steps 
                    pageTitle="Steps" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Steps" 
                />

                {/*<About />

                <MakeYourBusiness />

                <Testimonials />

                <TeamTwo />

                <div className="pb-50">
                    <Partner />
                </div>*/}
                
                <Footer />
            </>
        );
    }
}

export default About1;