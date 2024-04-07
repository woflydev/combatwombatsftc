import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import Link from "next/link";
import { Line } from "@/components/client";
import Image from "next/image";
import Robot from "@/components/robot2.png"
import blururl from "@/components/blururl";

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : process.env.NEXT_PUBLIC_DOMAIN;

export async function dynamicBlurDataUrl(url: string) {

  const base64str = await fetch(
    `${baseUrl}/_next/image?url=${url}&w=16&q=75`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64')
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export default function Hero() {
  return (
    <div className={""}>
      <section className="pl-12 mr-12 pt-18 mb-12 lg:mb-44 3xl:mb-6 4xl:mb-48 lg:pt-24 relative max-w-7xl bg-parent">
        <Image
          src={Robot}
          alt="An image of the robot"
          sizes="(max-width: 768px) 31rem, (max-width: 1024px) 36rem, (min-width: 2248px) 68rem, (min-width: 1920px) 48rem, 31rem"
          priority
          placeholder={`${blururl}`}
          className="mx-auto w-small md:mx-auto md:w-medium lg:absolute lg:-bottom-52 lg:-right-12 lg:mr-4 lg:w-medium 3xl:absolute 3xl:-bottom-24 3xl:-right-xmoderate 3xl:w-large 4xl:-bottom-56 4xl:-right-moderate 4xl:w-xlarge bg-plain bg-no-repeat bg-contain bg-slide transition-all"
        />
        <h1 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-center sm:text-left mt-8 sm:mt-0">
          We&apos;re the
          <br />
          <span className="combat">Combat Wombats</span>
        </h1>
        <article className="mt-8 ml-2 font-medium 2xl:max-w-3xl max-w-2xl text-base md:text-xl 2xl:text-2xl text-center sm:text-left">
          We&apos;re an Australian team of{" "}
          <span className="text-combatgreen font-bold">driven</span> and{" "}
          <span className="text-wombatbrown font-bold">dedicated</span> STEM
          students aiming to become future{" "}
          <span className="text-wombatbrown font-bold">change-makers</span> and{" "}
          <br className="block xl:hidden" /><span className="text-combatgreen font-bold">innovators</span>.
        </article>
        <article className="ml-2">
          <hr
            className={`h-1 rounded-xl border-0 w-0 my-6 bg-combatgreen after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-combatgreen after:absolute animation-line text-center hidden   md:block`}
          />
          <ul className="flex flex-row mt-6 child:mx-4 text-2xl justify-center sm:justify-normal">
            <li className="ml-0">
              <Link href="https://www.instagram.com/combat_wombats_ftc_aus/" aria-label="Check out our Instagram.">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/@CombatWombats23335" aria-label="Check out our Youtube.">
                <FaYoutube />
              </Link>
            </li>
            <li>
              <Link href="mailto: combatwombatsftc@gmail.com" aria-label="Get in touch via email.">
                <IoMailOpenOutline />
              </Link>
            </li>
          </ul>
        </article>
      </section>
      <hr className="spacer" />
      <section className="flex flex-col items-center text-base md:text-xl 2xl:text-2xl 4xl:text-3xl font-medium pb-12 mx-auto px-12 text-center lg:text-left relative">
        <span className="">
          We extend our{" "}
          <span className="text-combatgreen font-bold">heartfelt</span>{" "}
          gratitude and love for the support our wonderful sponsors have
          provided to us: 👇
        </span>
        <ul className="flex justify-start child:mx-12 mt-12">
          <li>
            <Image src="/images/sitelogo.png" alt="QASMT" height="150" width="150" className="w-auto" />
          </li>
        </ul>
      </section>
    </div>
  );
}
