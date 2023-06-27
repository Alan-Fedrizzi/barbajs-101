import barba from "@barba/core";
import barbaCss from "@barba/css";

barba.use(barbaCss);

const body = document.querySelector("body");

barba.hooks.before((data) => {
  const background = data.current.container.dataset.background;
  body.style.setProperty("--page-background", background);
});

// init Barba
barba.init({
  transitions: [
    {
      // Current page once transition (browser first load)
      name: "home",
      once() {},
      // slide
      to: {
        namespace: ["home"],
      },
      sync: true,
      leave() {},
      enter() {},
    },
    {
      name: "fade",
      to: {
        namespace: ["fade"],
      },
      leave() {},
      enter() {},
    },
    {
      name: "clip",
      sync: true,
      to: {
        namespace: ["clip"],
      },
      leave() {},
      enter() {},
    },
    {
      name: "with-cover",
      to: {
        namespace: ["with-cover"],
      },
      leave() {},
      enter() {},
    },
  ],
});
