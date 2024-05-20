import React, {useEffect} from 'react';
import ScrollReveal from "scrollreveal";
import '../pages/homepage.css'

const Home = () => {
    useEffect(() => {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
        });

        sr.reveal(`.banner-image`,{delay: 900, origin: 'top'})

    }, []); // Chỉ gọi useEffect một lần khi component được render
    return (
        <>
            <section className="home section" id="home">
                <div className="banner-container">
                    <img src={`${process.env.PUBLIC_URL}/assets/img/banner.png`} alt="Banner Image" className="banner-image" />
                </div>
            </section>
        </>
    );
};

export default Home;
