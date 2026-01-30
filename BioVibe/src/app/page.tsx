"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bell, Leaf, Trophy, Recycle, Flame, CircleCheck, X } from "lucide-react";

import bottle from "@/assets/bottle.jpg";
import glass from "@/assets/glass.jpg";
import paper from "@/assets/paper.jpg";
import metal from "@/assets/aluminium.jpg";

interface User {
    username: string;
    city: string;
    state: string;
    profilePicture: string;
    totalPointsEarned: number;
    wasteDumped: any[];
}

export default function HomePage() {
    const [user, setUser] = useState<User | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/profile")
            .then((res) => res.json())
            .then((data) => setUser(data.userData));
    }, []);

    const ecoScore = Math.min(100, (user?.totalPointsEarned || 0) / 10);
    const todayProgress = 65;

    return (
        <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <img src={user?.profilePicture} className="w-12 h-12 rounded-full border-2 border-green-500" />
                    <div>
                        <h2 className="font-semibold">Hi, {user?.username}</h2>
                        <p className="text-xs text-gray-500">
                            {user?.city}, {user?.state}
                        </p>
                    </div>
                </div>
                <Bell className="opacity-70" />
            </div>

            {/* DAILY IMPACT CARD */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold">🌱 Today's Impact</h3>

                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                        <Flame className="mx-auto" />
                        <p className="font-bold">{user?.totalPointsEarned}</p>
                        <p className="text-xs opacity-80">Points</p>
                    </div>

                    <div>
                        <Recycle className="mx-auto" />
                        <p className="font-bold">{user?.wasteDumped?.length}</p>
                        <p className="text-xs opacity-80">Items</p>
                    </div>

                    <div>
                        <Leaf className="mx-auto" />
                        <p className="font-bold">{ecoScore}%</p>
                        <p className="text-xs opacity-80">Eco Score</p>
                    </div>
                </div>
            </div>

            {/* DAILY MISSION */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow">
                <h3 className="font-semibold mb-2">🔥 Today's Mission</h3>
                <p className="text-sm text-gray-600 mb-3">Recycle at least 2 items today</p>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${todayProgress}%` }}></div>
                </div>

                <p className="text-xs text-right mt-1">{todayProgress}% done</p>
            </div>

            {/* MATERIALS */}
            <h3 className="mt-8 mb-3 font-semibold">♻️ Recycle Materials</h3>

            <div className="flex gap-4 overflow-x-auto pb-2">
                {[
                    { name: "Plastic", img: bottle },
                    { name: "Glass", img: glass },
                    { name: "Paper", img: paper },
                    { name: "Metal", img: metal },
                ].map((item) => (
                    <div key={item.name} onClick={() => setSelectedMaterial(item.name)} className="min-w-[140px] bg-white rounded-xl p-3 shadow hover:scale-105 transition cursor-pointer">
                        <Image src={item.img} alt={item.name} className="h-20 mx-auto" />
                        <p className="text-center mt-2 font-medium">{item.name}</p>
                    </div>
                ))}
            </div>

            {/* ACHIEVEMENTS */}
            <div className="mt-8 bg-white rounded-xl p-5 shadow">
                <h3 className="font-semibold mb-3">🏆 Achievements</h3>
                <div className="flex gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">First Recycle</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">7-Day Streak</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Eco Hero</span>
                </div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <button className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">+ Scan Waste</button>

            {/* MATERIAL MODAL */}
            {selectedMaterial && (
                <div className="fixed inset-0 bg-black/50 flex items-end z-50">
                    <div className="bg-white w-full rounded-t-3xl p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{selectedMaterial}</h2>
                            <X onClick={() => setSelectedMaterial(null)} />
                        </div>

                        <div className="mt-4 space-y-3">
                            <p className="flex gap-2 text-green-600">
                                <CircleCheck /> Good for recycling
                            </p>
                            <p className="text-gray-600">Dispose properly to reduce environmental harm.</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
