'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
         
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 text-2xl text-white hover:bg-gray-800"
                aria-label="Toggle menu"
            >
                {isOpen ? '✕' : '☰'}
            </button>

           
            {isOpen && (
                <div className="absolute left-0 top-16 w-full border-t border-gray-800 bg-gray-950">
                    <div className="flex flex-col p-4">

                        <Link
                            href="/workouts"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            Workouts
                        </Link>

                        <Link
                            href="/my-plan"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            My Plan
                        </Link>

                        <Link
                            href="/plan"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            Plan
                        </Link>

                        <Link
                            href="/saved"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            Saved
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Hamburger;