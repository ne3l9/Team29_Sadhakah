"use client";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center z-50">
            {/* Dustbin */}
            <div className="relative w-24 h-32">
                {/* Falling Waste */}
                <div className="absolute left-1/2 -top-6 w-4 h-4 bg-green-500 rounded animate-drop" />
                <div className="absolute left-1/3 -top-10 w-3 h-3 bg-blue-500 rounded animate-drop delay-200" />
                <div className="absolute left-2/3 -top-14 w-3 h-3 bg-yellow-500 rounded animate-drop delay-400" />

                {/* Bin */}
                <div className="absolute bottom-0 w-full h-24 bg-green-700 rounded-b-xl rounded-t-sm flex items-center justify-center">
                    <div className="w-10 h-2 bg-green-900 rounded"></div>
                </div>

                {/* Bin Lid */}
                <div className="absolute -top-2 left-0 w-full h-3 bg-green-800 rounded animate-lid" />
            </div>

            <p className="mt-6 text-green-700 font-semibold animate-pulse">Cleaning the planet...</p>
        </div>
    );
}
