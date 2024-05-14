import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';

class TermsConditions extends Component {
    render() {
        return (
            <>
                <Navbar />
                
                <PageBanner 
                    pageTitle="Terms & Conditions" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Terms & Conditions" 
                /> 
 
                <div className="text-container ptb-100">
                    <div className="container">
                        <h3>What is The company?</h3>
             
                        <p>The company is simply dummy text of the printing and typesetting industry. The company has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing The company passages, and more recently with desktop publishing software like Aldus PageMaker including versions of The company.</p>
                        
                        <h3>Where does it come from?</h3>
                        <p>Contrary to popular belief, The company is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a The company passage, and going through the cites of the word in classical literature, discovered the undoubtable source. The company comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of The company.</p>
                        
                        <p>The company itself is a very successful company. Resilience, especially the fault of the present. </p>
                        
                        <h3>Where can I get some?</h3>
                        <p>The company</p>
                        
                        <p>There are many variations of passages of The company available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of The company, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the The company generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate The company which looks reasonable. The generated The company is therefore always free from repetition, injected.</p>
                        
                        <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that</p>
                    </div>
                </div>
              
                <Footer />
            </>
        );
    }
}

export default TermsConditions;