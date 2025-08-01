import { assets } from "../assets/assets";


const Testimonial = () => {
    const cardsData = [
        {
            image: assets.testimonial_1,
            name: 'Prajwal P Bailkeri',
            handle: '@pb8055',
            date: 'July 15, 2025',
            message: 'The fruits and vegetables were incredibly fresh, felt like they were straight from the farm!'
        },
        {
            image: assets.testimonial_2,
            name: 'Karan Singh V',
            handle: '@kaaran',
            date: 'June 11, 2025',
            message: 'Honestly impressed by the quick and careful delivery. The dairy products arrived chilled!'
        },
        {
            image: assets.testimonial_3,
            name: 'Vansh Shah',
            handle: '@vansh07',
            date: 'June 5, 2025',
            message: 'I love how secure and reliable the whole process is, from payment to tracking orders.'
        },
        {
            image: assets.testimonial_4,
            name: 'Shrikar',
            handle: '@shrikar25',
            date: 'July 10, 2025',
            message: 'Really admire the consistency. Every time I order, I get the same high-quality products.'
        },
        {
            image: assets.testimonial_5,
            name: 'Varshith Kumar',
            handle: '@varshith18',
            date: 'July 7, 2025',
            message: 'Impressed by the care in delivery. The freshness and quality never fail to meet expectations.'
        },
        {
            image: assets.testimonial_6,
            name: 'Varun Bharadwaj',
            handle: '@vbs273',
            date: 'June 21, 2025',
            message: 'The ordering process is smooth, the app is user-friendly, and every item arrives just as shown.'
        },
        {
            image: assets.testimonial_7,
            name: 'Nikhil V',
            handle: '@vnikhil',
            date: 'July 11, 2025',
            message: 'Reliable service with excellent product variety. I feel confident shopping here every time.'
        }
    ];

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-82 shrink-0">
            <div className="flex gap-2">
                <img className="size-11 rounded-full" src={card.image} alt="User Image" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p>{card.name}</p>
                        <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                        </svg>
                    </div>
                    <span className="text-xs text-slate-500">{card.handle}</span>
                </div>
            </div>
            <p className="text-sm py-4 text-gray-800">{card.message}</p>
            <div className="flex items-center justify-between text-slate-500 text-xs">
                <div className="flex items-center gap-1">

                </div>
                <p>{card.date}</p>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
  @keyframes marqueeScroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .marquee-inner {
    animation: marqueeScroll 25s linear infinite;
  }

  .marquee-reverse {
    animation-direction: reverse;
  }
`}</style>

            <div className="w-full px-6 md:px-0 py-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800">
                    What Our Customers Say ❤️
                </h2>
            </div>
            <div className="marquee-row w-full max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
    )
}

export default Testimonial