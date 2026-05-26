export type ProjectId = 'qubes-messenger' | 'citizenvote' | 'aura-vision' | 'velocity-market';

export type EngineeringProject = {
  id: ProjectId;
  niche: string;
  title: string;
  stack: string[];
  challenge: string;      // The hard engineering problem
  contribution: string;   // Your custom native modules, algorithms, or integrations
  impact: string;         // Quantitative performance gains or business wins
  coreMetric: string;
  accent: string;
  screenMode: 'secure' | 'civic' | 'vision' | 'market';
  gallery: {
    title: string;
    caption: string;
    tone: string;
  }[];
};

export const ENGINEERING_PROJECTS: EngineeringProject[] = [
  {
    id: 'qubes-messenger',
    niche: 'Quantum Security & Cryptography',
    title: 'QUBES MESSENGER',
    stack: ['React Native', 'TypeScript', 'Java', 'PQC'],
    challenge: 'Native integration of post-quantum CRYSTALS-Kyber key encapsulation on low-power mobile chips. Heavy math handshakes blocked the standard React Native thread, causing extreme drop-frames and lags.',
    contribution: 'Authored high-performance C++ Native Modules utilizing React Native JSI (JavaScript Interface), bypassing the bridge to run cryptographic handshakes directly on hardware threads.',
    impact: 'Reduced cryptographic negotiation latency from 340ms to under 45ms (86% latency reduction) with zero UI thread blocking and rock-solid memory profiles.',
    coreMetric: 'Quantum-Safe Handshake Latency < 45ms',
    accent: '#111111',
    screenMode: 'secure',
    gallery: [
      { title: 'Handshake', caption: 'BB84 channel negotiation', tone: '#111111' },
      { title: 'Vault Chat', caption: 'Kyber session envelope', tone: '#2E2E2A' },
      { title: 'Key Audit', caption: 'PQC trace monitor', tone: '#57534A' },
    ],
  },
  {
    id: 'citizenvote',
    niche: 'Civic Tech & Governance',
    title: 'CITIZENVOTE',
    stack: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'Redis'],
    challenge: 'Securing municipal community votes against sybil attacks while guaranteeing absolute voter anonymity and preventing central database tampering.',
    contribution: 'Integrated zero-knowledge ZK-SNARK proof verifiers in a custom Rust-based native build pipeline, masking identity hashes while cryptographically proving eligible ward membership.',
    impact: 'Verified over 50,000 voter enrollments with zero leakages of identifiable personal metadata, validated by independent third-party security audits.',
    coreMetric: '50k+ Active Verifications Deployed',
    accent: '#3D3A35',
    screenMode: 'civic',
    gallery: [
      { title: 'Live Poll', caption: 'Verified ward voting', tone: '#3D3A35' },
      { title: 'Identity Mask', caption: 'ZK proof status', tone: '#6A6258' },
    ],
  },
  {
    id: 'aura-vision',
    niche: 'On-device Machine Learning',
    title: 'AURA VISION',
    stack: ['React Native', 'Expo Camera', 'TensorFlow Lite'],
    challenge: 'Porting large-scale computer vision models to mobile devices while maintaining real-time processing speeds (> 30 FPS) without thermal throttling or memory leakage.',
    contribution: 'Optimized and quantized TensorFlow Lite float32 object detection models into int8 format. Configured on-device neural network delegate pipelines using Android NNAPI and iOS Metal.',
    impact: 'Achieved a rock-solid 32 FPS inference speed on client devices with a 65% reduction in battery consumption and thermal profile.',
    coreMetric: 'Inference Speed: 32 FPS on-device',
    accent: '#22272D',
    screenMode: 'vision',
    gallery: [
      { title: 'Vision Feed', caption: 'Object boxes at 32 FPS', tone: '#22272D' },
      { title: 'Depth Map', caption: 'Spatial inference layer', tone: '#4A5562' },
      { title: 'Model Bench', caption: 'On-device profiler', tone: '#77808A' },
    ],
  },
  {
    id: 'velocity-market',
    niche: 'High-throughput E-commerce',
    title: 'VELOCITY MARKET',
    stack: ['React Native', 'Firebase', 'GraphQL', 'Stripe Native SDK'],
    challenge: 'Managing high-frequency, global inventory synchronization for peer-to-peer checkouts under unstable network conditions with absolute zero double-spends.',
    contribution: 'Developed an offline-first transactional queue utilizing GraphQL subscriptions and optimistic UI states, complete with dynamic Stripe Native payment retries and webhook risk profilers.',
    impact: 'Global state synchronization achieved under 120ms with absolute transactional integrity across 10,000+ simulated concurrent checkouts.',
    coreMetric: 'Transaction Sync < 120ms globally',
    accent: '#161616',
    screenMode: 'market',
    gallery: [
      { title: 'Market Grid', caption: 'P2P inventory stream', tone: '#161616' },
      { title: 'Checkout', caption: 'Stripe native payment rail', tone: '#4A4A44' },
      { title: 'Fraud Queue', caption: 'Webhook risk monitor', tone: '#737168' },
    ],
  },
];
