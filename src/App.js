import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const valueAddRef = useRef(null);

  useEffect(() => {
    const car = carRef.current;
    const trail = trailRef.current;
    const letters = lettersRef.current;
    const valueAdd = valueAddRef.current;

    const valueRect = valueAdd.getBoundingClientRect();
    const letterOffsets = letters.map((letter) => letter.offsetLeft);

    const maxScroll = window.innerHeight;
    const roadWidth = window.innerWidth;
    const carWidth = 150;
    const endX = roadWidth - carWidth;

    gsap.to(car, {
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".track",
      },
      x: endX,
      ease: "none",
      onUpdate: function () {
        const carX = gsap.getProperty(car, "x") + carWidth / 2;
        letters.forEach((letter, i) => {
          const letterX = valueRect.left + letterOffsets[i];
          if (carX >= letterX) {
            letter.style.opacity = 1;
          } else {
            letter.style.opacity = 0;
          }
        });
        gsap.set(trail, { width: carX });
      },
    });

    gsap.to("#box1", {
      scrollTrigger: {
        trigger: ".section",
        start: "top+=400 top",
        end: "top+=600 top",
        scrub: true,
      },
      opacity: 1,
    });

    gsap.to("#box2", {
      scrollTrigger: {
        trigger: ".section",
        start: "top+=600 top",
        end: "top+=800 top",
        scrub: true,
      },
      opacity: 1,
    });

    gsap.to("#box3", {
      scrollTrigger: {
        trigger: ".section",
        start: "top+=800 top",
        end: "top+=1000 top",
        scrub: true,
      },
      opacity: 1,
    });

    gsap.to("#box4", {
      scrollTrigger: {
        trigger: ".section",
        start: "top+=1000 top",
        end: "top+=1200 top",
        scrub: true,
      },
      opacity: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="App">
      <div className="section">
        <div className="track">
          <div className="road" id="road">
            <img
              src="McLaren 720S 2022 top view.png"
              alt="car"
              className="car"
              ref={carRef}
            />
            <div className="trail" ref={trailRef}></div>
            <div className="value-add" ref={valueAddRef} style={{ top: "30%" }}>
              <span className="value-letter" ref={el => lettersRef.current[0] = el}>W</span>
              <span className="value-letter" ref={el => lettersRef.current[1] = el}>E</span>
              <span className="value-letter" ref={el => lettersRef.current[2] = el}>L</span>
              <span className="value-letter" ref={el => lettersRef.current[3] = el}>C</span>
              <span className="value-letter" ref={el => lettersRef.current[4] = el}>O</span>
              <span className="value-letter" ref={el => lettersRef.current[5] = el}>M</span>
              <span className="value-letter" ref={el => lettersRef.current[6] = el}>E</span>
              <span className="value-letter" ref={el => lettersRef.current[7] = el}>&nbsp;</span>
              <span className="value-letter" ref={el => lettersRef.current[8] = el}>I</span>
              <span className="value-letter" ref={el => lettersRef.current[9] = el}>T</span>
              <span className="value-letter" ref={el => lettersRef.current[10] = el}>Z</span>
              <span className="value-letter" ref={el => lettersRef.current[11] = el}>F</span>
              <span className="value-letter" ref={el => lettersRef.current[12] = el}>I</span>
              <span className="value-letter" ref={el => lettersRef.current[13] = el}>Z</span>
              <span className="value-letter" ref={el => lettersRef.current[14] = el}>Z</span>
            </div>
          </div>
          <div className="text-box" id="box1" style={{ top: "5%", right: "30%" }}>
            <span className="num-box">58%</span> Increase in pick up point use
          </div>
          <div className="text-box" id="box2" style={{ bottom: "5%", right: "35%" }}>
            <span className="num-box">23%</span> Decreased in customer phone calls
          </div>
          <div className="text-box" id="box3" style={{ top: "5%", right: "10%" }}>
            <span className="num-box">27%</span> Increase in pick up point use
          </div>
          <div className="text-box" id="box4" style={{ bottom: "5%", right: "12.5%" }}>
            <span className="num-box">40%</span> Decreased in customer phone calls
          </div>
        </div>
      </div>
    </div>
  );
}