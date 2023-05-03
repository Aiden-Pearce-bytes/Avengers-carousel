import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { climate } from "@/climate";
import classNames from "classnames";


export default function Home() {
  const [activeItem, setActiveItem] = useState(2);
  const wrapperRef = useRef(0);
  const timeOutRef = useRef(0);

  useEffect(() => {
    if (!wrapperRef.current) return;
    // To clearout the unwanted Timeout functions
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22,0.61, 0.36, 1)"
    );
    timeOutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);

    // CleanUp Function
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, [activeItem]);

  return (
    <div className="flex bg-gray-900 h-screen w-full items-center justify-center">
      <div className="w-[1200px] max-w-full">
        <div>
          <h1 className="py-8 text-white text-4xl">Avengers</h1>
        </div>
        <ul ref={wrapperRef} className="group flex flex-col md:flex-row md:h-[640px] gap-4 md:gap-[1.5%]">
          {climate.map((climate, index) => (
            <li
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className={classNames(
                "relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:[&[aria-current='true']]:w-[48%]",
                "md:[transition:width_var(--transition,200ms_ease-in)]",
                "before:hidden md:before-block before:bg-white before:absolute before:bottom-0 before:left-[-10px] before:top-0 before:right-[-10px]",
                "md:hover:w-[12%] md:[&:not(:hover),&:not(:first), &:not(:last)]:group-hover:w-[7%]",
                // "first:pointer-events-none last:pointer-events-none",
                // "md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0"
              )}
              key={climate.name}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-300">
                <img
                  className="absolute right-0 max-w-none w-24 h-auto md:h-[640px] md:w-[590px] md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 object-cover"
                  src={climate.img}
                  alt={climate.name}
                  width="590px"
                  height="640px"
                />
                <div
                  className={classNames(
                    "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-sky-200  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-sky-400 md:absolute md:transition-opacity",
                    activeItem === index ? "md:opacity-25" : "md:opacity-0"
                  )}
                />
                <div className={classNames(
                  "p-4 md:absolute md:p-0 left-8 top-8 w-[590px] transition-[transform,opacity]",
                  activeItem === index ? "md:translate-x-0 md:opacity-100" : "md:translate-x-4 md:opacity-0"                
                )}>
                  <p className="text-sm md:text-lg uppercase text-gray-900">{climate.name}</p>
                  <p className="text-lg md:text-4xl font-bold">{climate.place}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
