import React, { Component } from 'react';
class About extends Component {
    render() {
        return (
            <div className="container-fluid about">
                <header>
                    <div className="lead px-4">
                        <p className="secret">The Secret Garden</p>
                        <p>Our shop specializes in beautiful bouquets and unique arrangements for every occasion</p>
                        <p>Enter the catalog to browse through many options to flower up your day</p>
                    </div>
                </header>
                <div className="container-fluid text-center text-md-left">
                    <hr className="featurette-divider" />
                    <div className="row align-items-center py-2 my-4">
                        <div className="col-md-4">
                            <div className="about-img rounded-circle mx-auto"><img src="images/about/bride.jpg" alt="the secret garden about img" /></div>
                        </div>
                        <div className="col-md-8 pt-md-0 pt-5">
                            <h1 className="colored-header capitilize">wedding season</h1>
                            <h4 className="text-muted capitilize">beautiful bridal bouquets on sale </h4>
                            <p className="lead pr-md-5">A pre-made bouquet or a self-assembled one? <br /> Whatever you choose to have on your wedding day,
                    <span className="secret capitilize">the secret garden</span> team is here for you! A team of flowers specialists will be advising you on the best-looking , long-lasting flowers to match your personal prefrences.<br />
                                <strong>Enter the catalog to shop now!</strong> </p>
                        </div>
                    </div>
                    <hr className="featurette-divider" />
                    <div className="row align-items-center py-2 my-4">
                        <div className="col-md-4">
                            <div className="about-img rounded-circle mx-auto"><img src="images/about/spring.jpg" alt="the secret garden about img" /></div>
                        </div>
                        <div className="col-md-8 pt-md-0 pt-5 float-md-right">
                            <h1 className="colored-header capitilize">spring sale</h1>
                            <h4 className="text-muted capitilize">all spring gift packages on sale</h4>
                            <p className="lead pr-md-5"> Spring is here and <span className="secret capitilize">the secret garden</span> is pampering her costumers with amazing gift packages! <br /> Our spring gift package includes a gorgeous colorful spring flowers bouquet , a chocolate of your
                    chosing and a gift card for your next purchase.<br /> With an attractive price and eye-pleasing looks , you can't go wrong with the <span className="secret capitilize">the secret garden</span>'s spring gift package!<br />
                                <strong>Shop for your ultimate spring gift package!</strong> </p>
                        </div>
                    </div>
                    <hr className="featurette-divider" />
                    <div className="row align-items-center py-2 my-4">
                        <div className="col-md-4">
                            <div className="about-img rounded-circle mx-auto"><img src="images/about/hospital.jpg" alt="the secret garden about img" /></div>
                        </div>
                        <div className="col-md-8 pt-md-0 pt-5">
                            <h1 className="colored-header capitilize">giving back to the community</h1>
                            <h4 className="text-muted capitilize">Delivering flowers to your local hospital</h4>
                            <p className="lead pr-md-5"><span className="secret capitilize">the secret garden community</span> is a group of wonderful people , organized by our amazing manager - Menucha Fox - volunteering to deliver flowers and treats to local hospitals and giving back to the community
                    by making someone smile! You can join <span className="secret capitilize">the secret garden community</span> today and donate money to help us bring joy to more people.<br />
                                <strong>Join today and learm more!</strong> </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;