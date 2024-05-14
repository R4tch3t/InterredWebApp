import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';

class PrivacyPolicy extends Component {
    render() {
        return (
            <>
                <Navbar />
                
                <PageBanner 
                    pageTitle="Privacy Policy" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Privacy Policy" 
                /> 
 
                <div className="text-container ptb-100">
                    <div className="container">
                        <h3>Privacy Policy of <b>Steps</b></h3>
                        <p style={{marginTop: -15}} >This Application collects some Personal Data from its Users.</p>
                        <p>
                          This document has a section dedicated to Californian consumers and their privacy rights.<br></br>
                          This document can be printed for reference by using the print command in the settings of any browser.
                        </p>
                        <h3>Personal Data collected for the following purposes and using the following services:</h3>
                        <div style={{marginTop: -15}} >
                          Analytics:<br></br>
                          <ul>
                            <li>
                              <span style={{fontStyle: 'italic'}}>Google Analytics for Firebase </span><br></br>
                              Personal Data: Usage Data.
                            </li>
                          </ul>
                          Hosting and backend infrastructure:<br></br>
                          <ul>
                            <li>
                              <span style={{fontStyle: 'italic'}}>Firebase Cloud Functions </span><br></br>
                              Personal Data: Usage Data; various types of Data as specified in the privacy policy of the service.
                            </li>
                          </ul>
                        </div>
                        
                        <h3>
                          Owner and Data Controller
                        </h3>
                        <h3>Types of Data collected</h3>
                        <p style={{marginTop: -15}} >
                         Among the types of Personal Data that this Application collects, by itself or through third parties, there are: Usage Data.
                         Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.<br></br>
                         Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application.<br></br>
                         Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.<br></br>
                         Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.<br></br>
                         Any use of Cookies - or of other tracking tools - by this Application or by the owners of third-party services used by this Application serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available.<br></br>
                         Users are responsible for any third-party Personal Data obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner.
                        </p>
                        <h3>Mode and place of processing the Data</h3>
                        <h3>Methods of processing</h3>
                        <p style={{marginTop: -15}} >
                          The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.<br></br>
                          The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.
                        </p>
                        <h3>
                          Legal basis of processing
                        </h3>
                        <div style={{marginTop: -15}} >
                           The Owner may process Personal Data relating to Users if one of the following applies:
                           <ul>
                            <li>
                              Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner may be allowed to process Personal Data until the User objects to such processing (“opt-out”), without having to rely on consent or any other of the following legal bases. This, however, does not apply, whenever the processing of Personal Data is subject to European data protection law;
                            </li>
                            <li>
                              provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;
                            </li>
                            <li>
                              processing is necessary for compliance with a legal obligation to which the Owner is subject;
                            </li>
                            <li>
                              processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;
                            </li>
                            <li>
                              processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.
                            </li>
                           </ul>
                           <div style={{marginTop: -15}} >In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</div>
                        </div>
                        <br></br>
                        <h3>Place</h3>
                        <div style={{marginTop: -15}} >The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.</div><br></br>
                        <div>Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data.</div>
                        <div>Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.</div><br></br>
                        <div>If any such transfer takes place, Users can find out more by checking the relevant sections of this document or inquire with the Owner using the information provided in the contact section.</div>
                        <br></br>

                        <h3>Retention time</h3>
                        <div style={{marginTop: -15}} >Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.</div>
                        <div>Therefore:</div>
                        <div>
                            <ul>
                                <li>
                                  Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.
                                </li>
                                <li>
                                Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within the relevant sections of this document or by contacting the Owner.
                                </li>
                            </ul>
                        </div>
                        <div>
                           The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority.
                        </div>
                        <br></br>
                        <div>
                        Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.
                        </div>

                        <br></br>
                        <h3>The purposes of processing</h3>
                        <div style={{marginTop: -15}} >The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or third parties), detect any malicious or fraudulent activity, as well as the following: Analytics and Hosting and backend infrastructure.
                           For specific information about the Personal Data used for each purpose, the User may refer to the section “Detailed information on the processing of Personal Data”.</div>
                        <br></br>
                        <h3>Detailed information on the processing of Personal Data</h3>
                        <div style={{marginTop: -15}} >Personal Data is collected for the following purposes and using the following services:</div> 

                        <br></br>
                        <h3>Analytics</h3>
                        <div style={{marginTop: -15}} >The services contained in this section enable the Owner to monitor and analyze web traffic and can be used to keep track of User behavior.</div>
                        <br></br>

                        <h3>Google Analytics for Firebase (Google LLC)</h3>
                        <div style={{marginTop: -15}} >Google Analytics for Firebase or Firebase Analytics is an analytics service provided by Google LLC.<br></br>
                           <b>In order to understand Google's use of Data, consult</b> <span style={{textDecorationLine: 'underline'}} >Google's partner policy.</span></div>
                        <br></br>
                        <div>Firebase Analytics may share Data with other tools provided by Firebase, such as Crash Reporting, Authentication, Remote Config or Notifications. The User may check this privacy policy to find a detailed explanation about the other tools used by the Owner.</div>   
                        <br></br>
                        <div>This Application uses identifiers for mobile devices and technologies similar to cookies to run the Firebase Analytics service.</div>
                        <br></br>
                        <div>Users may opt-out of certain Firebase features through applicable device settings, such as the device advertising settings for mobile phones or by following the instructions in other Firebase related sections of this privacy policy, if available.</div>
                        <div>Personal Data processed: Usage Data.</div>
                        <div>Place of processing: United States - <span style={{textDecorationLine: 'underline'}} >Privacy Policy.</span> Privacy Shield participant.</div>
                        <div>Category of personal data collected according to CCPA: internet information.</div>
                        <div>This processing constitutes a sale based on the definition under the CCPA. In addition to the information in this clause, the User can find information regarding how to opt out of the sale in the section detailing the rights of Californian consumers.</div>

                        <br></br>
                        <h3>Hosting and backend infrastructure</h3>
                        <div style={{marginTop: -15}} >
                          This type of service has the purpose of hosting Data and files that enable this Application to run and be distributed as well as to provide a ready-made infrastructure to run specific features or parts of this Application.
                        </div>
                        <div>Some services among those listed below, if any, may work through geographically distributed servers, making it difficult to determine the actual location where the Personal Data are stored.</div>

                        <br></br>
                        <h4>Firebase Cloud Functions (Google LLC)</h4>
                        <div style={{marginTop: -15}} >
                          Firebase Cloud Functions is a hosting and backend service provided by Google LLC.                        
                        </div>
                        <div>
                          Personal Data processed: Usage Data; various types of Data as specified in the privacy policy of the service.
                        </div>
                        <div>
                          Place of processing: United States - <span style={{textDecorationLine: 'underline'}} >Privacy Policy.</span> Privacy Shield participant.
                        </div>
                        <div>Category of personal data collected according to CCPA: internet information.</div>

                        <br></br>
                        <h3>The rights of Users</h3>
                        <div style={{marginTop: -15}} >
                           Users may exercise certain rights regarding their Data processed by the Owner.
                        </div>
                        <div>
                           In particular, Users have the right to do the following:
                           <ul>
                              <li>
                                Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.
                              </li>
                              <li>
                                Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent. Further details are provided in the dedicated section below.
                              </li>
                              <li>
                                Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.
                              </li>
                              <li>
                                Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.
                              </li>
                              <li>
                                Restrict the processing of their Data. Users have the right, under certain circumstances, to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.
                              </li>
                              <li>
                                Have their Personal Data deleted or otherwise removed. Users have the right, under certain circumstances, to obtain the erasure of their Data from the Owner.
                              </li>
                              <li>
                                Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that the Data is processed by automated means and that the processing is based on the User's consent, on a contract which the User is part of or on pre-contractual obligations thereof.
                              </li>
                              <li>
                                Lodge a complaint. Users have the right to bring a claim before their competent data protection authority.
                              </li>
                           </ul>
                        </div>

                        <br></br>
                        <h4>Details about the right to object to processing</h4>
                        <div style={{marginTop: -15}} >
                          Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection.
                        </div>
                        <div>
                          Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time without providing any justification. To learn, whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document.
                        </div>

                        <br></br>
                        <h4>How to exercise these rights</h4>
                        <div style={{marginTop: -15}} >
                          Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month.
                        </div>

                        <br></br>
                        <h3>Additional information about Data collection and processing</h3>
                        <br></br>

                        <h4>Legal action</h4>
                        <div style={{marginTop: -15}} >
                          The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising from improper use of this Application or the related Services.
                        </div>
                        <div>
                          The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.
                        </div>

                        <br></br>
                        <h4>Additional information about User's Personal Data</h4>
                        <div style={{marginTop: -15}} >
                          In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular Services or the collection and processing of Personal Data upon request.
                        </div>

                        <br></br>
                        <h4>System logs and maintenance</h4>
                        <div style={{marginTop: -15}} >
                          For operation and maintenance purposes, this Application and any third-party services may collect files that record interaction with this Application (System logs) use other Personal Data (such as the IP Address) for this purpose.
                        </div>

                        <br></br>
                        <h4>Information not contained in this policy</h4>
                        <div style={{marginTop: -15}} >
                          More details concerning the collection or processing of Personal Data may be requested from the Owner at any time. Please see the contact information at the beginning of this document.
                        </div>

                        <br></br>
                        <h4>How "Do Not Track" requests are handled</h4>
                        <div style={{marginTop: -15}} >
                          This Application does not support "Do Not Track" requests.
                        </div>
                        <div>
                          To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please read their privacy policies.
                        </div>

                        <br></br>
                        <h4>Changes to this privacy policy</h4>
                        <div style={{marginTop: -15}} >
                          The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on this page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom.
                        </div>
                        <br></br>
                        <div>Should the changes affect processing activities performed on the basis of the User's consent, the Owner shall collect new consent from the User, where required.</div>
                        
                        <br></br>
                        <h3>Information for Californian consumers</h3>
                        <div style={{marginTop: -15}} >
                          This part of the document integrates with and supplements the information contained in the rest of the privacy policy and is provided by the business running this Application and, if the case may be, its parent, subsidiaries and affiliates (for the purposes of this section referred to collectively as "we", "us", "our").
                        </div>
                        <div>
                          The provisions contained in this section apply to all Users who are consumers residing in the state of California, United States of America, according to "The California Consumer Privacy Act of 2018" (Users are referred to below, simply as "you", "your", "yours"), and, for such consumers, these provisions supersede any other possibly divergent or conflicting provisions contained in the privacy policy.
                        </div>
                        <div>
                          This part of the document uses the term "personal information" as it is defined in The California Consumer Privacy Act (CCPA).
                        </div>
                        
                        <br></br>
                        <h4>Categories of personal information collected, disclosed or sold</h4>
                        <div style={{marginTop: -15}} >
                          In this section we summarize the categories of personal information that we've collected, disclosed or sold and the purposes thereof. <b>You can read about these activities in detail in the section titled "Detailed information on the processing of Personal Data" within this document.</b>
                        </div>

                        <br></br>
                        <h4>Information we collect: the categories of personal information we collect</h4>

                        <br></br>
                        <div>We have collected the following categories of personal information about you: internet information.</div>
                        <div>We will not collect additional categories of personal information without notifying you.</div>

                        <br></br>
                        <h4>How we collect information: what are the sources of the personal information we collect?</h4>

                        <br></br>
                        <div>We collect the above mentioned categories of personal information, either directly or indirectly, from you when you use this Application.</div>
                        <div>For example, you directly provide your personal information when you submit requests via any forms on this Application. </div>
                        <div>You also provide personal information indirectly when you navigate this Application, as personal information about you is automatically observed and collected. Finally, we may collect your personal information from third parties that work with us in connection with the Service or with the functioning of this Application and features thereof.</div>

                        <br></br>
                        <h4>How we use the information we collect: sharing and disclosing of your personal information with third parties for a business purpose</h4>
                        <br></br>
                        <div>We may disclose the personal information we collect about you to a third party for business purposes. In this case, we enter a written agreement with such third party that requires the recipient to both keep the personal information confidential and not use it for any purpose(s) other than those necessary for the performance of the agreement.</div>
                        <div>We may also disclose your personal information to third parties when you explicitly ask or authorize us to do so, in order to provide you with our Service.</div>
                        <div>To find out more about the purposes of processing, please refer to the relevant section of this document.</div>

                        <br></br>
                        <h4>Sale of your personal information</h4>

                        <br></br>
                        <div>If you'd like to know more, or exercise your right to opt out in regard to all the sales carried out by this Application, both online and offline, you can contact us for further information using the contact details provided in this document.</div>

                        <br></br>
                        <h4>What are the purposes for which we use your personal information?</h4>

                        <br></br>
                        <div>We may use your personal information to allow the operational functioning of this Application and features thereof ("business purposes"). In such cases, your personal information will be processed in a fashion necessary and proportionate to the business purpose for which it was collected, and strictly within the limits of compatible operational purposes.</div>
                        <div>We may also use your personal information for other reasons such as for commercial purposes (as indicated within the section “Detailed information on the processing of Personal Data” within this document), as well as for complying with the law and defending our rights before the competent authorities where our rights and interests are threatened or we suffer an actual damage.</div>
                        <div>We will not use your personal information for different, unrelated, or incompatible purposes without notifying you.</div>

                        <br></br>
                        <h4>Your California privacy rights and how to exercise them</h4>

                        <br></br>
                        <h4>The right to know and to portability</h4>

                        <br></br>
                        <div>
                          You have the right to request that we disclose to you:
                          <ul>
                            <li>
                              the categories and sources of the personal information that we collect about you, the purposes for which we use your information and with whom such information is shared;
                            </li>
                            <li>
                              in case of sale of personal information or disclosure for a business purpose, two separate lists where we disclose:
                              <ul>
                                <li>
                                  for sales, the personal information categories purchased by each category of recipient; and
                                </li>
                                <li>
                                  for disclosures for a business purpose, the personal information categories obtained by each category of recipient.
                                </li>
                              </ul>
                            </li>
                          </ul>
                          The disclosure described above will be limited to the personal information collected or used over the past 12 months.
                          <div>
                            If we deliver our response electronically, the information enclosed will be "portable", i.e. delivered in an easily usable format to enable you to transmit the information to another entity without hindrance - provided that this is technically feasible.
                          </div>
                        </div>

                        <br></br>
                        <h4>The right to request the deletion of your personal information</h4>
                        <br></br>
                        <div>You have the right to request that we delete any of your personal information, subject to exceptions set forth by the law (such as, including but not limited to, where the information is used to identify and repair errors on this Application, to detect security incidents and protect against fraudulent or illegal activities, to exercise certain rights etc.).</div>
                        <div>If no legal exception applies, as a result of exercising your right, we will delete your personal information and direct any of our service providers to do so.</div>

                        <br></br>
                        <h4>How to exercise your rights</h4>

                        <br></br>
                        <div>To exercise the rights described above, you need to submit your verifiable request to us by contacting us via the details provided in this document.</div>
                        <div>
                          For us to respond to your request, it's necessary that we know who you are. Therefore, you can only exercise the above rights by making a verifiable request which must:
                          <ul>
                            <li>
                            provide sufficient information that allows us to reasonably verify you are the person about whom we collected personal information or an authorized representative;
                            </li>
                            <li>
                            describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.
                            </li>
                          </ul>
                        </div>
                        <div>
                          We will not respond to any request if we are unable to verify your identity and therefore confirm the personal information in our possession actually relates to you.
                        </div>
                        <div>
                          If you cannot personally submit a verifiable request, you can authorize a person registered with the California Secretary of State to act on your behalf.
                        </div>
                        <div>
                          If you are an adult, you can make a verifiable request on behalf of a minor under your parental authority.
                        </div>
                        <div>
                          You can submit a maximum number of 2 requests over a period of 12 months.
                        </div>

                        <br></br>
                        <h4>How and when we are expected to handle your request</h4>

                        <br></br>
                        <div>We will confirm receipt of your verifiable request within 10 days and provide information about how we will process your request.</div>
                        <div>We will respond to your request within 45 days of its receipt. Should we need more time, we will explain to you the reasons why, and how much more time we need. In this regard, please note that we may take up to 90 days to fulfill your request.
                          Our disclosure(s) will cover the preceding 12 month period.</div>
                        <div>Should we deny your request, we will explain you the reasons behind our denial.</div>
                        <div>We do not charge a fee to process or respond to your verifiable request unless such request is manifestly unfounded or excessive. In such cases, we may charge a reasonable fee, or refuse to act on the request. In either case, we will communicate our choices and explain the reasons behind it.</div>

                        <br></br>
                        <h3>Definitions and legal references</h3>

                        <br></br>
                        <h4>Personal Data (or Data)</h4>

                        <br></br>
                        <div>Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</div>

                        <br></br>
                        <h4>Usage Data</h4>

                        <br></br>
                        <div>
                         Information collected automatically through this Application (or third-party services employed in this Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.</div>
                         
                         <br></br>
                         <h4>User</h4>

                         <br></br>
                         <div>The individual using this Application who, unless otherwise specified, coincides with the Data Subject.</div>

                         <br></br>
                         <h4>Data Subject</h4>

                         <br></br>
                         <div>The natural person to whom the Personal Data refers.</div>

                         <br></br>
                         <h4>Data Processor (or Data Supervisor)</h4>

                         <br></br>
                         <div>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</div>

                         <br></br>  
                         <h4>Data Controller (or Owner)</h4>
                         <br></br>
                         <div>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application.</div>

                         <br></br>
                         <h4>This Application</h4>

                         <br></br>
                         <div>The means by which the Personal Data of the User is collected and processed.</div>

                         <br></br>
                         <h4>Service</h4>

                         <br></br>
                         <div>The service provided by this Application as described in the relative terms (if available) and on this site/application.</div>

                         <br></br>
                         <h4>European Union (or EU)</h4>

                         <br></br>
                         <div>Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.</div>

                         <br></br>
                         <h4>Legal information</h4>

                         <br></br>
                         <div>This privacy statement has been prepared based on provisions of multiple legislations, including Art. 13/14 of Regulation (EU) 2016/679 (General Data Protection Regulation).</div>
                         <div>This privacy policy relates solely to this Application, if not stated otherwise within this document.</div>
                    </div>    
                </div>
              
                <Footer />
            </>
        );
    }
}

export default PrivacyPolicy;