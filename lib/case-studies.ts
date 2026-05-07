export type CaseStudyStatus = "live" | "coming-soon";

export type Metric = {
  value: string;
  unit?: string;
  label: string;
  source?: string;
};

export type Decision = {
  title: string;
  options: string;
  pick: string;
  reason: string;
  tradeoff: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  hero: string; // short punchy sentence
  company: string;
  role: string;
  team: string;
  timeline: string;
  scope: string;
  status: CaseStudyStatus;
  logo?: string;
  date: string; // ISO date — for sorting
  tags: string[];
  metrics: Metric[];
  context: string;
  problem: string;
  decisions?: Decision[];
  miss?: string; // what didn't work — honesty block
  learnings?: string[];
  externalLink?: { label: string; url: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "funnel-redesign",
    title: "Discovery Funnel Redesign",
    tagline: "Rebuilding how 20M users find events",
    hero: "A 26% conversion lift by rewiring AllEvents' discovery funnel from category-first to intent-first — shipped iteratively without breaking the flow for the 62% who were already converting.",
    company: "AllEvents",
    role: "Lead Product Designer — Discovery vertical",
    team: "1 designer · 2 engineers · 1 PM",
    timeline: "6 weeks · shipped Aug 2025",
    scope: "End-to-end design, A/B test design, rollout strategy",
    status: "live",
    date: "2025-08-15",
    tags: ["Growth", "B2C Mobile", "Discovery"],
    metrics: [
      {
        value: "26",
        unit: "%",
        label: "Funnel conversion lift",
        source: "AllEvents · 2025",
      },
      {
        value: "41",
        unit: "%",
        label: "Event detail tap rate increase",
        source: "Post-launch, 30-day window",
      },
      {
        value: "34",
        unit: "%",
        label: "Reduction in time-to-first-event",
        source: "Median across active users",
      },
      {
        value: "20",
        unit: "M",
        label: "Users on the redesigned surface",
        source: "Default flow since rollout",
      },
    ],
    context:
      "AllEvents is a 20M-user event discovery platform operating across 40,000+ cities. The app's Things to Do vertical is where users browse activities and experiences — but in mid-2025, we had a silent leak: most users were opening the app and leaving without finding anything.",
    problem:
      "38% of sessions ended on the category screen without a single event tap. Category browsing was failing because users weren't arriving with a category in mind — they were arriving bored. The existing architecture assumed intent we couldn't prove existed. Fixing it without breaking the flow for the 62% who did convert was the real constraint.",
    decisions: [
      {
        title: "Intent-first, not category-first",
        options:
          "We had three paths. (A) Redesign the category grid for better discoverability. (B) Replace categories with an editorial feed. (C) Keep categories but introduce an intent-first entry above them.",
        pick: "Option C.",
        reason:
          "User research showed two distinct mental models: people who knew what they wanted (minority) and people who wanted to be told what's fun (majority). Removing categories punished the first group. Adding an intent-first layer served the second without breaking the first.",
        tradeoff:
          "Longer first scroll. Slower to a cold-start event list. We shipped it anyway — the data said it was worth it.",
      },
      {
        title: "Ship iteratively, validate each surface",
        options:
          "We could ship the full redesign as one launch and pray, or break it into 4 shipped experiments.",
        pick: "Four experiments, six weeks.",
        reason:
          "Each behavior (intent selection, map toggle, event card redesign, detail flow) could independently pass or fail. Sequencing them let us kill bad ideas cheap instead of rolling back a big bang.",
        tradeoff:
          "Longer timeline. No single dramatic launch moment. I'd rather have the compounding metric than the dopamine of a big demo.",
      },
      {
        title: "Keep the old entry point alive during rollout",
        options:
          "Redirect all users to the new flow day one, or run both flows for 2 weeks.",
        pick: "Both flows, measured.",
        reason:
          "Conversion numbers lie when the baseline is shifting. Running both in parallel gave us clean A/B reads and a safe rollback if something regressed.",
        tradeoff:
          "Engineering complexity doubled for 2 weeks. Worth it.",
      },
    ],
    miss: "The first version of the intent-first entry tested worse on Android than iOS. We shipped assuming parity and had to roll back partial traffic for 4 days while we redesigned the touch targets for smaller screens. Should have tested cross-platform from day one.",
    learnings: [
      "Run the qualitative research before the quantitative framing. One user session in week one invalidated an assumption I'd have taken 3 weeks to catch from data alone.",
      "Instrument more granular events before shipping, not after. Half of our post-launch debugging was blind because the funnel events were too coarse to isolate where users were dropping.",
      "Don't fall in love with the hypothesis. Categories weren't broken — the assumption of user intent was. Subtle distinction, big consequence.",
    ],
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
      {
        value: "40",
        unit: "%",
        label: "Lift in session engagement for map users",
        source: "Post-launch, 30-day window",
      },
      {
        value: "2.3",
        unit: "×",
        label: "Events viewed per session vs. list view",
        source: "Dense metros cohort",
      },
      {
        value: "18",
        unit: "%",
        label: "Users who switch map → list → event",
        source: "Cross-surface behavior",
      },
    ],
    context:
      "AllEvents operates across 40,000+ cities. In dense metros like Mumbai, Bangalore, and London, the list view was hitting its limits — users scrolling past 200+ events in a single neighborhood. The question wasn't whether to build a map. It was how to build one that didn't punish the 60% of users who had no spatial intent.",
    problem:
      "List-based discovery scales linearly with density, but human attention doesn't. In high-density event clusters, users were scanning past events they'd actually want to attend because the list made everything equally weighted. Meanwhile, a literal 'map' solution risked replacing a working majority flow with an untested minority one.",
    decisions: [
      {
        title: "Map as a peer, not a replacement",
        options:
          "The obvious move was making the map the default view. It would have looked bold in the release notes.",
        pick: "Toggleable map, default to list.",
        reason:
          "60% of sessions came from users with no geographic intent — they wanted 'something fun tonight,' not 'things at this address.' Replacing the list would punish the majority flow to impress the minority.",
        tradeoff:
          "Slower demo. Better retention. We measured intent signals first, then tested geography-led defaults for specific user cohorts.",
      },
      {
        title: "Cluster by density, not by distance",
        options:
          "Standard map clustering groups pins by screen-distance — which breaks in dense areas where 40 events sit on the same block.",
        pick: "Cluster by event density + temporal proximity.",
        reason:
          "Users don't care that two events are 50 meters apart. They care whether both fit in their Friday night. Temporal clustering surfaced events in the same time window, which matched how people actually plan.",
        tradeoff:
          "More complex backend. Slightly slower initial render. We compensated with predictive pre-fetching for known dense zones.",
      },
    ],
    miss: "First version of the map view crashed the low-end Android experience — we were rendering too many pins at once on devices with 2GB RAM. Rolled back for 8 days, redesigned tile rendering to load lazily, then reshipped. First month, map-session conversion was ~15% lower than list-session conversion before clustering logic caught up.",
    learnings: [
      "Test on the worst device you plan to support, not the best. Low-end Android is 40% of our audience.",
      "Spatial UX is not a visual problem — it's an information hierarchy problem rendered on a map. I treated it as the former for two weeks before realizing the difference.",
    ],
    externalLink: {
      label: "Read the full launch write-up on Medium",
      url: "https://medium.com/@vhvhs2013/introducing-map-feature-809ee53ce5ac",
    },
  },
  {
    slug: "viral-contest",
    title: "Drive 24K+ organic downloads on AllEvents",
    tagline: "Global event discovery platform with 20M+ users across 40,000 cities",
    hero: "Redesigning the viral loop mechanic to turn passive sharing into active referrals for app growth.",
    company: "AllEvents",
    role: "Product Designer",
    team: "1 Designer (me), 1 PM, 3 Engineers, Marketing",
    timeline: "2 weeks · Concept → live MVP",
    scope: "Loop mechanic design, share flow, entry architecture",
    status: "live",
    logo: "/images/logos/alleventslogo.png",
    date: "2025-11-10",
    tags: ["Growth", "Viral Loops", "B2C Mobile"],
    metrics: [
      {
        value: "24",
        unit: "K+",
        label: "Organic app downloads · 76% referral rate · ₹14 CPA",
        source: "Attribution: AllEvents internal, Nov '25",
      },
      {
        value: "76",
        unit: "%",
        label: "Referral rate (up from 28%)",
        source: "Iteration 02 outcome",
      },
      {
        value: "14",
        unit: "₹",
        label: "Cost Per Acquisition (CPA)",
        source: "Pure product-led loop",
      },
    ],
    context:
      "Users rarely attend events alone in real life — they almost always go with friends. But inside the AllEvents app, they were browsing and RSVPing by themselves. When users shared event links with friends, those friends opened them on the web, not the app. This meant we were missing a major opportunity for organic app downloads. Instead of forcing downloads, we needed a way to help users naturally bring their friends into the app, so their real-world circles could exist inside AllEvents too.",
    problem:
      "Most users attend events with friends who are not yet on AllEvents. Our goal was to motivate existing users to bring at least one friend into the AllEvents app to drive organic installs through friend-driven sharing. Our core hypothesis: If we reward or motivate users for bringing their friends to the app, installs will grow organically — and as friend circles form inside the app, users may return more frequently.",
    decisions: [
      {
        title: "Tradeoffs we considered: Contests vs. Referrals",
        options:
          "Before landing on contests, we weighed three alternatives: (1) Referral cashback (₹50 per friend), (2) Group discounts, (3) Invite-only beta features.",
        pick: "Contests won.",
        reason:
          "The emotional payoff (winning tickets to a dream event like Coldplay or Samay Raina) was disproportionately bigger than the effort (inviting a friend). It tied virality to our core product — events — not a transactional layer like cashback which felt like 'selling' friends.",
        tradeoff:
          "More effort to manage prizes and verify entries, but higher emotional engagement.",
      },
      {
        title: "Iteration 02: Conditional Entry",
        options:
          "In Iteration 01, we saw only 28% of users brought a friend because sharing was passive. For Iteration 02, we could either increase rewards or change the entry requirement.",
        pick: "Made contest entry conditional on inviting at least one friend.",
        reason:
          "Users only got their entry once a friend installed the app and joined the contest. This turned passive 'broadcasters' into active 'recruiters'. The 28% number was our most useful failure — it showed that sharing didn't equal recruiting.",
        tradeoff:
          "Higher friction for entry, but 76% of users actually brought a friend.",
      },
    ],
    miss: "What didn't work: (1) Mid-contest drop-off was severe — weeks 2–3 saw participation drop ~40% because we lacked engagement loops. (2) Tier-2 cities like Ahmedabad outperformed Mumbai despite being smaller, disproving our 'bigger is better' assumption. (3) The leaderboard created winners' tunnel vision — top-5 users invited 10x more while the middle plateaued.",
    learnings: [
      "Virality isn't a feature. It's a constraint. The moment we made 'bring one friend' a requirement instead of a request, the numbers fixed themselves.",
      "Sold-out and iconic events (Coldplay, Samay Raina) performed best as they provided strongest motivation.",
      "Tier-2 cities have stronger word-of-mouth velocity for viral loops.",
    ],
    sections: [
      {
        id: "outline",
        image: "/images/case-studies/viral-contest/contest.gif",
        imageBefore: "/images/case-studies/viral-contest/contests.png",
      },
      {
        id: "about",
        title: "About AllEvents",
        content: "<a href='https://allevents.in' target='_blank' class='text-black/80 hover:text-black underline underline-offset-4 decoration-black/20 hover:decoration-black/40 transition-all'>AllEvents</a> is a global event discovery and ticketing platform that helps people find and attend events around them — from concerts and meetups to workshops and festivals. You can explore it on the App Store and Play Store.",
        metadata: [
          {
            label: "My role",
            value: "Led end-to-end research and design for this viral growth experiment, collaborating with cross-functional teams to drive app acquisition through organic friend networks."
          },
          {
            label: "Team",
            value: [
              "<a href='https://www.linkedin.com/in/achyuth7/' target='_blank' class='hover:text-black underline underline-offset-4 decoration-black/10 hover:decoration-black/30 transition-all'>Achyuth Yarramsetti</a> (Lead Product Designer & Product Owner)",
              "<a href='https://www.linkedin.com/in/navaghandabhi/' target='_blank' class='hover:text-black underline underline-offset-4 decoration-black/10 hover:decoration-black/30 transition-all'>Navghan Dabhi</a> (Lead App Developer)",
              "<a href='https://www.linkedin.com/in/kush-malukani-0378831a1/' target='_blank' class='hover:text-black underline underline-offset-4 decoration-black/10 hover:decoration-black/30 transition-all'>Kush Malukani</a> (Product Marketing Executive)"
            ]
          }
        ]
      },
      {
        id: "challenge",
        title: "Let’s break down the problem",
        bgColor: "#F8F8F8",
        noContainer: true,
        fullWidth: false,
        content: "<strong>User behaviour</strong><br/><br/>In the real world, <strong>people rarely attend events alone</strong> — they plan and experience them with friends. Yet, inside AllEvents, this journey was surprisingly lonely. Users were RSVPing in isolation, while shared links often led friends to the web instead of the app.",
        gridImages: [
          "/images/case-studies/viral-contest/attendingwithfriends.png",
          "/images/case-studies/viral-contest/attendingwithfriends2.png",
          "/images/case-studies/viral-contest/attendingwithfriends3.png",
          "/images/case-studies/viral-contest/attendingwithfriends4.png"
        ],
        gridCaveat: "People going alone to events is very very rare use case",
        secondaryContent: "<strong>Problem</strong><br/><br/>This fragmentation meant missing a major opportunity for <strong>organic app downloads</strong>. Instead of forcing installs, we needed a way to naturally bring <strong>real-world circles into the app</strong>, allowing friend groups to exist inside AllEvents.<br/><br/>This insight became the foundation for a new growth initiative to make AllEvents viral within friend groups. If we could encourage users to bring their friends onto the app, we could:",
        quote: "Most users attend events with friends who are not yet on AllEvents."
      },
      {
        id: "goal",
        title: "The Goal",
        content: "Motivate existing users to bring at least one friend into the AllEvents app to drive organic installs through friend-driven sharing. Our core hypothesis: <strong>If we reward or motivate users for bringing their friends to the app, installs will grow organically</strong> — and as friend circles form inside the app, users may return more frequently.",
        statementsTitle: "Defined Problem Statement",
        statements: [
          {
            label: "Business Statement",
            text: "Drive organic acquisition and retention by motivating existing users to bring their friends into the app ecosystem."
          },
          {
            label: "User Statement",
            text: "Sharing was happening, but friends were getting stuck on the web. We needed an incentivized, frictionless flow that naturally pulls these real-world social circles into the app."
          }
        ]
      },
      {
        id: "ideation",
        title: "Ideation & Early Direction",
        content: "<span class='text-[32px] md:text-[42px] text-black/20 italic leading-[1.1] mb-10 block font-sans tracking-tight'>How might we design viral incentives that encourage users to invite their friends, turning social connections into a driver for organic app growth?</span>To explore this, we began with multiple directions for social-driven acquisition — referral bonuses, invite-based rewards, and group discounts. While each had potential, they felt transactional and didn't match how people emotionally experience events. Events are social, memorable, shared with friends — not coupons.",
        image: "/images/case-studies/viral-contest/ideation.png",
        noContainer: true
      },
      {
        id: "breakthrough",
        theme: "dark",
        title: "The Breakthrough",
        content: "Then came the insight: Users love iconic events — Coldplay concerts, Samay Raina shows, major festivals — but these often sell out or get too expensive. That led to one powerful idea: 'What if users could win tickets to these big events simply by inviting their friends?' Even if the event wasn't listed on AllEvents, the excitement around it was enough to drive massive sharing. It tied together: Emotional appeal — win tickets to a dream event, and Natural social behavior — invite friends to increase your chances. Contests became the strongest viral mechanism on the table.",
        marqueeImages: [
          "/images/case-studies/viral-contest/breakthrough1.png",
          "/images/case-studies/viral-contest/breakthrough2.png",
          "/images/case-studies/viral-contest/breakthrough3.png",
          "/images/case-studies/viral-contest/breakthrough4.png",
          "/images/case-studies/viral-contest/breakthrough5.png",
          "/images/case-studies/viral-contest/breakthrough6.png"
        ]
      },
      {
        id: "context-details",
        title: "Context — What the Contest Is & How It Works",
        content: "We built a simple contest around a highly popular or sold-out event — something users genuinely cared about.<br/><br/>For each contest, we selected one iconic event and secured four tickets through our contacts: two winners, two tickets each.<br/><br/>Users earned points by participating and inviting friends. At the contest deadline, the top two scorers won the tickets. A clear event + a clear reward + a simple scoring system made the contest instantly understandable.",
        image: "/images/case-studies/viral-contest/pointssystem.png",
        imageTitle: "Point System",
        noContainer: true,
        subContent: "This balanced effort and reward — users got initial credit for participation but were strongly motivated to invite more friends to climb the leaderboard. The simplicity ensured anyone could understand it instantly and share without confusion.<br/><br/>To maintain credibility, we verified each entry through device IDs, email, name, and phone number. Suspicious or duplicate entries were flagged and disqualified, keeping the contest clean and trustworthy."
      },
      {
        id: "execution",
        title: "Execution Plan",
        content: "Ideation took just two days — a fast, structured sprint across product, design, and engineering. The main technical challenge was enabling multiple contests to go live dynamically without requiring new app releases. To solve this, we designed a contest management dashboard powered by backend APIs, allowing the team to create and manage campaigns in real time.<br/><br/>In just two weeks, we moved from concept → design → live MVP — proving how fast, lean experiments can validate viral growth ideas."
      },
      {
        id: "flow",
        title: "User Flow",
        subtitle: "Contest Discovery → Participation → Virality",
        content: "To support a smooth and viral contest experience, we designed a clear, linear flow that guides users from discovering the contest → downloading the app → participating → inviting friends. Every touchpoint — web, app, or external channel — was intentionally crafted to contribute to app installs, participation, and referrals.",
        image: "/images/case-studies/viral-contest/userflow-1.png",
        noContainer: true,
        fullWidth: true
      },
      {
        id: "iteration-01",
        title: "Iteration 01 — MVP Design",
        image: "/images/case-studies/viral-contest/iteration1.png",
        noContainer: true,
        fullWidth: true,
        content: "To drive traffic into the contest flow, we activated a set of high-impact touchpoints: Emailers, Website Contest Page, Social Media, and Meta Ads."
      },
      {
        id: "impact-01",
        title: "Impact — Iteration 01",
        image: "/images/case-studies/viral-contest/Impact-1.png",
        noContainer: true,
        fullWidth: true,
        content: "We launched 8 contests across Mumbai & Ahmedabad during August and September."
      },
      {
        id: "thinking",
        title: "Thinking",
        image: "/images/case-studies/viral-contest/userflow-2.png",
        noContainer: true,
        fullWidth: true,
        content: "The 28% number was the most useful failure of the project. Going in, we'd assumed that sharing would equal recruiting — that if users shared a contest link, their friends would naturally join. The data said something else: users were broadcasting, not inviting. Sharing felt like a low-effort, low-stakes social signal — closer to retweeting than to actually asking a friend to come along. The fix wasn't to motivate users harder. It was to remove sharing as a passive choice altogether. If 'bring one friend' became the entry requirement instead of an optional bonus, we'd convert broadcasters into recruiters."
      },
      {
        id: "iteration-02",
        title: "Iteration 02 — The Solution",
        image: "/images/case-studies/viral-contest/iteration2.png",
        noContainer: true,
        fullWidth: true,
        content: "We made contest entry conditional on inviting at least one friend. Users only got their entry once a friend installed the app and joined the contest. This turned passive sharing into active referral. We also improved the flow, UI clarity, and leaderboard to make participation more exciting and gamified."
      },
      {
        id: "impact-02",
        title: "Impact — Iteration 02",
        image: "/images/case-studies/viral-contest/Impact-2.png",
        noContainer: true,
        fullWidth: true,
        content: "We launched 8 contests in Mumbai & Ahmedabad again in October."
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
    context:
      "Full case study launching February 2026 after the public rollout.",
    problem: "",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.status === "live")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
