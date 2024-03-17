import React from "react";
import Reveal from "react-awesome-reveal";
import WaterWave from "react-water-wave";
import useTypewriter from "react-typewriter-hook";
import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { motion, useScroll } from "framer-motion";
import home from "../image/Home3.jpg";
import lottie from "lottie-web";

const MagicOcean = [
  "Execute Code Securely",
  "A Code Sharing Platform",
  "Assignment Submissions",
];
let index = 0;

function Home() {
  const [magicName, setMagicName] = useState("Execute Code Securely");
  const intervalRef = useRef({});
  const name = useTypewriter(magicName);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      index = index > 2 ? 0 : ++index;
      setMagicName(MagicOcean[index]);
    }, 6000);
    return function clear() {
      clearInterval(intervalRef.current);
    };
  }, [magicName]);

  const { scrollYProgress } = useScroll();

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./HeroAnimation.json"),
    });
  }, []);

  return (
    // <>
    //   <section id="home" className="h-screen ">
    //
    //     <WaterWave
    //       interactive={true}
    //       strength={1.5}
    //       dropRadius={15}
    //       resolution={128}
    //       perturbance={0.01}
    //       className="banner_area banner_shap_two relative flex items-center justify-center"
    //       style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
    //       // imageUrl={require("./nasa-Q1p7bh3SHj8-unsplash.jpg")}
    //       imageUrl={home}
    //     >
    //       {() => (
    //         <div className="container flex items-center justify-center  scroll-smooth focus:scroll-auto">
    //           <div className="banner_content text-center text-white  text-2xl">
    //             <Reveal effect="fadeInUp" duration={1500}>
    //               <h2 className="wow fadeInLeft animated font-serif p-3 m-3 text-6xl">
    //                 CodeLab
    //               </h2>
    //             </Reveal>
    //             <Reveal effect="fadeInUp" duration={1500}>
    //               <h4 className="wow fadeInUp animated cursor">
    //                 {name} &zwnj;
    //               </h4>
    //             </Reveal>

    //             <div className="m-5"></div>

    //             <div className="">
    //               <motion.div
    //                 whileHover={{ scale: 1.2 }}
    //                 whileTap={{ scale: 0.8 }}
    //                 className=""
    //               >
    //                 {" "}
    //                 <a
    //                   href="/try"
    //                   class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    //                 >
    //                   Get started
    //                   <svg
    //                     class="w-3.5 h-3.5 ml-2"
    //                     aria-hidden="true"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 14 10"
    //                   >
    //                     <path
    //                       stroke="currentColor"
    //                       stroke-linecap="round"
    //                       stroke-linejoin="round"
    //                       stroke-width="2"
    //                       d="M1 5h12m0 0L9 1m4 4L9 9"
    //                     />
    //                   </svg>
    //                 </a>
    //
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </WaterWave>
    //     {/* <img
    //     src={require("./shap1.png")}
    //     alt="base"
    //     className="absolute left-0 "
    //     style={{ bottom: -70 }}
    //   /> */}
    //   </section>
    // </>
    <>
      <main className="bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950">
        <section className="container flex h-[750px] flex-col items-center justify-center md:h-[550px] ">
          <motion.div
          // className="fixed p-0 top-0 z-10 left-0 right-0 h-3 bg-red-500 animate-none origin-top-left"
          // style={{ scaleX: scrollYProgress }}
          />
          <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
            <div className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left ">
              <div className="lg:w-[45%]">
                {" "}
                <div className="lg:w-[45%]  text-4xl font-bold">
                  <p>
                    Say <span className="text-red-500 italic">BYE</span> to
                    code/output snapshots !
                  </p>
                </div>
              </div>

              <p className="">
                <Reveal effect="fadeInUp" duration={1500}>
                  <h4 className="wow fadeInUp animated cursor">
                    {name} &zwnj;
                  </h4>
                </Reveal>
              </p>
              <div className="space-x-4">
                <button>
                  <a
                    href="/login"
                    class="inline-flex justify-center border-2 border-blue-900 rounded-md items-center py-2 px-4 text-base font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    Get started
                    <svg
                      class="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </button>
                <button className="border-1  rounded-md border-2 border-white px-4 py-2 text-sm text-white transition-colors duration-300 ">
                  <a href="/try">
                    Try Now
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </a>
                </button>
              </div>
            </div>
            <div className="" ref={container}></div>
          </div>
          {/* </motion.div> */}
        </section>
      </main>
    </>
  );
}

export default Home;
