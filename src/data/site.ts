/**
 * All site copy and settings live in this file.
 * Edit the words here; you never need to touch a component.
 *
 * "highlight" must be an exact piece of the headline it sits next to.
 * It gets the accent blue highlight. Leave it "" for no highlight.
 */

export const contact = {
  phoneDisplay: "(618) 414-9392",
  phoneHref: "tel:+16184149392",
  email: "dominic@drivnmedia.info",
  location: "Drivn Media, O'Fallon, IL",
};

export const meta = {
  title: "Drivn Media | Meta ads for remodelers",
  description:
    "We run your ads, screen every homeowner, and send you only the serious ones.",
  url: "https://drivnmedia.info",
  ogImage: "/og.png",
};

export const header = {
  cta: "Book a call",
};

export const hero = {
  eyebrow: "Meta ads for kitchen, bath and basement remodelers",
  /** Line 1 of the headline: static, in the accent blue. */
  headline: "In-home consultations",
  /**
   * Line 2 of the headline: typed and deleted in a loop, in this order.
   * The first phrase is what shows on load and in link previews.
   * Keep each phrase about this short: line 2 is held to a single line,
   * and the headline size is set to fit the longest one on a phone.
   */
  rotating: [
    "with homeowners.",
    "inside your service area.",
    "with a real budget.",
    "ready to start.",
  ],
  /** What screen readers and search engines get instead of the animation. */
  accessibleHeadline:
    "In-home consultations with homeowners, inside your service area, with a real budget, ready to start.",
  sub: "We run your ads, screen every homeowner, and send you only the serious ones. 10 qualified consultations in your first 60 days, or we keep working free.",
  /** Shorter subhead shown on phones (below 768px) instead of "sub". */
  subMobile:
    "We run your ads and screen every homeowner. 10 qualified consultations in 60 days, or we keep working free.",
  primaryCta: "Book a call",
  /** "or call" line: desktop only. */
  secondaryPrefix: "or call",
  trust: [
    "Exclusive leads",
    "Screened before they reach you",
    "You work with me directly",
  ],
};

/** Sticky bar at the bottom of the screen on phones. */
export const mobileBar = {
  cta: "Book a call",
  callLabel: "Call Dominic",
};

export const problem = {
  headline: "Why most remodeler leads go nowhere.",
  highlight: "go nowhere.",
  cards: [
    {
      title: "Shared leads.",
      body: "The big lead sites sell the same homeowner to everyone in the zip code. By the time you call, she's comparing five quotes and the only thing left to compete on is price.",
    },
    {
      title: "No screening.",
      body: "Renters, out-of-area, \"just researching.\" A name and a phone number isn't a lead.",
    },
    {
      title: "Slow follow-up.",
      body: "A lead that waits an hour has already called someone else. Most shops find out about a new lead when they check their email that night.",
    },
  ],
};

export const howItWorks = {
  headline: "How it works.",
  highlight: "",
  steps: [
    {
      title: "We run the ads.",
      body: "Meta ads built for your market and your services. Every homeowner comes from your ads, so they're only talking to you.",
    },
    {
      title: "We screen every lead.",
      body: "Location, ownership, timeline and budget, before anyone reaches you. Tire kickers never make it through.",
    },
    {
      title: "You hear about it right away.",
      body: "The moment a homeowner qualifies, you're notified. Whether you make the calls yourself or hand them to a sales team, you're calling someone who's expecting you.",
    },
  ],
  guarantee:
    "10 qualified consultations in 60 days, or we keep working free. No fine print.",
};

export const about = {
  eyebrow: "About",
  headline: "One person. Not an account manager.",
  highlight: "One person.",
  body: "I'm Dominic Goetz, founder of Drivn Media. I'm based outside St. Louis, I specialize in remodelers, and I build and run every campaign myself. You call me, you get me.",
  /** The photo itself is src/assets/dominic-about-slight-zoom.jpg. */
  photoAlt: "Dominic Goetz, founder of Drivn Media",
};

