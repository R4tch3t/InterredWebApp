import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import ProductsByCorp from '../components/Products/ProductsByCorp';
import Footer from '../components/Layouts/Footer';

class Products extends Component {
    render() {
        return (
            <>
                <Navbar />

                <PageBanner 
                    pageTitle="Products by INTERRED" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Products" 
                /> 

                <ProductsByCorp />
                
                <Footer />
            </>
        );
    }
}

export default Products;