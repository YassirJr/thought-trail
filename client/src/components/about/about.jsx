import React from 'react';
import app_img from '@/assets/thought-trail-app.jpg'
import {WobbleCard} from "@/components/ui/wobble-card.jsx";

function About() {
  return (
    <div className='my-10'>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2
              className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Our Mission
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              At Thought Trail, our mission is to foster a vibrant and inclusive community where everyone can share their
              stories, ideas, and experiences. We believe in the power of words to inspire change and connect people
              across the globe.
            </p>
          </div>
          <img
            src={app_img}
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2
            className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-lg">
            <h2
              className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Our Values
            </h2>
            <div className="mt-4 flex flex-col items-center gap-4 text-left  text-base/6 text-neutral-200">
              <p>
                <span className='font-bold'>Inclusivity :</span> We welcome voices from all backgrounds and strive to create a safe space for diverse
                perspectives.
              </p>
              <p>

                <span className='font-bold'>Creativity :</span> We encourage creative expression and celebrate the uniqueness of every writer and reader.
              </p>
              <p>
                <span className='font-bold'>Connection :</span> We aim to build a network where meaningful interactions and connections can thrive.
              </p>

            </div>
          </div>
          <img
            src={app_img}
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>

  );
}

export default About;
