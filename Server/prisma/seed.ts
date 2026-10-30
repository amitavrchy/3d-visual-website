import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@lumenlabs.studio' },
    update: {},
    create: {
      email: 'admin@lumenlabs.studio',
      name: 'Lumen Admin',
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const projects = [
    {
      slug: 'signal-atrium',
      title: 'Signal Atrium',
      tagline: 'A navigable lobby for spatial brand experiences.',
      description:
        'We designed a real-time atrium where visitors walk between project portals, leave notes in space, and tune lighting quality without leaving the WebGL canvas. The brief demanded clarity for hiring directors and beauty for Awwwards jurors — so HTML overlays carry the story while the scene carries the mood.',
      coverImage: '/images/projects/signal-atrium.svg',
      year: 2025,
      clientName: 'LUMEN Labs',
      roles: ['Direction', 'WebGL', 'Interaction'],
      tech: ['R3F', 'drei', 'GSAP', 'NestJS'],
      sceneConfig: {
        camera: { position: [0, 1.6, 6], target: [0, 1, 0], fov: 42 },
        modelUrl: null,
        theme: { primary: '#4AF2C8', secondary: '#6B8CFF', accent: '#FF5C7A' },
        hotspotOffsets: [{ id: 'core', position: [0, 1.2, 0] }],
        diorama: 'signal',
      },
      gallery: [
        '/images/projects/signal-atrium-1.jpg',
        '/images/projects/signal-atrium-2.jpg',
      ],
      featured: true,
      sortOrder: 1,
      published: true,
    },
    {
      slug: 'orbit-material-lab',
      title: 'Orbit Material Lab',
      tagline: 'Configurable metalness, bloom, and particle density.',
      description:
        'An interactive product stage inspired by iyO craft. Clients spin a hero object, swap PBR parameters, and preview postprocessing presets before committing to a shoot. The lab doubles as our playground route foundation.',
      coverImage: '/images/projects/orbit-lab.svg',
      year: 2025,
      clientName: 'Orbit Devices',
      roles: ['Shaders', 'UX', 'Frontend'],
      tech: ['Three.js', 'postprocessing', 'Redux', 'zod'],
      sceneConfig: {
        camera: { position: [2.4, 1.8, 4.2], target: [0, 0.6, 0], fov: 40 },
        modelUrl: null,
        theme: { primary: '#6B8CFF', secondary: '#4AF2C8', accent: '#F3F4F7' },
        hotspotOffsets: [{ id: 'orb', position: [0, 0.8, 0] }],
        diorama: 'orbit',
      },
      gallery: ['/images/projects/orbit-lab-1.jpg'],
      featured: false,
      sortOrder: 2,
      published: true,
    },
    {
      slug: 'vast-threshold',
      title: 'Vast Threshold',
      tagline: 'Interior–exterior threshold with soft volumetric light.',
      description:
        'A cinematic threshold scene balancing architectural calm and brand heat. Hotspots guide visitors from exterior plaza into a glass pavilion case study without nausea-inducing FOV swings.',
      coverImage: '/images/projects/vast-threshold.svg',
      year: 2024,
      clientName: 'Threshold Collective',
      roles: ['Environment', 'Lighting', 'Narrative'],
      tech: ['R3F', 'HDRI', 'framer-motion'],
      sceneConfig: {
        camera: { position: [-3, 2, 5], target: [0, 1, 0], fov: 45 },
        modelUrl: null,
        theme: { primary: '#FF5C7A', secondary: '#9AA3B5', accent: '#4AF2C8' },
        hotspotOffsets: [{ id: 'door', position: [0, 1.4, -1] }],
        diorama: 'threshold',
      },
      gallery: [],
      featured: false,
      sortOrder: 3,
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  await prisma.experiment.upsert({
    where: { slug: 'bloom-sandbox' },
    update: {},
    create: {
      slug: 'bloom-sandbox',
      title: 'Bloom Sandbox',
      summary: 'Toggle bloom intensity against a rotating emissive lattice.',
      configJson: { bloomIntensity: 1.2, latticeDensity: 24 },
      published: true,
    },
  });

  const noteCount = await prisma.worldNote.count();
  if (noteCount === 0) {
    await prisma.worldNote.createMany({
      data: [
        {
          author: 'Maya',
          message: 'The atrium lighting feels like KODE at dusk.',
          color: '#4AF2C8',
          x: -1.2,
          y: 1.4,
          z: 0.8,
          approved: true,
        },
        {
          author: 'Kenji',
          message: 'Leave a note — it floats until we approve it.',
          color: '#6B8CFF',
          x: 1.4,
          y: 1.8,
          z: -0.6,
          approved: true,
        },
      ],
    });
  }

  console.log('Seed complete: admin@lumenlabs.studio / admin123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
