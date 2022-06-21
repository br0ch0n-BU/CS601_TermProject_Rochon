// Very trivial Vue code to return copyright
const { createApp } = Vue;

createApp({
  methods: {
    // Returns current year
    thisCopyright() {
      return `${new Date().getFullYear()} br0ch0n`;
    },
  },
}).mount("footer");
