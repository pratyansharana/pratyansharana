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
    niche: 'Post-Quantum Defense Communication',
    title: 'QUBES / PHANTOM',
    stack: ['React Native', 'Java', 'CRYSTALS-Kyber', 'BB84'],
    challenge: 'We encountered a critical challenge where executing post-quantum CRYSTALS-Kyber key encapsulation and BB84 QKD simulation protocols blocked the standard React Native UI thread, which resulted in extreme frame drops and unusable chat interfaces.',
    contribution: 'To resolve this, I designed and built high-performance Java native modules bypassing the JavaScript bridge, which leverages direct hardware execution to run heavy cryptographic handshakes on background threads.',
    impact: 'This implementation successfully reduced cryptographic negotiation latency by 86%, securing sub-45ms handshakes with zero UI thread blocking, receiving the 1st Runner-Up award at the InnoMaker Showcase.',
    coreMetric: 'Quantum-Safe Handshake < 45ms',
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
    niche: 'Civic Issue Reporting & ML Routing',
    title: 'LOK AWAZ',
    stack: ['React Native', 'TypeScript', 'TensorFlow Lite', 'PostgreSQL'],
    challenge: 'We encountered a critical challenge where running live camera streams for real-time pothole and hazard detection on mobile edge devices caused severe thermal throttling and database bottlenecks.',
    contribution: 'To resolve this, I designed and built an automated real-time reporting pipeline utilizing quantized on-device TensorFlow Lite models, a custom geographic database schema, and instant staff assignment.',
    impact: 'This implementation successfully achieved a stable 32 FPS on-device inference speed, streamlining municipal workflows with zero database tampering and 99.9% uptime.',
    coreMetric: 'Real-time Detection at 32 FPS',
    accent: '#3D3A35',
    screenMode: 'civic',
    gallery: [
      { title: 'Live Poll', caption: 'Verified ward voting', tone: '#3D3A35' },
      { title: 'Identity Mask', caption: 'ZK proof status', tone: '#6A6258' },
    ],
  },
  {
    id: 'velocity-market',
    niche: 'In-Campus Peer-to-Peer Marketplace',
    title: 'GEAR SWAP',
    stack: ['React Native', 'Firebase', 'Express.js', 'MongoDB'],
    challenge: 'We encountered a critical challenge where managing concurrent peer-to-peer campus gear checkouts and trades under unstable network conditions caused database race conditions, which resulted in duplicate checkouts and mismatched inventory.',
    contribution: 'To resolve this, I designed and built an offline-first transactional queue leveraging Firebase real-time listeners and optimistic UI state caching to guarantee database transaction safety.',
    impact: 'This implementation successfully synchronized global state in under 120ms with absolute transactional integrity across concurrent checkouts and zero double-spends.',
    coreMetric: 'Transaction Sync < 120ms globally',
    accent: '#161616',
    screenMode: 'market',
    gallery: [
      { title: 'Market Grid', caption: 'P2P inventory stream', tone: '#161616' },
      { title: 'Checkout', caption: 'Stripe native payment rail', tone: '#4A4A44' },
      { title: 'Fraud Queue', caption: 'Webhook risk monitor', tone: '#737168' },
    ],
  },
  {
    id: 'aura-vision',
    niche: 'Quantum Cryptography Simulation',
    title: 'MODIFIED-BB84',
    stack: ['Python', 'NumPy', 'Matplotlib', 'Qiskit'],
    challenge: 'We encountered a critical challenge where simulating topological quantum system perturbations under standard BB84 Quantum Key Distribution (QKD) resulted in extreme computational overhead and unstable key rate models.',
    contribution: 'To resolve this, I researched and developed a Python-based topological simulation model modifying the BB84 protocol key rate estimations under varied physical noise profiles.',
    impact: 'This implementation successfully optimized key rate modeling efficiency, achieving stable quantum channel simulation parameters validated by open-source benchmarks.',
    coreMetric: 'Topological QKD Simulation',
    accent: '#22272D',
    screenMode: 'vision',
    gallery: [
      { title: 'Vision Feed', caption: 'Object boxes at 32 FPS', tone: '#22272D' },
      { title: 'Depth Map', caption: 'Spatial inference layer', tone: '#4A5562' },
      { title: 'Model Bench', caption: 'On-device profiler', tone: '#77808A' },
    ],
  },
];
