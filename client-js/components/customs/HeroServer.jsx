import Image from 'next/image';

export default function HeroServer() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <Image
                src="/hero-bg.jpg"
                alt="Travel destinations"
                className="absolute inset-0 object-cover mix-blend-overlay"
                fill
                priority
                sizes="100vw"
            />
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            Plan Your Dream Trip with
                            <span className="text-blue-500"> AI</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}