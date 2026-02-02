const quizData = {
  topics: [
    {
      id: 't1',
      title: 'Targeting & Budget',
      description: 'Master audience targeting and budget allocation',
      icon: '🎯',
      questions: [
        {
          id: 1,
          question: "What is demographic targeting?",
          options: [
            "Targeting based on location",
            "Targeting based on age, gender, income",
            "Targeting based on interests",
            "Targeting based on device"
          ],
          correct: 1,
          explanation: "Demographic targeting allows access to specific audiences based on age, gender, income, and other population statistics."
        },
        {
            id: 2,
            question: "Which bidding strategy mimics manual bidding but is automated?",
            options: [
              "Target CPA",
              "Enhanced CPC",
              "Maximize Conversions",
              "Target ROAS"
            ],
            correct: 1,
            explanation: "Enhanced CPC (ECPC) adjusts your manual bids for clicks that seem more or less likely to lead to a sale."
        },
        {
            id: 3,
            question: "What is 'Dayparting' in ad scheduling?",
            options: [
              "Running ads only on weekends",
              "Running ads during specific times of day",
              "Splitting budget by days",
              "Targeting users who party in the day"
            ],
            correct: 1,
            explanation: "Dayparting allows advertisers to schedule ads to appear only during specific hours or days of the week."
        },
        {
            id: 4,
            question: "What does CPM stand for?",
            options: [
              "Cost Per Million",
              "Cost Per Mile (Thousand Impressions)",
              "Cost Per Month",
              "Clicks Per Minute"
            ],
            correct: 1,
            explanation: "CPM stands for Cost Per Mille (thousand), meaning the cost for 1,000 views or impressions of an advertisement."
        },
        {
            id: 5,
            question: "If your budget is limited, which targeting setting is most restrictive?",
            options: [
              "Broad Match",
              "Exact Match",
              "Phrase Match",
              "Broad Match Modifier"
            ],
            correct: 1,
            explanation: "Exact Match is the most restrictive, showing ads only when the user searches for the exact keyword or very close variants."
        }
      ]
    },
    {
       id: 't2',
       title: 'Ad Formats & Creative',
       description: 'Learn about different ad types and best practices',
       icon: '🖼️',
       questions: [
          {
             id: 1,
             question: "Which of these is a Native Ad format?",
             options: [
                "A pop-up window",
                "A skippable video",
                "Sponsored content in a feed",
                "A full-screen interstitial"
             ],
             correct: 2,
             explanation: "Native ads match the look, feel, and function of the media format in which they appear, often found in social media feeds."
          },
          {
             id: 2,
             question: "What is the primary goal of a Responsive Search Ad?",
             options: [
                "To show the same text to everyone",
                "To test multiple headlines and descriptions",
                "To show images instead of text",
                "To force users to click"
             ],
             correct: 1,
             explanation: "Responsive Search Ads allow you to input multiple headlines and descriptions, which the platform's AI tests to find the best combinations."
          },
          {
             id: 3,
             question: "Which file format is ideal for lightweight animated display ads?",
             options: [
                "TIFF",
                "BMP",
                "HTML5",
                "RAW"
             ],
             correct: 2,
             explanation: "HTML5 is the standard for interactive and animated display ads because it is lightweight and universally supported."
          },
          {
             id: 4,
             question: "What is the recommended maximum length for a non-skippable video ad?",
             options: [
                "30 seconds",
                "15 to 20 seconds",
                "1 minute",
                "5 minutes"
             ],
             correct: 1,
             explanation: "Most platforms limit non-skippable ads to 15 or 20 seconds to maintain a balance between advertiser needs and user experience."
          },
          {
             id: 5,
             question: "In display advertising, what is a 'Leaderboard' size?",
             options: [
                "300x250",
                "160x600",
                "728x90",
                "320x50"
             ],
             correct: 2,
             explanation: "A standard Leaderboard ad unit dimensions are 728 pixels wide by 90 pixels tall, typically placed at the top of a webpage."
          }
       ]
    },
    {
       id: 't3',
       title: 'Bidding Strategies',
       description: 'Understand how real-time bidding works',
       icon: '💰',
       questions: [
          {
             id: 1,
             question: "What is 'Real-Time Bidding' (RTB)?",
             options: [
                "Bidding days in advance",
                "Buying slots manually",
                "Auctioning impressions in milliseconds",
                "Bidding based on real estate"
             ],
             correct: 2,
             explanation: "RTB is a means of buying and selling ad inventory on a per-impression basis, via an instantaneous programmatic auction."
          },
          {
             id: 2,
             question: "Which strategy focuses on getting the most clicks for your budget?",
             options: [
                "Maximize Clicks",
                "Target Impression Share",
                "Target CPA",
                "vCPM"
             ],
             correct: 0,
             explanation: "Maximize Clicks is an automated bid strategy that automatically sets your bids to help get as many clicks as possible within your budget."
          },
          {
             id: 3,
             question: "What does 'Target ROAS' stand for?",
             options: [
                "Return On Ad Spend",
                "Reach Of A Segment",
                "Rate Of Average Sale",
                "Realtime Online Ad Sales"
             ],
             correct: 0,
             explanation: "Target ROAS (Return On Ad Spend) lets you bid based on a target return you want from your ad spend."
          },
          {
             id: 4,
             question: "In a second-price auction, what do you pay?",
             options: [
                "Your full bid amount",
                "0.01 more than the second-highest bid",
                "The average of all bids",
                "The lowest bid amount"
             ],
             correct: 1,
             explanation: "In a classic second-price auction, the winner pays just enough to beat the second-highest bidder (often $0.01 more)."
          },
          {
             id: 5,
             question: "Which metric is most important for a 'Target CPA' strategy?",
             options: [
                "Impressions",
                "Video Views",
                "Conversions",
                "Brand Lift"
             ],
             correct: 2,
             explanation: "Target CPA (Cost Per Acquisition) is strictly focused on driving conversions at a specific cost."
          }
       ]
    },
    {
       id: 't4',
       title: 'Analytics & Measurement',
       description: 'Interpret data and optimize performance',
       icon: '📊',
       questions: [
          {
             id: 1,
             question: "What is a 'Conversion Window'?",
             options: [
                "The time of day you check ads",
                "A popup on the screen",
                "Period after a click where specific action is recorded",
                "The operating system window"
             ],
             correct: 2,
             explanation: "A conversion window is the period of time after an ad interaction during which a conversion, such as a purchase, is recorded."
          },
          {
             id: 2,
             question: "What does CTR indicate?",
             options: [
                "Cost To Reach",
                "Click-Through Rate",
                "Customer Themed Report",
                "Conversion Total Rate"
             ],
             correct: 1,
             explanation: "Click-Through Rate (CTR) measures how often people who see your ad end up clicking it (Clicks / Impressions)."
          },
          {
             id: 3,
             question: "If you spent $100 and got 10 leads, what is your CPA?",
             options: [
                "$1.00",
                "$10.00",
                "$100.00",
                "$0.10"
             ],
             correct: 1,
             explanation: "CPA (Cost Per Acquisition) = Total Cost ($100) / Number of Acquisitions (10) = $10."
          },
          {
             id: 4,
             question: "What is 'Attribution Modeling'?",
             options: [
                "Designing 3D models",
                "Assigning credit to touchpoints in a user journey",
                "Attributing blame for bad ads",
                "Testing ad colors"
             ],
             correct: 1,
             explanation: "Attribution modeling is the rule or set of rules that determines how credit for sales and conversions is assigned to touchpoints in conversion paths."
          },
          {
             id: 5,
             question: "A high bounce rate on a landing page usually indicates:",
             options: [
                "Users love the content",
                "The page loads too fast",
                "Users left without interacting",
                "The ad was very cheap"
             ],
             correct: 2,
             explanation: "A high bounce rate means visitors are leaving your site from the entrance page without interacting with the page."
          }
       ]
    },
    {
       id: 't5',
       title: 'Privacy & Compliance',
       description: 'Navigate the legal landscape of AdTech',
       icon: '🔒',
       questions: [
          {
             id: 1,
             question: "What does GDPR stand for?",
             options: [
                "Global Data Protection Regulation",
                "General Data Protection Regulation",
                "Google Data Privacy Rules",
                "General Digital Public Rights"
             ],
             correct: 1,
             explanation: "The General Data Protection Regulation (GDPR) is a legal framework that sets guidelines for the collection and processing of personal info from usage."
          },
          {
             id: 2,
             question: "Which browser initiative aims to phase out third-party cookies?",
             options: [
                "Privacy Sandbox",
                "Private Relay",
                "Incognito Plus",
                "Ghostery"
             ],
             correct: 0,
             explanation: "Google's Privacy Sandbox initiative aims to create technologies that both protect people's privacy online and give companies and developers tools to build thriving digital businesses."
          },
          {
             id: 3,
             question: "What is a 'Consent Management Platform' (CMP)?",
             options: [
                "A tool to manage ad creativity",
                "Software to collect user consent for data processing",
                "A platform for content creators",
                "A management tool for campaigns"
             ],
             correct: 1,
             explanation: "A CMP is a tool that allows websites to request, receive, and store users' consent for the use of cookies and other tracking technologies."
          },
          {
             id: 4,
             question: "What is CCPA?",
             options: [
                "California Consumer Privacy Act",
                "Creative Content Protection Agency",
                "Consumer Credit Protection Act",
                "Computer Code Privacy Act"
             ],
             correct: 0,
             explanation: "The CCPA is a state statute intended to enhance privacy rights and consumer protection for residents of California."
          },
          {
             id: 5,
             question: "What constitutes 'PII'?",
             options: [
                "Public Internet Info",
                "Personally Identifiable Information",
                "Past Internet Interactions",
                "Private Internal Index"
             ],
             correct: 1,
             explanation: "PII (Personally Identifiable Information) is any data that could potentially identify a specific individual (e.g., email, phone, SSN)."
          }
       ]
    }
  ]
};

export default quizData;
