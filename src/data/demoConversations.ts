export const demoConversations = [
  {
    id: 'conv-1',
    event_id: 'demo-event-1',
    sponsor_id: 'demo-1',
    student_org: 'Computer Science Club',
    status: 'active',
    messages: [
      {
        id: 'msg-1-1',
        sender: 'student',
        content: 'Hi TechCorp team! We\'re excited about your interest in our Tech Innovation Summit. We\'d love to discuss sponsorship opportunities.',
        timestamp: '2024-01-15T10:30:00Z',
        read: true
      },
      {
        id: 'msg-1-2',
        sender: 'sponsor',
        content: 'Hello! We\'re very interested in your summit. The AI/ML focus aligns perfectly with our recruitment goals. What sponsorship tiers do you offer?',
        timestamp: '2024-01-15T14:20:00Z',
        read: true
      },
      {
        id: 'msg-1-3',
        sender: 'student',
        content: 'Great! We have Platinum ($25K), Gold ($15K), and Silver ($8K) tiers. Platinum includes keynote speaking, booth space, and exclusive networking sessions.',
        timestamp: '2024-01-16T09:15:00Z',
        read: true
      },
      {
        id: 'msg-1-4',
        sender: 'sponsor',
        content: 'Platinum tier sounds perfect. We\'d also like to host a workshop on "AI in Modern Software Development." Can we discuss the details?',
        timestamp: '2024-01-16T16:45:00Z',
        read: false
      }
    ],
    last_updated: '2024-01-16T16:45:00Z'
  },
  {
    id: 'conv-2',
    event_id: 'demo-event-2',
    sponsor_id: 'demo-2',
    student_org: 'Health Sciences Association',
    status: 'completed',
    messages: [
      {
        id: 'msg-2-1',
        sender: 'sponsor',
        content: 'Hi! HealthPlus is excited to support your Health & Wellness Fair. We\'d like to discuss our community health initiatives.',
        timestamp: '2024-01-10T11:00:00Z',
        read: true
      },
      {
        id: 'msg-2-2',
        sender: 'student',
        content: 'Welcome! We\'d love to have HealthPlus as a Gold sponsor. Your mental health awareness programs would be a great addition.',
        timestamp: '2024-01-10T15:30:00Z',
        read: true
      },
      {
        id: 'msg-2-3',
        sender: 'sponsor',
        content: 'Perfect! We\'ll provide $15K sponsorship and host mental health screening sessions. Looking forward to the partnership!',
        timestamp: '2024-01-11T10:15:00Z',
        read: true
      }
    ],
    last_updated: '2024-01-11T10:15:00Z'
  },
  {
    id: 'conv-3',
    event_id: 'demo-event-3',
    sponsor_id: 'demo-4',
    student_org: 'Entrepreneurship Club',
    status: 'active',
    messages: [
      {
        id: 'msg-3-1',
        sender: 'student',
        content: 'StartupHub team! Your mentorship programs would be invaluable for our pitch competition. Are you interested in sponsoring?',
        timestamp: '2024-01-20T13:00:00Z',
        read: true
      },
      {
        id: 'msg-3-2',
        sender: 'sponsor',
        content: 'Absolutely! We love supporting student entrepreneurs. We\'d like to offer $20K sponsorship plus mentorship sessions.',
        timestamp: '2024-01-20T17:30:00Z',
        read: true
      },
      {
        id: 'msg-3-3',
        sender: 'student',
        content: 'That\'s fantastic! We can offer you a judging panel seat and exclusive networking with the winning teams.',
        timestamp: '2024-01-21T09:45:00Z',
        read: true
      },
      {
        id: 'msg-3-4',
        sender: 'sponsor',
        content: 'Perfect! We\'ll also provide pitch coaching sessions for all participants. When can we discuss the contract details?',
        timestamp: '2024-01-21T14:20:00Z',
        read: false
      }
    ],
    last_updated: '2024-01-21T14:20:00Z'
  },
  {
    id: 'conv-4',
    event_id: 'demo-event-4',
    sponsor_id: 'demo-5',
    student_org: 'International Student Association',
    status: 'pending',
    messages: [
      {
        id: 'msg-4-1',
        sender: 'sponsor',
        content: 'Hi! FoodieDelight would love to support your Cultural Diversity Festival. We can provide catering services and sponsorship.',
        timestamp: '2024-01-25T12:00:00Z',
        read: true
      },
      {
        id: 'msg-4-2',
        sender: 'student',
        content: 'That sounds great! We\'re looking for $8K sponsorship. Can you provide international cuisine samples for 800 attendees?',
        timestamp: '2024-01-25T16:15:00Z',
        read: false
      }
    ],
    last_updated: '2024-01-25T16:15:00Z'
  },
  {
    id: 'conv-5',
    event_id: 'demo-event-5',
    sponsor_id: 'demo-3',
    student_org: 'Environmental Club',
    status: 'active',
    messages: [
      {
        id: 'msg-5-1',
        sender: 'student',
        content: 'GreenEnergy Solutions! Your sustainability focus makes you the perfect sponsor for our Green Campus Initiative Launch.',
        timestamp: '2024-01-18T10:00:00Z',
        read: true
      },
      {
        id: 'msg-5-2',
        sender: 'sponsor',
        content: 'We\'re excited to support your initiative! We can provide $25K sponsorship and showcase our renewable energy solutions.',
        timestamp: '2024-01-18T14:30:00Z',
        read: true
      },
      {
        id: 'msg-5-3',
        sender: 'student',
        content: 'Excellent! We\'d love to feature your solar panel demonstrations and electric vehicle showcase. Can we discuss the logistics?',
        timestamp: '2024-01-19T09:15:00Z',
        read: true
      },
      {
        id: 'msg-5-4',
        sender: 'sponsor',
        content: 'Absolutely! We\'ll bring our latest solar tech and EV models. We can also provide sustainability workshops for students.',
        timestamp: '2024-01-19T15:45:00Z',
        read: false
      }
    ],
    last_updated: '2024-01-19T15:45:00Z'
  }
];

