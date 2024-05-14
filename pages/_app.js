import '../styles/bootstrap.min.css';
import 'animate.css'
import '../styles/boxicons.min.css';
import '../styles/flaticon.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import "swiper/css";
import "swiper/css/bundle";

// Global styles
import '../styles/style.css';
import '../styles/responsive.css';

import App from 'next/app';
import Head from 'next/head';
import Loader from '../components/Shared/Loader';
import GoTop from '../components/Shared/GoTop';
import { NextUIProvider } from '@nextui-org/react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import moment from "moment"
moment.locale('es-mx');
export default class MyApp extends App {

    // Preloader
    state = {
        loading: true
    };
    componentDidMount() {
        this.timerHandle = setTimeout(() => this.setState({ loading: false }), 2000); 
    }
    componentWillUnmount() {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    }
    
    render () {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head>
                <script async={true} src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7985129500022152"
                  crossOrigin='anonymous' ></script>
                <link href='/steps/css/bootstrap.css' rel='stylesheet' />
                <script type='text/javascript' src='/steps/MathJax/MathJax.js?config=AM_HTMLorMML'></script>
                <script type='text/javascript'
                        src='/steps/jQuery/jquery-3.5.0.min.js'></script>
                <script type='text/javascript'
                        src='/steps/jQuery/svg.js'></script>
                <script type='text/javascript' src='/steps/jQuery/svg.filter.js'></script>
                <script type='text/javascript' src='/steps/jQuery/setBSVG.js'></script>
                <script type='text/javascript' src='/steps/jQuery/showCardDiv.js'></script>
                <script type='text/javascript' src='/steps/jQuery/showCardFor.js'></script>
                <script type='text/javascript' src='/steps/jQuery/evalMatrix.js'></script>
                <script type='text/javascript' src='/steps/jQuery/matrixModal.js'></script>
                
                    <meta 
                        name="viewport" 
                        content="width=device-width, initial-scale=1" 
                    />
                    <title>INTERRED</title>
                </Head>
                
                {/* Preloader */}
                <Loader loading={this.state.loading} />
                <NextUIProvider>
                    <SSRProvider>
                        <Component {...pageProps} />
                    </SSRProvider>
                </NextUIProvider>
                
                

                {/* Go Top Button */}
                <GoTop scrollStepInPx="100" delayInMs="10.50" />
            </>
        );
    }
}