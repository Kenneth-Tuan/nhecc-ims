export default defineAppConfig({
  global: {
    picture: {
      dark: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      light:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/",
    email: "ui-pro@nuxt.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "stone",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
    dashboardGroup: {
      base: "fixed inset-0 flex",
    },
    dashboardPanel: {
      slots: {
        root: "relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-default shrink-0",
        body: "flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6",
        handle: "",
      },
      variants: {
        size: {
          true: {
            root: "w-full lg:w-(--width)",
          },
          false: {
            root: "flex-1",
          },
        },
      },
    },
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-discord",
        to: "https://go.nuxt.com/discord",
        target: "_blank",
        "aria-label": "Nuxt on Discord",
      },
      {
        icon: "i-simple-icons-x",
        to: "https://go.nuxt.com/x",
        target: "_blank",
        "aria-label": "Nuxt on X",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/nuxt/ui",
        target: "_blank",
        "aria-label": "Nuxt UI on GitHub",
      },
    ],
  },
});
