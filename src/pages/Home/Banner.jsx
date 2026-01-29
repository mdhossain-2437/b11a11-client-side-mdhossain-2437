import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Banner = () => {
    const bannerRef = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(subRef.current, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
            "-=0.5"
        )
        .fromTo(btnRef.current, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 
            "-=0.3"
        );
    }, []);

    return (
        <div ref={bannerRef} className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-background">
            {/* Background Image/Video Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop" 
                    alt="Luxury Car" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
                    Drive Your <span className="text-primary">Dreams</span> Today
                </h1>
                <p ref={subRef} className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
                    Experience the thrill of the road with our premium fleet of luxury and performance vehicles. Unmatched comfort, valid prices.
                </p>
                <div ref={btnRef}>
                    <Link 
                        to="/available-cars" 
                        className="inline-block bg-primary text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-white transition-colors duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                        View Available Cars
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;