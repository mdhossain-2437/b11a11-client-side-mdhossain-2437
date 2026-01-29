import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Error404 = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const tireRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial reveal
        tl.fromTo(titleRef.current, 
            { y: -100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
        )
        .fromTo(textRef.current, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5 }, 
            "-=0.5"
        )
        .fromTo(buttonRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 
            "-=0.3"
        );

        // "Tire" animation (The '0' in 404 rolling away)
        // We'll create a visual separate 0 that acts as a tire
        if (tireRef.current) {
             gsap.to(tireRef.current, {
                x: 200,
                rotation: 360,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // Floating effect for the container
        gsap.to(containerRef.current, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white overflow-hidden relative">
            <div ref={containerRef} className="text-center z-10 px-4">
                <div className="relative inline-block">
                    <h1 ref={titleRef} className="text-[10rem] md:text-[15rem] font-display font-bold leading-none text-primary/20 select-none">
                        4<span className="inline-block" ref={tireRef}>0</span>4
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <h2 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-lg">Oops!</h2>
                    </div>
                </div>
                
                <p ref={textRef} className="text-xl md:text-2xl text-secondary mb-8 mt-4 max-w-lg mx-auto">
                    Looks like this car engine stalled. The page you are looking for doesn't exist or has been moved.
                </p>

                <div ref={buttonRef}>
                    <Link 
                        to="/" 
                        className="inline-block bg-primary text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                        Back to Garage
                    </Link>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

export default Error404;
