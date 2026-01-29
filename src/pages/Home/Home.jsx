import React from 'react';
import Banner from './Banner';
import WhyChooseUs from './WhyChooseUs';
import RecentListings from './RecentListings';
import SpecialOffers from './SpecialOffers';

const Home = () => {
    return (
        <main className="overflow-hidden">
            <Banner />
            <WhyChooseUs />
            <RecentListings />
            <SpecialOffers />
        </main>
    );
};

export default Home;