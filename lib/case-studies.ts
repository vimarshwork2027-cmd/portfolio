export interface Metric {
  value: string;
  unit: string;
  label: string;
  source: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  hero: string;
  company: string;
  role: string;
  team: string;
  timeline: string;
  scope: string;
  status: "live" | "coming-soon";
  date: string;
  tags: string[];
  metrics: Metric[];
  context: string;
  problem: string;
  decisions: {
    title: string;
    options: string;
    pick: string;
    reason: string;
    tradeoff: string;
  }[];
  miss: string;
  learnings: string[];
  sections?: {
    id: string;
    title: string;
    content?: string;
    bullets?: { text: string; bold?: string }[];
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "funnel-redesign",
    title: "Discovery Funnel Redesign",
    tagline: "Rebuilding how 20M users find events",
    hero: "A 26% conversion lift by rewiring AllEvents' discovery funnel from category-first to intent-first — shipped iteratively without breaking the flow for the 62% who were already converting.",
    company: "AllEvents",
    role: "Lead Product Designer · Discovery vertical",
    team: "1 designer · 2 engineers · 1 PM",
    timeline: "6 weeks · shipped Aug 2025",
    scope: "End-to-end design, A/B test design, rollout strategy",
    status: "live",
    date: "2025-08-15",
    tags: ["Growth", "B2C Mobile", "Discovery"],
    metrics: [
      { value: "26", unit: "%", label: "Funnel conversion lift", source: "AllEvents · 2025" },
      { value: "41", unit: "%", label: "Event detail tap rate increase", source: "Post-launch, 30-day window" },
      { value: "34", unit: "%", label: "Reduction in time-to-first-event", source: "Median across active users" },
      { value: "20", unit: "M", label: "Users on the redesigned surface", source: "Default flow since rollout" }
    ],
    context: "AllEvents is a 20M-user event discovery platform operating across 40,000+ cities. The app's Things to Do vertical is where users browse activities and experiences — but in mid-2025, we had a silent leak: most users were opening the app and leaving without finding anything.",
    problem: "38% of sessions ended on the category screen without a single event tap. Category browsing was failing because users weren't arriving with a category in mind — they were arriving bored. The existing architecture assumed intent we couldn't prove existed. Fixing it without breaking the flow for the 62% who did convert was the real constraint.",
    decisions: [
      {
        title: "Intent-first, not category-first",
        options: "We had three paths. (A) Redesign the category grid for better discoverability. (B) Replace categories with an editorial feed. (C) Keep categories but introduce an intent-first entry above them.",
        pick: "Option C.",
        reason: "User research showed two distinct mental models: people who knew what they wanted (minority) and people who wanted to be told what's fun (majority). Removing categories punished the first group. Adding an intent-first layer served the second without breaking the first.",
        tradeoff: "Longer first scroll. Slower to a cold-start event list. We shipped it anyway — the data said it was worth it."
      },
      {
        title: "Ship iteratively, validate each surface",
        options: "We could ship the full redesign as one launch and pray, or break it into 4 shipped experiments.",
        pick: "Four experiments, six weeks.",
        reason: "Each behavior (intent selection, map toggle, event card redesign, detail flow) could independently pass or fail. Sequencing them let us kill bad ideas cheap instead of rolling back a big bang.",
        tradeoff: "Longer timeline. No single dramatic launch moment. I'd rather have the compounding metric than the dopamine of a big demo."
      },
      {
        title: "Keep the old entry point alive during rollout",
        options: "Redirect all users to the new flow day one, or run both flows for 2 weeks.",
        pick: "Both flows, measured.",
        reason: "Conversion numbers lie when the baseline is shifting. Running both in parallel gave us clean A/B reads and a safe rollback if something regressed.",
        tradeoff: "Engineering complexity doubled for 2 weeks. Worth it."
      }
    ],
    miss: "The first version of the intent-first entry tested worse on Android than iOS. We shipped assuming parity and had to roll back partial traffic for 4 days while we redesigned the touch targets for smaller screens. Should have tested cross-platform from day one.",
    learnings: [
      "Run the qualitative research before the quantitative framing. One user session in week one invalidated an assumption I'd have taken 3 weeks to catch from data alone.",
      "Instrument more granular events before shipping, not after. Half of our post-launch debugging was blind because the funnel events were too coarse to isolate where users were dropping.",
      "Don't fall in love with the hypothesis. Categories weren't broken — the assumption of user intent was. Subtle distinction, big consequence."
    ]
  },
  {
    slug: "map-discovery",
    title: "Map-Based Event Discovery",
    tagline: "A spatial layer over 40,000 cities",
    hero: "Designing a map-first discovery experience that turned 'what's near me' from a filter into a first-class surface — and shipped it without breaking the list-first flow that 60% of users still prefer.",
    company: "AllEvents",
    role: "Lead Product Designer",
    team: "1 designer · 2 engineers · 1 PM · 1 backend",
    timeline: "8 weeks · shipped Jan 2026",
    scope: "End-to-end design, clustering logic spec, empty states",
    status: "live",
    date: "2026-01-20",
    tags: ["Growth", "B2C Mobile", "Spatial UX"],
    metrics: [
      { value: "40", unit: "%", label: "Lift in session engagement for map users", source: "Post-launch, 30-day window" },
      { value: "2.3", unit: "×", label: "Events viewed per session vs. list view", source: "Dense metros cohort" },
      { value: "18", unit: "%", label: "Users who switch map → list → event", source: "Cross-surface behavior" }
    ],
    context: "AllEvents operates across 40,000+ cities. In dense metros like Mumbai, Bangalore, and London, the list view was hitting its limits — users scrolling past 200+ events in a single neighborhood. The question wasn't whether to build a map. It was how to build one that didn't punish the 60% of users who had no spatial intent.",
    problem: "List-based discovery scales linearly with density, but human attention doesn't. In high-density event clusters, users were scanning past events they'd actually want to attend because the list made everything equally weighted. Meanwhile, a literal 'map' solution risked replacing a working majority flow with an untested minority one.",
    decisions: [
      {
        title: "Map as a peer, not a replacement",
        options: "The obvious move was making the map the default view. It would have looked bold in the release notes.",
        pick: "Toggleable map, default to list.",
        reason: "60% of sessions came from users with no geographic intent — they wanted 'something fun tonight,' not 'things at this address.' Replacing the list would punish the majority flow to impress the minority.",
        tradeoff: "Slower demo. Better retention. We measured intent signals first, then tested geography-led defaults for specific user cohorts."
      },
      {
        title: "Cluster by density, not by distance",
        options: "Standard map clustering groups pins by screen-distance — which breaks in dense areas where 40 events sit on the same block.",
        pick: "Cluster by event density + temporal proximity.",
        reason: "Users don't care that two events are 50 meters apart. They care whether both fit in their Friday night. Temporal clustering surfaced events in the same time window, which matched how people actually plan.",
        tradeoff: "More complex backend. Slightly slower initial render. We compensated with predictive pre-fetching for known dense zones."
      }
    ],
    miss: "First version of the map view crashed the low-end Android experience — we were rendering too many pins at once on devices with 2GB RAM. Rolled back for 8 days, redesigned tile rendering to load lazily, then reshipped. First month, map-session conversion was ~15% lower than list-session conversion before clustering logic caught up.",
    learnings: [
      "Test on the worst device you plan to support, not the best. Low-end Android is 40% of our audience.",
      "Spatial UX is not a visual problem — it's an information hierarchy problem rendered on a map. I treated it as the former for two weeks before realizing the difference."
    ],
    externalLink: {
      label: "Read the full launch write-up on Medium",
      url: "https://medium.com/@vhvhs2013/introducing-map-feature-809ee53ce5ac"
    }
  },
  {
    slug: "viral-contest",
    title: "Ticket Giveaway Growth Loop",
    tagline: "One contest. 24K installs. ₹0 paid spend.",
    hero: "A product-led growth experiment that turned 'win free tickets' into AllEvents' most efficient acquisition channel of the quarter — every user became a promoter.",
    company: "AllEvents",
    role: "Product Designer · Growth loop design",
    team: "1 designer · 1 engineer · growth team",
    timeline: "3 weeks · ran Nov 2025",
    scope: "Loop mechanic design, share flow, entry architecture",
    status: "live",
    date: "2025-11-10",
    tags: ["Growth", "Viral Loops", "B2C Mobile"],
    metrics: [
      { value: "24", unit: "K", label: "Organic app installs from a single campaign", source: "Attribution: AllEvents internal, Nov '25" },
      { value: "15", unit: "K", label: "Contest participants", source: "Active entries during campaign" },
      { value: "29", unit: "%", label: "Of all platform installs in the window", source: "Share of total install volume" },
      { value: "0", unit: "₹", label: "Paid acquisition spend", source: "Pure product-led loop" }
    ],
    context: "AllEvents' paid acquisition channels were getting more expensive as the year closed — CPIs trending up across Meta and Google. The growth team asked: can we build an organic acquisition spike without buying users?",
    problem: "Most contest-based growth loops fail because the entry mechanic is transactional — a user enters, gets their number, leaves. For a contest to drive installs, the act of entering has to be the act of spreading. The design challenge: how do you make sharing feel like winning, not working?",
    decisions: [
      {
        title: "Share-to-enter, not share-to-boost",
        options: "Two models. (A) Enter the contest, then optionally share to get extra entries. (B) Sharing IS the entry — no share, no entry.",
        pick: "B, with a twist.",
        reason: "Model A treats sharing as a tax. Model B treats sharing as the game. Each participant had to get 3 friends to install the app to lock their entry — turning every participant into an acquisition agent with genuine incentive.",
        tradeoff: "Higher friction meant fewer total entries, but far higher install-per-entry ratio. We cared about installs, not vanity."
      },
      {
        title: "Social proof in-product, not just in-share",
        options: "Show leaderboards and 'your friends are playing' signals inside the app, or keep the contest clean.",
        pick: "Social proof inside the app.",
        reason: "Seeing friends' names in the leaderboard made the contest feel real and ongoing. It extended the engagement window from '3 days of sharing' to '3 weeks of checking back.'",
        tradeoff: "Privacy implications — we opted users in clearly and showed only first-name initials."
      }
    ],
    miss: "The share message in version one was too generic — 'Join me on AllEvents' — and had a 1.8% install-to-share click rate. We shipped a dynamic message with the sender's name and a specific ticket they could win, and that jumped to 6.2%. If I'd A/B tested message copy before launch instead of after, we'd have captured 2x more installs in the early days.",
    learnings: [
      "The share message is the product. Every other surface is secondary if the outbound message doesn't convert.",
      "Leaderboards extend campaigns. The last 5 days of the contest had higher engagement than the first 5 because of social competition."
    ],
    sections: [
      {
        id: "outline",
        image: "/images/case-studies/viral-contest/contest.gif",
        imageBefore: "/images/case-studies/viral-contest/contests.png"
      },
      {
        id: "about",
        title: "About AllEvents",
        content: "<a href='https://allevents.in' target='_blank' class='text-black/80 hover:text-black underline underline-offset-4 decoration-black/20 hover:decoration-black/40 transition-all'>AllEvents</a> is a global event discovery and ticketing platform that helps people find and attend events around them — from concerts and meetups to workshops and festivals. You can explore it on the App Store and Play Store. As a Product Designer & Product Owner at AllEvents, I led end-to-end research, design, and delivery of this viral growth experiment — collaborating closely with engineering and marketing to boost app acquisition and engagement by activating friend networks."
      },
      {
        id: "breakdown",
        title: "Let's break it down",
        content: "Users rarely attend events alone in real life — they almost always go with friends. But inside the AllEvents app, they were browsing and RSVPing by themselves. When users shared event links with friends, those friends opened them on the web, not the app. This meant we were missing a major opportunity for organic app downloads.",
        quote: "Most users attend events with friends who are not yet on AllEvents.",
        gridCaveat: "Real world behaviour",
        gridImages: [
          "/images/case-studies/viral-contest/attendingwithfriends.png",
          "/images/case-studies/viral-contest/attendingwithfriends2.png",
          "/images/case-studies/viral-contest/attendingwithfriends3.png",
          "/images/case-studies/viral-contest/attendingwithfriends4.png"
        ]
      },
      {
        id: "goal",
        title: "The Goal",
        content: "Motivate existing users to bring at least one friend into the AllEvents app to drive organic installs through friend-driven sharing. Our core hypothesis: If we reward or motivate users for bringing their friends to the app, installs will grow organically — and as friend circles form inside the app, users may return more frequently.",
        image: "/images/case-studies/viral-contest/goal.png",
        noContainer: true
      },
      {
        id: "system-loop",
        title: "How the system worked",
        content: "",
        steps: [
          { label: "Join Contest", badge: "Free Entry" },
          { label: "Earn Initial Points", badge: "+5 pts" },
          { label: "Invite Friends", badge: "+5 pts / ref" },
          { label: "Climb Leaderboard", badge: "📈 GROWTH" },
          { label: "Win Event Tickets", badge: "🎟️" }
        ],
        highlightInsight: "The system rewarded participation — but growth came from social momentum."
      },
      {
        id: "ideation",
        title: "Ideation & Early Direction",
        content: "<span class='text-[32px] md:text-[42px] text-black/20 italic leading-[1.1] mb-10 block font-sans tracking-tight'>How might we design viral incentives that encourage users to invite their friends, turning social connections into a driver for organic app growth?</span>We explore multiple directions for social-driven acquisition — referral bonuses, invite-based rewards, and group discounts. While each had potential, they felt transactional and didn't match how people emotionally experience events. Events are social, memorable, shared with friends — not coupons.",
        image: "/images/case-studies/viral-contest/ideation.png",
        noContainer: true
      },
      {
        id: "breakthrough",
        theme: "dark",
        title: "The Breakthrough",
        content: "<div class='label-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 mb-6'>The Insight</div><div class='text-[24px] md:text-[30px] font-medium leading-[1.3] tracking-tight mb-8'>People don't share events for discounts. They share <strong>experiences worth talking about.</strong></div><div class='flex flex-wrap gap-x-6 gap-y-2 text-[15px] opacity-50 mb-16 font-medium'>Coldplay concerts<span class='opacity-40'>·</span>Samay Raina shows<span class='opacity-40'>·</span>Major festivals<span class='opacity-40'>·</span>The kind of events people dream of attending.</div><div class='label-mono text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 mb-6'>That led to one key idea</div><blockquote class='border-l-2 border-white/20 pl-10 py-4 my-16 italic text-[20px] md:text-[24px] font-medium leading-relaxed opacity-90'>What if users could win tickets to iconic events simply by inviting friends?</blockquote><div class='text-[16px] opacity-60 leading-relaxed'>Even if the event wasn't hosted on AllEvents, the emotional pull around it was strong enough to drive sharing naturally.</div>"
      },
      {
        id: "mechanics",
        title: "Contest Mechanics",
        content: "<strong>The core idea</strong><br/><br/>We built a contest around highly desirable events — concerts, comedy shows, and sold-out experiences users genuinely cared about. For each contest, we secured 4 tickets and offered them as prizes for the top participants.<br/><br/>Users earned points by joining and inviting friends. The top two scorers at the deadline won two tickets each. A clear event + a clear reward + a simple scoring system made the contest instantly understandable.",
        image: "/images/case-studies/viral-contest/pointssystem.png",
        noContainer: true,
        subContent: "To maintain credibility, we verified each entry through device IDs, email, name, and phone number. Suspicious or duplicate entries were flagged and disqualified, keeping the contest clean and trustworthy."
      },
      {
        id: "flow",
        title: "User Flow",
        subtitle: "Contest Discovery → Participation → Virality",
        content: "To support a smooth and viral contest experience, we designed a clear, linear flow that guides users from discovering the contest → downloading the app → participating → inviting friends. Every touchpoint — web, app, or external channel — was intentionally crafted to contribute to app installs, participation, and referrals.",
        image: "/images/case-studies/viral-contest/userflow-1.png",
        fullWidth: true
      },
      {
        id: "iteration-01",
        title: "Iteration 01 — MVP Design",
        image: "/images/case-studies/viral-contest/iteration1.png",
        noContainer: true,
        content: "To drive traffic into the contest flow, we activated a set of high-impact touchpoints: Emailers, Website Contest Page, Social Media, and Meta Ads."
      },
      {
        id: "impact-01",
        title: "Impact — Iteration 01",
        content: "We launched 8 contests across Mumbai & Ahmedabad during August and September.",
        image: "/images/case-studies/viral-contest/Impact-1.png"
      },
      {
        id: "iterations",
        title: "2nd Iteration",
        content: "The 28% number was the most useful failure of the project. Going in, we'd assumed that sharing would equal recruiting — that if users shared a contest link, their friends would naturally join. The data said something else: users were broadcasting, not inviting. Sharing felt like a low-effort, low-stakes social signal — closer to retweeting than to actually asking a friend to come along. The fix wasn't to motivate users harder. It was to remove sharing as a passive choice altogether. If 'bring one friend' became the entry requirement instead of an optional bonus, we'd convert broadcasters into recruiters."
      },
      {
        id: "iteration-02",
        title: "Iteration 02 — The Solution",
        image: "/images/case-studies/viral-contest/beforevsafter.png",
        content: "We made contest entry conditional on inviting at least one friend. Users only got their entry once a friend installed the app and joined the contest. This turned passive sharing into active referral. We also improved the flow, UI clarity, and leaderboard to make participation more exciting and gamified.",
        image2: "/images/case-studies/viral-contest/userflow-2.png",
        image3: "/images/case-studies/viral-contest/iteration2.png"
      },
      {
        id: "impact-02",
        title: "Impact — Iteration 02",
        image: "/images/case-studies/viral-contest/impact-2.png",
        noContainer: true,
        fullWidth: true,
        content: "We launched 8 contests in Mumbai & Ahmedabad again in October."
      },
      {
        id: "comparison",
        title: "Before vs After",
        image: "/images/case-studies/viral-contest/beforevsafter.png",
        noContainer: true
      },
      {
        id: "learnings-01",
        title: "Key Learnings",
        bullets: [
          { text: " (higher participation & sharing).", bold: "Bigger events → better results" },
          { text: "Sold-out events perform the best, strongest motivation to join." },
          { text: "Week 1 and Week 4 of a contest deliver the highest engagement." },
          { text: "Users are sharing, but not motivated enough to bring their friends into the app." },
          { text: ", limiting virality.", bold: "Only 28% users brought at least one friend" }
        ]
      },
      {
        id: "future",
        title: "Future Plan",
        content: "With more friend circles entering the app, we observed higher RSVP notifications and increased app launches. The next step is to understand how these circles behave and leverage their group activity to improve retention. Next focus areas: Study engagement patterns, identify triggers, build group-activation features, and A/B test reward formats."
      },
      {
        id: "closing",
        title: "The biggest lesson",
        content: "Virality isn't a feature. It's a constraint. The moment we made 'bring one friend' a requirement instead of a request, the numbers fixed themselves."
      }
    ]
  },
  {
    slug: "things-to-do",
    title: "Things to Do Tab",
    tagline: "A new tab. A whole new way to discover what's around you.",
    hero: "Designing AllEvents' Things to Do vertical from scratch — a dedicated discovery surface for activities and experiences, moving beyond events-only.",
    company: "AllEvents",
    role: "Lead Product Designer",
    team: "1 designer · 3 engineers · 1 PM",
    timeline: "Shipping Feb 2026",
    scope: "Information architecture, content taxonomy, discovery mechanics",
    status: "coming-soon",
    date: "2026-02-15",
    tags: ["Growth", "B2C Mobile", "0-to-1"],
    metrics: [],
    context: "Full case study launching February 2026 after the public rollout.",
    problem: ""
  }
];

export const getCaseStudy = (slug: string) => {
  return caseStudies.find((cs) => cs.slug === slug);
};

export const getPublishedCaseStudies = () => {
  return caseStudies.filter((cs) => cs.status === "live").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAllCaseStudies = () => {
  return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