export const demoMatches = [
  {
    id: 'match-1',
    event_id: 'demo-event-1',
    sponsor_id: 'demo-1',
    match_score: 95,
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    ai_recommendation: 'Excellent match! TechCorp\'s technology focus and student recruitment goals align perfectly with the Tech Innovation Summit\'s AI/ML workshops and career fair components.',
    sponsorship_tier: 'Platinum',
    estimated_value: '$25,000'
  },
  {
    id: 'match-2',
    event_id: 'demo-event-2',
    sponsor_id: 'demo-2',
    match_score: 92,
    status: 'completed',
    created_at: '2024-01-10T09:00:00Z',
    ai_recommendation: 'Strong match! HealthPlus\'s community health advocacy perfectly complements the Health & Wellness Fair\'s focus on medical screenings and wellness workshops.',
    sponsorship_tier: 'Gold',
    estimated_value: '$15,000'
  },
  {
    id: 'match-3',
    event_id: 'demo-event-3',
    sponsor_id: 'demo-4',
    match_score: 88,
    status: 'active',
    created_at: '2024-01-20T11:00:00Z',
    ai_recommendation: 'Great match! StartupHub\'s entrepreneurship focus and mentorship programs align well with the pitch competition\'s goals of supporting student entrepreneurs.',
    sponsorship_tier: 'Gold',
    estimated_value: '$20,000'
  },
  {
    id: 'match-4',
    event_id: 'demo-event-4',
    sponsor_id: 'demo-5',
    match_score: 85,
    status: 'pending',
    created_at: '2024-01-25T10:00:00Z',
    ai_recommendation: 'Good match! FoodieDelight\'s food service expertise and community focus would enhance the Cultural Diversity Festival\'s food and cultural components.',
    sponsorship_tier: 'Silver',
    estimated_value: '$8,000'
  },
  {
    id: 'match-5',
    event_id: 'demo-event-5',
    sponsor_id: 'demo-3',
    match_score: 90,
    status: 'active',
    created_at: '2024-01-18T09:00:00Z',
    ai_recommendation: 'Excellent match! GreenEnergy Solutions\' sustainability focus and renewable energy expertise perfectly align with the Green Campus Initiative\'s environmental goals.',
    sponsorship_tier: 'Platinum',
    estimated_value: '$25,000'
  },
  {
    id: 'match-6',
    event_id: 'demo-event-6',
    sponsor_id: 'demo-6',
    match_score: 87,
    status: 'upcoming',
    created_at: '2024-01-22T14:00:00Z',
    ai_recommendation: 'Strong match! CodeAcademy Pro\'s education technology focus and developer community building aligns well with the career development workshop series.',
    sponsorship_tier: 'Gold',
    estimated_value: '$18,000'
  },
  {
    id: 'match-7',
    event_id: 'demo-event-7',
    sponsor_id: 'demo-1',
    match_score: 93,
    status: 'active',
    created_at: '2024-01-23T13:00:00Z',
    ai_recommendation: 'Excellent match! TechCorp\'s technology focus and AI/ML expertise perfectly aligns with the hackathon\'s "AI for Social Good" theme.',
    sponsorship_tier: 'Platinum',
    estimated_value: '$35,000'
  },
  {
    id: 'match-8',
    event_id: 'demo-event-8',
    sponsor_id: 'demo-7',
    match_score: 89,
    status: 'completed',
    created_at: '2024-01-05T12:00:00Z',
    ai_recommendation: 'Great match! SportsGear Pro\'s athletic equipment and fitness focus aligns perfectly with the Sports & Fitness Expo\'s equipment demonstrations and fitness challenges.',
    sponsorship_tier: 'Gold',
    estimated_value: '$22,000'
  }
]; 