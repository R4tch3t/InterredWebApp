import React, { Component } from 'react';
import NewsSidebar from './NewsSidebar';
import Link from 'next/link';
import CommentsArea from './CommentsArea';

class NewsDetailsContent extends Component {
    render() {
        return (
            <section className="news-details-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">
                                <div className="article-image">
                                    <img src="/images/blog-details/blog-details.jpg" alt="Image" />
                                </div>

                                <div className="article-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li>
                                                <span>Posted On:</span> February 20 , 2020
                                            </li>
                                            <li>
                                                <span>Posted By:</span>
                                                <Link href="#">
                                                    <a>John Anderson</a>
                                                </Link> 
                                            </li>
                                        </ul>
                                    </div>

                                    <h3>Web development the best work in the future for the world</h3>

                                    <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                    <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                    <blockquote className="flaticon-quote">
                                        <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>
                                    </blockquote>
                                    
                                    <p>The company itself is a very successful company. Resilience, especially the fault of the present.. The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                    <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>

                                    <p>The company itself is a very successful company. Resilience, especially the fault of the present..</p>
                                </div>

                                <div className="article-footer">
                                    <div className="article-tags">
                                        <span><i className='bx bx-share-alt'></i></span>
                                        <Link href="#">
                                            <a>Share</a>
                                        </Link>
                                    </div>

                                    <div className="article-share">
                                        <ul className="social">
                                            <li>
                                                <a href="https://www.facebook.com/" target="_blank">
                                                    <i className='bx bxl-facebook'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.twitter.com/" target="_blank">
                                                    <i className='bx bxl-twitter'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.linkedin.com/" target="_blank">
                                                    <i className='bx bxl-linkedin'></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.pinterest.com/" target="_blank">
                                                    <i className='bx bxl-pinterest-alt'></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="post-navigation">
                                    <div className="navigation-links">
                                        <div className="nav-previous">
                                            <Link href="#">
                                                <a>
                                                    <i className='bx bx-left-arrow-alt'></i> Prev Post
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="nav-next">
                                            <Link href="#">
                                                <a>Next Post <i className='bx bx-right-arrow-alt'></i></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Area */}
                                <CommentsArea />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <NewsSidebar />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default NewsDetailsContent;