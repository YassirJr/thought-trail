import {useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import {motion} from "framer-motion";

import {cn} from "@/lib/utils.js";

export const ParallaxScroll = ({
                                 listCards,
                                 className,
                               }) => {
  const gridRef = useRef(null);
  const {scrollYProgress} = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(listCards.length / 3);

  const firstPart = listCards.slice(0, third);
  const secondPart = listCards.slice(third, 2 * third);
  const thirdPart = listCards.slice(2 * third);

  return (
    <div
      className={cn("items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start mx-auto gap-10 py-10 px-10"
        ref={gridRef}
      >
        {
          listCards.length > 0 ? (
            <>
              <div className="grid gap-10">
                {firstPart.map((el, idx) => (
                  <motion.div
                    style={{y: translateFirst}} // Apply the translateY motion value here
                    key={"grid-1" + idx}
                  >
                    {
                      el
                    }
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-10">
                {secondPart.map((el, idx) => (
                  <motion.div style={{y: translateSecond}} key={"grid-2" + idx}>
                    {
                      el
                    }
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-10">
                {thirdPart.map((el, idx) => (
                  <motion.div style={{y: translateThird}} key={"grid-3" + idx}>
                    {
                      el
                    }
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <h1>No stories</h1>
          )
        }

      </div>
    </div>
  );
};
