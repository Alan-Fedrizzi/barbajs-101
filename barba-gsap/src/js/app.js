import barba from "@barba/core";
import gsap from "gsap";

import {
  animationEnter,
  animationLeave,
  leaveFromProject,
  leaveToProject,
  revealProject,
} from "./animations/index";

const resetActiveLink = () =>
  gsap.set("a.is-active span", {
    xPercent: -100,
    transformOrigin: "left",
  });

barba.hooks.enter((data) => {
  window.scrollTo(0, 0);
});

barba.init({
  views: [
    {
      namespace: "architecture",
      beforeEnter(data) {
        console.log("beforeEnter architecture");
        console.log(data);
      },
    },
  ],
  transitions: [
    {
      name: "detail",
      to: {
        namespace: ["detail"],
      },
      once({ next }) {
        revealProject(next.container);
      },
      leave: ({ current }) => leaveToProject(current.container),
      enter({ next }) {
        revealProject(next.container);
      },
    },
    {
      name: "general-transition",
      once({ next }) {
        resetActiveLink();
        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: "power1.out",
          onComplete: () => animationEnter(next.container),
        });
      },
      leave: ({ current }) => animationLeave(current.container),
      enter({ next }) {
        animationEnter(next.container);
      },
    },
    {
      name: "from-detail",
      from: {
        namespace: ["detail"],
      },
      leave: ({ current }) => leaveFromProject(current.container),
      enter({ next }) {
        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: "power1.out",
        });
        animationEnter(next.container);
      },
    },
  ],
});
