// AdTech Quiz Data - 10 Topics with 5 Questions Each
const quizData = {
  topics: [
    {
      id: "advertising-basics",
      name: "Advertising Basics",
      icon: "📊",
      description: "Fundamental concepts of digital advertising",
      questions: [
        {
          question: "What does CPM stand for in digital advertising?",
          options: [
            "Cost Per Mile",
            "Cost Per Thousand Impressions",
            "Cost Per Million",
            "Cost Per Marketing",
          ],
          correct: 1,
          explanation:
            "CPM stands for Cost Per Mille (thousand in Latin), which means Cost Per Thousand Impressions.",
        },
        {
          question:
            "Which metric measures the percentage of users who click on an ad?",
          options: [
            "Conversion Rate",
            "Click-Through Rate (CTR)",
            "Bounce Rate",
            "Engagement Rate",
          ],
          correct: 1,
          explanation:
            "Click-Through Rate (CTR) measures the ratio of users who click on an ad to the number of total users who view it.",
        },
        {
          question: "What is the primary goal of display advertising?",
          options: [
            "Direct sales only",
            "Brand awareness and visibility",
            "Email collection",
            "App downloads only",
          ],
          correct: 1,
          explanation:
            "Display advertising primarily aims to increase brand awareness and visibility, though it can have other goals too.",
        },
        {
          question: "What does CPC pricing model stand for?",
          options: [
            "Cost Per Click",
            "Cost Per Customer",
            "Cost Per Campaign",
            "Cost Per Conversion",
          ],
          correct: 0,
          explanation:
            "CPC stands for Cost Per Click, where advertisers pay each time a user clicks on their ad.",
        },
        {
          question: "Which type of ad appears before video content?",
          options: ["Banner Ad", "Native Ad", "Pre-roll Ad", "Interstitial Ad"],
          correct: 2,
          explanation:
            "Pre-roll ads are video advertisements that play before the main video content.",
        },
      ],
    },
    {
      id: "history-adtech",
      name: "History of AdTech",
      icon: "🏛️",
      description: "Evolution of advertising technology",
      questions: [
        {
          question: "When was the first banner ad displayed on the internet?",
          options: ["1990", "1994", "1998", "2000"],
          correct: 1,
          explanation:
            "The first banner ad was displayed in 1994 on HotWired.com for AT&T.",
        },
        {
          question: "Which company launched the first major ad network?",
          options: ["Google", "DoubleClick", "Yahoo", "Microsoft"],
          correct: 1,
          explanation:
            "DoubleClick, founded in 1996, was one of the first major ad networks before being acquired by Google.",
        },
        {
          question: "When did Google launch AdWords (now Google Ads)?",
          options: ["1998", "2000", "2003", "2005"],
          correct: 1,
          explanation:
            "Google AdWords was launched in October 2000, revolutionizing search advertising.",
        },
        {
          question: "What was the first form of programmatic advertising?",
          options: [
            "Real-time bidding",
            "Ad exchanges",
            "Direct ad serving",
            "Social media ads",
          ],
          correct: 2,
          explanation:
            "Direct ad serving was the earliest form, allowing automated delivery of ads to websites.",
        },
        {
          question: "When did Real-Time Bidding (RTB) become mainstream?",
          options: ["2005", "2007", "2009", "2012"],
          correct: 2,
          explanation:
            "RTB became mainstream around 2009, transforming programmatic advertising.",
        },
      ],
    },
    {
      id: "ad-ecosystem",
      name: "Ad Ecosystem",
      icon: "🌍",
      description: "Players and platforms in digital advertising",
      questions: [
        {
          question: "What is a DSP in the ad ecosystem?",
          options: [
            "Digital Service Provider",
            "Demand-Side Platform",
            "Data Storage Platform",
            "Direct Sale Platform",
          ],
          correct: 1,
          explanation:
            "DSP (Demand-Side Platform) allows advertisers to buy ad inventory programmatically.",
        },
        {
          question: "What does SSP stand for?",
          options: [
            "Server-Side Platform",
            "Supply-Side Platform",
            "Sales Support Platform",
            "Secure Service Provider",
          ],
          correct: 1,
          explanation:
            "SSP (Supply-Side Platform) helps publishers sell their ad inventory programmatically.",
        },
        {
          question: "What is an Ad Exchange?",
          options: [
            "A currency exchange for ads",
            "A marketplace for buying and selling ad inventory",
            "A company that creates ads",
            "A tool for ad design",
          ],
          correct: 1,
          explanation:
            "An Ad Exchange is a digital marketplace that facilitates automated buying and selling of ad inventory.",
        },
        {
          question: "Who are the publishers in the ad ecosystem?",
          options: [
            "Companies that create ads",
            "Websites and apps that display ads",
            "Ad buyers",
            "Data providers",
          ],
          correct: 1,
          explanation:
            "Publishers are websites, apps, or content creators that provide space for displaying advertisements.",
        },
        {
          question: "What role does a DMP play?",
          options: [
            "Displays ads to users",
            "Manages and analyzes audience data",
            "Creates ad content",
            "Processes payments",
          ],
          correct: 1,
          explanation:
            "A DMP (Data Management Platform) collects, organizes, and analyzes audience data for targeting.",
        },
      ],
    },
    {
      id: "ad-serving",
      name: "Ad Serving",
      icon: "💻",
      description: "Technology behind ad delivery",
      questions: [
        {
          question: "What is an ad server?",
          options: [
            "A physical computer that stores ads",
            "Technology that stores, manages, and delivers ads",
            "A person who serves ads",
            "A type of web server",
          ],
          correct: 1,
          explanation:
            "An ad server is technology that stores ad content and delivers it to websites and apps based on targeting criteria.",
        },
        {
          question: 'What does "impression" mean in ad serving?',
          options: [
            "A click on an ad",
            "A single instance of an ad being displayed",
            "A conversion",
            "An ad campaign",
          ],
          correct: 1,
          explanation:
            "An impression occurs each time an ad is displayed on a screen, regardless of whether it's clicked.",
        },
        {
          question: "What is ad trafficking?",
          options: [
            "Illegal ad sales",
            "The process of setting up and managing ad campaigns",
            "Buying ads in bulk",
            "Monitoring ad performance",
          ],
          correct: 1,
          explanation:
            "Ad trafficking is the process of setting up, scheduling, and managing ad campaigns in ad servers.",
        },
        {
          question: 'What is a "pixel" in ad serving?',
          options: [
            "Screen resolution",
            "A small piece of code for tracking",
            "Image quality",
            "Ad size",
          ],
          correct: 1,
          explanation:
            "A tracking pixel is a small, invisible image or code snippet used to track user behavior and ad performance.",
        },
        {
          question: 'What does "ad creative" refer to?',
          options: [
            "The person who designs ads",
            "The actual ad content (images, video, text)",
            "Creative advertising strategy",
            "Ad placement location",
          ],
          correct: 1,
          explanation:
            "Ad creative refers to the actual content of the advertisement, including images, videos, and copy.",
        },
      ],
    },
    {
      id: "targeting-budget",
      name: "Targeting & Budget",
      icon: "🎯",
      description: "Audience targeting and budget optimization",
      questions: [
        {
          question: "What is demographic targeting?",
          options: [
            "Targeting based on location",
            "Targeting based on age, gender, income",
            "Targeting based on interests",
            "Targeting based on device",
          ],
          correct: 1,
          explanation:
            "Demographic targeting focuses on audience characteristics like age, gender, income, and education level.",
        },
        {
          question: "What is retargeting (remarketing)?",
          options: [
            "Targeting new users",
            "Showing ads to users who previously interacted with your brand",
            "Changing campaign targets",
            "Geographic targeting",
          ],
          correct: 1,
          explanation:
            "Retargeting shows ads to users who have previously visited your website or interacted with your content.",
        },
        {
          question: 'What does "lookalike audience" mean?',
          options: [
            "People who look similar physically",
            "Users with similar characteristics to your existing customers",
            "Duplicate user accounts",
            "Users in the same location",
          ],
          correct: 1,
          explanation:
            "Lookalike audiences are new users who share similar characteristics with your existing customers.",
        },
        {
          question: "What is geo-targeting?",
          options: [
            "Targeting by age",
            "Targeting users based on geographic location",
            "Targeting by interests",
            "Targeting by income",
          ],
          correct: 1,
          explanation:
            "Geo-targeting delivers ads based on users' geographic location, from country level to specific zip codes.",
        },
        {
          question: "What is dayparting in ad campaigns?",
          options: [
            "Splitting campaigns into phases",
            "Scheduling ads to run during specific times",
            "Dividing budget by day",
            "Testing different ad versions",
          ],
          correct: 1,
          explanation:
            "Dayparting is scheduling ads to appear during specific hours or days when your audience is most active.",
        },
      ],
    },
    {
      id: "media-buying",
      name: "Media Buying",
      icon: "💼",
      description: "Purchasing and managing ad inventory",
      questions: [
        {
          question: "What is programmatic advertising?",
          options: [
            "Manual ad buying",
            "Automated buying and selling of ad inventory",
            "Programming ads",
            "Traditional media buying",
          ],
          correct: 1,
          explanation:
            "Programmatic advertising uses automated technology to buy and optimize ad inventory in real-time.",
        },
        {
          question: "What is Real-Time Bidding (RTB)?",
          options: [
            "Bidding on ads in real-time auctions",
            "Buying ads in advance",
            "Fixed-price ad buying",
            "Manual negotiation",
          ],
          correct: 0,
          explanation:
            "RTB is an auction-based system where ad impressions are bought and sold in real-time, typically in milliseconds.",
        },
        {
          question: "What is a Private Marketplace (PMP)?",
          options: [
            "Public ad exchange",
            "Invitation-only ad marketplace for premium inventory",
            "Free ad platform",
            "Social media marketplace",
          ],
          correct: 1,
          explanation:
            "PMP is an invitation-only marketplace where premium publishers offer inventory to select advertisers.",
        },
        {
          question: 'What does "guaranteed impressions" mean?',
          options: [
            "Impressions that always convert",
            "A fixed number of ad impressions promised by publisher",
            "Impressions from real users only",
            "High-quality impressions",
          ],
          correct: 1,
          explanation:
            "Guaranteed impressions means the publisher promises to deliver a specific number of ad views.",
        },
        {
          question: "What is header bidding?",
          options: [
            "Bidding for top ad placement",
            "A technique allowing multiple ad exchanges to bid simultaneously",
            "Bidding on website headers",
            "Manual bidding process",
          ],
          correct: 1,
          explanation:
            "Header bidding allows publishers to offer inventory to multiple ad exchanges simultaneously before calling the ad server.",
        },
      ],
    },
    {
      id: "user-identification",
      name: "User Identification",
      icon: "🆔",
      description: "Tracking and identifying users",
      questions: [
        {
          question: "What are third-party cookies used for?",
          options: [
            "Storing website preferences",
            "Tracking users across different websites",
            "Improving website speed",
            "Securing user data",
          ],
          correct: 1,
          explanation:
            "Third-party cookies track user behavior across multiple websites for advertising and analytics purposes.",
        },
        {
          question: "What is a device fingerprint?",
          options: [
            "Biometric authentication",
            "A unique identifier created from device characteristics",
            "Physical device identification",
            "Screen lock pattern",
          ],
          correct: 1,
          explanation:
            "Device fingerprinting creates a unique ID based on device settings, browser configuration, and other attributes.",
        },
        {
          question: "What is first-party data?",
          options: [
            "Data from third-party sources",
            "Data collected directly from your audience",
            "Public data",
            "Social media data",
          ],
          correct: 1,
          explanation:
            "First-party data is information collected directly from your customers through your own channels.",
        },
        {
          question: "What is a Universal ID in AdTech?",
          options: [
            "A government ID",
            "A persistent identifier for users across platforms",
            "Website login credentials",
            "Email address",
          ],
          correct: 1,
          explanation:
            "Universal IDs are persistent identifiers that work across platforms and devices, often replacing third-party cookies.",
        },
        {
          question: 'What does "cookieless tracking" refer to?',
          options: [
            "No tracking at all",
            "Alternative methods to track users without cookies",
            "Only using first-party cookies",
            "Anonymous browsing",
          ],
          correct: 1,
          explanation:
            "Cookieless tracking uses alternative methods like fingerprinting, contextual data, or first-party data instead of cookies.",
        },
      ],
    },
    {
      id: "data-dmps",
      name: "Data & DMPs",
      icon: "📈",
      description: "Data management and platforms",
      questions: [
        {
          question: "What is a Data Management Platform (DMP)?",
          options: [
            "A cloud storage service",
            "A platform that collects and organizes audience data",
            "A data cleaning tool",
            "A database management system",
          ],
          correct: 1,
          explanation:
            "A DMP collects, organizes, and activates audience data from various sources for targeted advertising.",
        },
        {
          question: "What is second-party data?",
          options: [
            "Data collected by you",
            "Another company's first-party data shared with you",
            "Publicly available data",
            "Social media data",
          ],
          correct: 1,
          explanation:
            "Second-party data is another organization's first-party data that they share directly with you.",
        },
        {
          question: "What is third-party data?",
          options: [
            "Your own customer data",
            "Data collected and sold by external companies",
            "Partner data",
            "Free public data",
          ],
          correct: 1,
          explanation:
            "Third-party data is information collected by entities that don't have a direct relationship with users, then aggregated and sold.",
        },
        {
          question: "What is a Customer Data Platform (CDP)?",
          options: [
            "Same as a DMP",
            "A platform that creates unified customer profiles",
            "A CRM system",
            "An email marketing tool",
          ],
          correct: 1,
          explanation:
            "A CDP creates persistent, unified customer profiles by combining data from multiple sources and touchpoints.",
        },
        {
          question: 'What does "data onboarding" mean?',
          options: [
            "Uploading data to cloud",
            "Connecting offline data to online identifiers",
            "Training employees on data",
            "Data backup",
          ],
          correct: 1,
          explanation:
            "Data onboarding is the process of transferring offline customer data to online environments for digital targeting.",
        },
      ],
    },
    {
      id: "privacy-compliance",
      name: "Privacy & Compliance",
      icon: "🔒",
      description: "Privacy regulations and compliance",
      questions: [
        {
          question: "What does GDPR stand for?",
          options: [
            "General Data Privacy Regulation",
            "General Data Protection Regulation",
            "Global Data Privacy Rules",
            "Government Data Protection Rights",
          ],
          correct: 1,
          explanation:
            "GDPR (General Data Protection Regulation) is the EU's comprehensive data protection law enacted in 2018.",
        },
        {
          question: "What is CCPA?",
          options: [
            "California Consumer Privacy Act",
            "Canadian Consumer Protection Act",
            "Corporate Compliance and Privacy Act",
            "Customer Care and Privacy Agreement",
          ],
          correct: 0,
          explanation:
            "CCPA is the California Consumer Privacy Act, giving California residents rights over their personal data.",
        },
        {
          question:
            "What is the purpose of a consent management platform (CMP)?",
          options: [
            "Manage email subscriptions",
            "Collect and manage user consent for data collection",
            "Social media management",
            "Campaign management",
          ],
          correct: 1,
          explanation:
            "A CMP helps websites collect, store, and manage user consent for cookies and data collection in compliance with privacy laws.",
        },
        {
          question: 'What does "right to be forgotten" mean under GDPR?',
          options: [
            "Anonymous browsing",
            "Users can request deletion of their personal data",
            "Data encryption",
            "Private browsing mode",
          ],
          correct: 1,
          explanation:
            "The right to be forgotten allows individuals to request that organizations delete their personal data under certain conditions.",
        },
        {
          question: "What is PII in the context of privacy?",
          options: [
            "Public Internet Information",
            "Personally Identifiable Information",
            "Private Internet Identity",
            "Protected Investment Information",
          ],
          correct: 1,
          explanation:
            "PII (Personally Identifiable Information) is data that can be used to identify a specific individual.",
        },
      ],
    },
    {
      id: "fraud-viewability",
      name: "Fraud & Viewability",
      icon: "🚨",
      description: "Ad fraud prevention and viewability metrics",
      questions: [
        {
          question: "What is ad fraud?",
          options: [
            "False advertising",
            "Illegitimate activity that generates fake ad impressions or clicks",
            "Expensive ads",
            "Low-quality ads",
          ],
          correct: 1,
          explanation:
            "Ad fraud involves generating fake impressions, clicks, or conversions to steal advertising budgets.",
        },
        {
          question: "What are bots in the context of ad fraud?",
          options: [
            "Helpful chatbots",
            "Automated programs that generate fake traffic",
            "AI assistants",
            "Social media tools",
          ],
          correct: 1,
          explanation:
            "Bots are automated programs that simulate human behavior to generate fraudulent ad impressions, clicks, or actions.",
        },
        {
          question: "What is viewability in advertising?",
          options: [
            "How attractive an ad looks",
            "Whether an ad was actually visible to users",
            "Ad placement quality",
            "Screen resolution",
          ],
          correct: 1,
          explanation:
            "Viewability measures whether an ad had the opportunity to be seen by users (e.g., 50% of pixels visible for 1+ seconds).",
        },
        {
          question: "What is click fraud?",
          options: [
            "Accidental clicks",
            "Artificially inflating clicks through bots or click farms",
            "Fast clicking",
            "Multiple clicks on same ad",
          ],
          correct: 1,
          explanation:
            "Click fraud is the practice of clicking on ads repeatedly or using bots to generate illegitimate clicks and waste ad budgets.",
        },
        {
          question: "What is domain spoofing?",
          options: [
            "Buying similar domain names",
            "Misrepresenting a low-quality site as premium inventory",
            "Redirecting domains",
            "Using multiple domains",
          ],
          correct: 1,
          explanation:
            "Domain spoofing is when fraudsters misrepresent low-quality websites as premium publishers to charge higher ad rates.",
        },
      ],
    },
  ],
};

// Export for use in main app
if (typeof module !== "undefined" && module.exports) {
  module.exports = quizData;
}
