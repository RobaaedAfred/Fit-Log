"use client";

import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useExercise } from '@/app/contex/ExerciseContext';

const Footer = () => {
    const { plan, saved } = useExercise();
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


                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <p className="hidden sm:block">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;