'use client';

interface HamburgerProps {
    isOpenHamburger: boolean;
    handleHamburger: () => void;
}
export default function Hamburger({
    handleHamburger,
    isOpenHamburger,
}: HamburgerProps) {
    return (
        <div
            className="block px-[5px] space-y-1 cursor-pointer md:hidden"
            onClick={handleHamburger}
        >
            <span
                className={`block w-6 h-[3px] bg-black   ${
                    isOpenHamburger
                        ? 'transform transition duration-500 ease-in-out rotate-45 translate-y-2'
                        : 'transform transition duration-500 ease-in-out '
                }`}
            />
            <span
                className={`block w-1/2 h-[3px] bg-black ${
                    isOpenHamburger
                        ? 'transform transition duration-500 ease-in-out opacity-0'
                        : 'transform transition duration-500 ease-in-out '
                }`}
            />
            <span
                className={`block w-6 h-[3px] bg-black  ${
                    isOpenHamburger
                        ? 'transform  transition duration-500 ease-in-out -rotate-45  -translate-y-2'
                        : 'transform transition duration-500 ease-in-out '
                }`}
            />
        </div>
    );
}
