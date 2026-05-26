export type ProjectId = 'qubes-messenger' | 'citizenvote' | 'aura-vision' | 'velocity-market';

export type EngineeringProject = {
  id: ProjectId;
  niche: string;
  title: string;
  stack: string[];
  coreFeatures: string;
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
    coreFeatures:
      'End-to-end messaging utilizing BB84 Quantum Key Distribution simulations and CRYSTALS-Kyber key encapsulation mechanisms.',
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
    coreFeatures:
      'Real-time, verified local community voting infrastructure featuring biometric authentication and zero-knowledge proof identity masking.',
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
    coreFeatures:
      'Real-time multi-class object detection and spatial depth inference running entirely client-side via optimized embedded models.',
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
    coreFeatures:
      'Ultra-fast peer-to-peer commerce application with real-time global state inventory management, multi-currency offline queues, and integrated fraud detection webhooks.',
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