export const book = {
  headline: "See if it's a fit.",
  highlight: "a fit.",
  sub: "Pick a time that works. I'll ask about your market and your capacity, and tell you straight whether this will work for you. Most calls take about 20 minutes. The slot is longer so we're not rushed.",
  /**
   * GoHighLevel calendar link. The embed script (form_embed.js) is loaded
   * from the same host as this link. If this is ever set to "" the section
   * shows a call button instead of the calendar.
   */
  calendarUrl:
    "https://link.drivnmedia.info/widget/bookings/estimate-generation-call-7a8ebf34-5bcb-4b6f-ace8-2958fc73ae36",
  /** Shown under the calendar only if it fails to load. */
  calendarFailText: "Calendar not loading?",
  calendarFailLink: "Open the booking page",
  noCalendarText: "Online booking is being set up. Call or text and we will find a time.",
  noCalendarCta: "Call",
  calendarTitle: "Book a call with Drivn Media",
  loadingLabel: "Loading the calendar",
  noScriptLabel: "Open the booking calendar",
  fallbackPrefix: "Prefer to talk now?",
  fallbackJoin: "or",
};

export const footer = {
  privacyLabel: "Privacy policy",
  rights: "Drivn Media. All rights reserved.",
};

export const privacy = {
  metaTitle: "Privacy Policy | Drivn Media",
  metaDescription:
    "How Drivn Media collects, uses and protects your information.",
  title: "Privacy Policy",
  updated: "Last updated: November 18, 2026",
  intro:
    "Drivn Media (\"we,\" \"us,\" or \"our\") respects your privacy. This policy explains how we collect, use, disclose and safeguard your information when you visit our website or use our services.",
  backLabel: "Back to home",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: ["We may collect the following types of information:"],
      list: [
        "Contact information: your name, email address and phone number when you book a call or contact us.",
        "Business information: details about your business that you share with us during a call or consultation.",
        "Usage data: pages visited, time spent on the site, browser type and referring URLs, collected automatically through cookies and similar tools.",
        "Communications: messages you send us by email, text or phone.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: ["We use the information we collect to:"],
      list: [
        "Respond to inquiries and provide our advertising and lead screening services",
        "Schedule and conduct calls and client meetings",
        "Send service-related communications and updates",
        "Improve our website and services",
        "Comply with our legal obligations",
      ],
    },
    {
      heading: "SMS and text message communications",
      paragraphs: [
        "By providing your phone number and opting in, you agree to receive SMS text messages from Drivn Media related to your inquiry, your appointment and our services. Message frequency may vary. Message and data rates may apply.",
        "You can opt out at any time by replying STOP to any message. For help, reply HELP. Opting out of text messages will not affect your ability to reach us by other means.",
        "Your mobile information, including your phone number and your SMS opt-in consent, will not be shared with third parties or affiliates for their marketing or promotional purposes. We may share this information only with the service providers that help us operate our business, such as our CRM and messaging platform, and they are not permitted to use it for their own marketing.",
      ],
      list: [],
    },
    {
      heading: "Cookies and tracking",
      paragraphs: [
        "Our website and the scheduling tool embedded in it may use cookies and similar technologies. You can disable cookies through your browser settings, though some features of the site may not work properly as a result.",
      ],
      list: [],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "We use trusted third-party platforms to run our business, including:",
      ],
      list: [
        "Meta (Facebook and Instagram): advertising campaign management",
        "LeadConnector / HighLevel: CRM, scheduling and messaging",
        "Cloudflare: website hosting and delivery",
      ],
      after:
        "These services have their own privacy policies, and we encourage you to review them. We do not sell your personal information to any third party.",
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We keep your personal information only as long as necessary to provide our services and meet our legal obligations. You may request deletion of your data at any time by contacting us.",
      ],
      list: [],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You have the right to access, correct or delete the personal information we hold about you. To exercise these rights, contact us using the details below.",
      ],
      list: [],
    },
    {
      heading: "Children's privacy",
      paragraphs: [
        "Our website and services are not directed to anyone under the age of 13, and we do not knowingly collect personal information from children.",
      ],
      list: [],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. Changes will be posted on this page with a revised date.",
      ],
      list: [],
    },
    {
      heading: "Contact us",
      paragraphs: [
        "If you have questions about this policy or how we handle your data, reach us by phone or email using the details at the bottom of this page.",
      ],
      list: [],
    },
  ] as {
    heading: string;
    paragraphs: string[];
    list: string[];
    after?: string;
  }[],
};
