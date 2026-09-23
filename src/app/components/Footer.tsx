import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="border-t border-gray-800 bg-gray-950">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">

                <div className="flex items-center gap-3">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="FITLOG logo"
                    />

                    <p className="font-bold text-white">
                        FITLOG
                    </p>
                </div>


                <p className="text-sm text-gray-400">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
};

export default Footer;