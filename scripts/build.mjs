import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseUrl = 'https://auraofintelligence.github.io/ready-set-co-op-cultural-intelligence-node/';

const routes = [
  { file: 'index.html', label: 'Home', short: 'Home' },
  { file: 'node.html', label: 'One rack', short: 'Rack' },
  { file: 'dunwich.html', label: 'Dunwich', short: 'Place' },
  { file: 'culture.html', label: 'Cultural collaboration', short: 'Culture' },
  { file: 'uses.html', label: 'Practical uses', short: 'Uses' },
  { file: 'digital-twin.html', label: 'Digital twin', short: 'Twin' },
  { file: 'process.html', label: 'Repeatable plan', short: 'Plan' },
  { file: 'cooperative.html', label: 'Co-op layer', short: 'Co-op' },
  { file: 'network.html', label: 'Wider network', short: 'Network' },
  { file: 'sitemap.html', label: 'Sitemap', short: 'Sitemap' }
];

const supportFiles = [
  'supporting-documents/senate-ai-and-data-centres-submission-2026.md',
  'supporting-documents/aukus-public-inquiry-submission-2026.md',
  'supporting-documents/a-fair-go-for-the-ai-age.md',
  'supporting-documents/do-not-put-all-our-eggs-in-one-basket.md',
  'supporting-documents/local-government-funding-inquiry-submission.md',
  'supporting-documents/fiji-australia-vuvale-union-submission-2026.md',
  'supporting-documents/ocean-of-peace-alliance-veitacini-treaty-submission-2026.md',
  'supporting-documents/setco-2026-pitch-plan-revision.md'
];

const publicProjects = [
  {
    id: 'media-network',
    title: 'Minjerribah Screen & Media Network',
    url: 'https://auraofintelligence.github.io/minjerribah-screen-media-network/',
    image: 'media-network.png',
    status: 'Staged public proposal',
    description: 'Links island stories, training, public screens, film, local media and practical production pathways through a staged collaboration proposal.',
    rack: 'Local editing, transcription, archive search and screen rendering for island media.'
  },
  {
    id: 'gumpi-terminal',
    title: 'Dunwich (Gumpi) Ferry Terminal Open Data Lab',
    url: 'https://auraofintelligence.github.io/dunwich-gumpi-ferry-terminal-open-data-lab/',
    image: 'gumpi-terminal.webp',
    status: 'Working public prototype',
    description: 'Combines 33 mapped 360 photo points, official project sources and simulation workflows around the Dunwich ferry terminal upgrade.',
    rack: 'Photogrammetry, LiDAR processing and simulation for inspectable ferry gateway options.'
  },
  {
    id: 'events-engine',
    title: 'Quandamooka Country Events Engine',
    url: 'https://auraofintelligence.github.io/quandamooka-country-events-engine/',
    image: 'events-engine.webp',
    status: 'Working public tool',
    description: 'Maps events, places, suppliers and approval pathways, with Markdown builders spanning idea, run, simulation, notices and aftercare.',
    rack: 'Local models index event records, draft run files and test logistics.'
  },
  {
    id: 'twin-builders',
    title: 'Straddie Digital Twin Builders',
    url: 'https://auraofintelligence.github.io/straddie-digital-twin-builders/',
    image: 'twin-builders.webp',
    status: 'Working prompt builder',
    description: 'Turns plain choices about rooms, places and bioregions into portable prompt packets for image, video, world building and simulation tools.',
    rack: 'GPU rendering develops selected prompt packets into reviewable local simulations.'
  },
  {
    id: 'grain-by-grain',
    title: 'Grain by Grain Documentary',
    url: 'https://auraofintelligence.github.io/grain-by-grain-documentary/',
    image: 'grain-by-grain.webp',
    status: 'Documentary planning site',
    description: 'Maps a 90 minute documentary from Dunwich infrastructure and material flows towards a seven generation civilisation story.',
    rack: 'Local editing, transcription, visualisation and evidence retrieval support documentary production.'
  },
  {
    id: 'trust-hub',
    title: 'Ready S.E.T. Co-op Trust Hub',
    url: 'https://auraofintelligence.github.io/ready-set-co-op-trust-hub/',
    image: 'trust-hub.webp',
    status: 'Public cooperative proposal',
    description: 'Connects trust building, coworking, shared assets, local jobs, media and project pathways around the proposed Ready S.E.T. Co-op.',
    rack: 'Shared compute supports training, media production, project administration and paid local workflows.'
  },
  {
    id: 'community-wealth',
    title: 'Moreton Bay Community Wealth and Mutuals',
    url: 'https://auraofintelligence.github.io/moreton-bay-community-wealth-and-mutuals/',
    image: 'community-wealth.webp',
    status: 'Public research doorway',
    description: 'Explores community wealth funds, mutual protection, Indigenous data sovereignty, Native Title pathways and everyday choices across the Moreton Bay archipelago.',
    rack: 'Local analysis models infrastructure value, risk and community benefit pathways.'
  },
  {
    id: 'wildlife-rescue',
    title: 'Minjerribah Wildlife Rescue',
    url: 'https://auraofintelligence.github.io/minjerribah-wildlife-rescue/',
    image: 'wildlife-rescue.jpg',
    status: 'Working public map',
    description: 'Maps wildlife rescue contacts, reporting guidance, island places and practical observation pathways in a community-oriented public tool.',
    rack: 'Local mapping and image analysis support rescue coordination and field learning.'
  },
  {
    id: 'extreme-matter',
    title: 'Extreme Matter Atlas',
    url: 'https://auraofintelligence.github.io/extreme-matter-atlas/',
    image: 'extreme-matter.png',
    status: 'Interactive science atlas',
    description: 'Explores all 118 elements, record holders, predicted crystals, interactive lattices, metamaterials and frontier claims through questions anchored in measurement.',
    rack: 'GPU simulation explores crystal lattices, metamaterials and frontier material behaviour.'
  },
  {
    id: 'makerspace',
    title: 'Straddie Makerspace Lab',
    url: 'https://auraofintelligence.github.io/straddie-makerspace-lab/',
    image: 'makerspace.webp',
    status: 'Public makerspace proposal',
    description: 'Explores a Dunwich workshop for making, repair, shared tools, recycled materials, local sand experiments and community learning.',
    rack: 'CAD workstations, local rendering and fabrication files support design, learning and repair.'
  },
  {
    id: 'tip-loop',
    title: 'Straddie Tip Loop Lab',
    url: 'https://auraofintelligence.github.io/straddie-tip-loop-lab/',
    image: 'tip-loop.webp',
    status: 'Circular learning workbench',
    description: 'Follows useful items through offer, sorting, repair, parts, material stock, learning, partner processing and measured outcomes.',
    rack: 'Vision models, inventory records and fabrication files support sorting, repair and remaking.'
  },
  {
    id: 'sandworm',
    title: 'Sandworm Subterranean Systems',
    url: 'https://auraofintelligence.github.io/sandworm-subterranean-systems/',
    image: 'sandworm.webp',
    status: 'Frontier systems workbench',
    description: 'Connects subterranean transport, wildlife protection, resilient access, excavated materials, coastal systems, energy storage, community wealth and documentary trails.',
    rack: 'Transport simulation, material testing and systems modelling explore subterranean infrastructure scenarios.'
  },
  {
    id: 'clean-energy',
    title: 'Straddie Clean Energy Superpower',
    url: 'https://auraofintelligence.github.io/straddie-clean-energy-superpower/',
    image: 'clean-energy.webp',
    status: 'Question led energy atlas',
    description: 'Surveys rooftop solar, heat and sand storage, hydrogen, water loops, power sharing, marine energy, novel wind and local wealth.',
    rack: 'Energy modelling compares generation, storage, demand and island resilience scenarios.'
  },
  {
    id: 'ballow-road',
    title: 'Ballow Road Sand & Screen Hub',
    url: 'https://auraofintelligence.github.io/ballow-road-sand-screen-hub/',
    image: 'ballow-road.webp',
    status: 'Public place proposal',
    description: 'Brings sand sport, outdoor cinema, night markets, youth crews, visitor information and festival energy into one Dunwich place proposal.',
    rack: 'Spatial modelling, media production and booking systems animate a shared public hub.'
  },
  {
    id: 'music-universe',
    title: 'i C. infinity Music Universe',
    url: 'https://auraofintelligence.github.io/i-C-infinity-music-universe/',
    image: 'music-universe.webp',
    status: 'Live 129 song universe',
    description: 'An eight-collection public universe joining island life, music, science, spirituality, imagination, full lyrics and creative builders.',
    rack: 'Turns Dunwich stories, songs and visual worlds into local cultural production workloads.'
  },
  {
    id: 'infinity-engine',
    title: 'Infinity Engine',
    url: 'https://auraofintelligence.github.io/infinity-engine/',
    image: 'infinity-engine.png',
    status: 'Live production dashboard',
    description: 'A model-agnostic pipeline moving songs through analysis, human direction, visual briefs, panels, keyframes, video and publication.',
    rack: 'Uses rack compute for private orchestration, visual generation, review and reusable media pipelines.'
  },
  {
    id: 'legal-engine',
    title: 'Australian Legal Engine',
    url: 'https://github.com/auraofintelligence/australian-legal-engine',
    image: 'legal-engine.png',
    status: 'Public citation-first engine',
    description: 'An offline Australian statute reader that parses Acts into provisions, indexes them locally, and returns exact quoted law with addresses.',
    rack: 'Keeps legal sources, indexes and question trails close to community projects.'
  },
  {
    id: 'community-ledger',
    title: 'Strange but True Community Ledger',
    url: 'https://auraofintelligence.github.io/strange-but-true/community-ledger.html',
    image: 'community-ledger.webp',
    status: 'Wider project gateway',
    description: 'Offers a choose your own adventure doorway across local tools, stories, infrastructure experiments and public project pages.',
    rack: 'Routes visitors from the Dunwich node into the wider project network.'
  }
];

const projectById = Object.fromEntries(publicProjects.map(project => [project.id, project]));

const pages = {
  'index.html': {
    title: 'A local cultural compute node',
    description: 'A working exploration of one local rack for Indigenous and non-Indigenous cultural collaboration, practical work and chosen connections.',
    image: 'home.webp',
    alt: 'Concept image of a coastal community studio where people gather around a luminous island model with one computing rack nearby',
    theme: 'violet',
    heading: 'One rack. Many local directions.',
    lede: 'A working exploration of local compute on Minjerribah: useful every day, shaped through Indigenous and non-Indigenous relationships, and connected beyond the island only on locally chosen terms.',
    actions: [
      ['Explore the rack', 'node.html'],
      ['Follow the repeatable plan', 'process.html']
    ],
    body: `
      <section class="section section-light" id="starting-point">
        <div class="wrap intro-grid reveal">
          <div>
            <h2>One rack joins work already in motion.</h2>
            <p class="lead">Dunwich already holds creative projects, public maps, place evidence, circular-economy ideas, community networks and bold technical futures. A serious local rack gives that work shared processing power, storage and a place to grow skills together.</p>
          </div>
          <div class="concept-panel">
            <p><strong>One concrete scale</strong><br>An NVIDIA GB200 NVL72-class rack gives power, cooling, space, skills and workload discussions a serious reference point.</p>
            <p><strong>One lived place</strong><br>Dunwich on Minjerribah brings ferry rhythms, island services, Country, creative practice and local relationships into the design.</p>
            <p><strong>Many active directions</strong><br>Media, events, immersive capture, making, repair, materials, clean energy and frontier systems already provide reasons to explore.</p>
          </div>
        </div>
      </section>

      <section class="section section-ink">
        <div class="wrap reveal">
          <h2>Compute is only one layer</h2>
          <div class="four-grid">
            <article class="colour-card coral"><h3>Local purpose</h3><p>The first question is not what the machine does. It is what people around it find worth doing together.</p></article>
            <article class="colour-card aqua"><h3>Living relationships</h3><p>Permission, custody, attribution and human-held knowledge travel through relationships around each activity.</p></article>
            <article class="colour-card yellow"><h3>Real local work</h3><p>Media, events, maps, making, repair, environmental observation and simulation give the rack an everyday rhythm.</p></article>
            <article class="colour-card violet"><h3>Chosen connections</h3><p>Public methods and selected outputs move between projects while each node keeps its own centre.</p></article>
          </div>
        </div>
      </section>

      <section class="section section-sunrise">
        <div class="wrap split reveal">
          <div>
            <h2>Follow a real record through the node.</h2>
            <p class="lead">Every project brings its own origin, purpose, relationships, custody, processing, output and review path.</p>
            <p>The examples reveal overlapping personal, organisational, community and cultural relationships. The rack follows those distinctions through the whole workload.</p>
            <a class="text-link" href="culture.html">Explore cultural collaboration <span aria-hidden="true">→</span></a>
          </div>
          <div class="boundary-explorer" data-boundary-explorer>
            <div class="boundary-switcher" aria-label="Explore four local record journeys">
              <button type="button" class="active" data-boundary-mode="public" aria-controls="boundary-public" aria-pressed="true"><span>Event listing</span><small>Public record</small></button>
              <button type="button" data-boundary-mode="purpose" aria-controls="boundary-purpose" aria-pressed="false"><span>Gumpi 360</span><small>Place evidence</small></button>
              <button type="button" data-boundary-mode="group" aria-controls="boundary-group" aria-pressed="false"><span>Screen project</span><small>Named production</small></button>
              <button type="button" data-boundary-mode="human" aria-controls="boundary-human" aria-pressed="false"><span>Human-held</span><small>Living knowledge</small></button>
            </div>
            <div class="boundary-panels" aria-live="polite">
              <article class="boundary-panel" id="boundary-public" data-boundary-panel="public">
                <h3>A public event enters through its organiser.</h3>
                <p>The Events Engine keeps source, organiser, place, timing and correction paths attached as the node indexes a public listing.</p>
                <ol class="material-route open-route">
                  <li><small>Origin</small><strong>Organiser record</strong></li>
                  <li><small>Purpose</small><strong>Local discovery</strong></li>
                  <li><small>Custody</small><strong>Source stays named</strong></li>
                  <li><small>Local processing</small><strong>Index and format</strong></li>
                  <li><small>Output</small><strong>Public event view</strong></li>
                  <li><small>Review</small><strong>Correct or withdraw</strong></li>
                </ol>
                <dl class="boundary-facts"><div><dt>Relationships</dt><dd>Organisational, public, community</dd></div><div><dt>Rack work</dt><dd>Search, format, local access</dd></div><div><dt>Public connection</dt><dd>Quandamooka Country Events Engine</dd></div></dl>
              </article>
              <article class="boundary-panel" id="boundary-purpose" data-boundary-panel="purpose">
                <h3>A 360 capture keeps its evidence trail.</h3>
                <p>GPS-rounded public imagery from the Gumpi ferry terminal lab supports a named design question with date, precision and source visible.</p>
                <ol class="material-route purpose-route">
                  <li><small>Origin</small><strong>360 field capture</strong></li>
                  <li><small>Purpose</small><strong>Explore terminal choices</strong></li>
                  <li><small>Custody</small><strong>Source archive</strong></li>
                  <li><small>Local processing</small><strong>Align and simulate</strong></li>
                  <li><small>Output</small><strong>Reviewable views</strong></li>
                  <li><small>Review</small><strong>Date and precision</strong></li>
                </ol>
                <dl class="boundary-facts"><div><dt>Relationships</dt><dd>Public source, project, place</dd></div><div><dt>Rack work</dt><dd>Immersive media and simulation</dd></div><div><dt>Public connection</dt><dd>Dunwich Gumpi Open Data Lab</dd></div></dl>
              </article>
              <article class="boundary-panel" id="boundary-group" data-boundary-panel="group">
                <h3>A screen project carries several relationships at once.</h3>
                <p>Creator files, interviews, locations, music and production records follow the purpose and terms of one named work.</p>
                <ol class="material-route group-route">
                  <li><small>Origin</small><strong>Creators and contributors</strong></li>
                  <li><small>Purpose</small><strong>Named production</strong></li>
                  <li><small>Custody</small><strong>Project workspace</strong></li>
                  <li><small>Local processing</small><strong>Edit and render</strong></li>
                  <li><small>Output</small><strong>Selected release</strong></li>
                  <li><small>Review</small><strong>Rights and credits</strong></li>
                </ol>
                <dl class="boundary-facts"><div><dt>Relationships</dt><dd>Individual, group, purpose, cultural</dd></div><div><dt>Rack work</dt><dd>Media, models and local storage</dd></div><div><dt>Public connection</dt><dd>Minjerribah Screen Media Network</dd></div></dl>
              </article>
              <article class="boundary-panel" id="boundary-human" data-boundary-panel="human">
                <h3>The route may stay entirely between people.</h3>
                <p>A conversation, practice or form of knowledge may shape a project direction while its substance remains held in living relationship.</p>
                <ol class="material-route human-route">
                  <li><small>Origin</small><strong>Living relationship</strong></li>
                  <li><small>Purpose</small><strong>Human conversation</strong></li>
                  <li><small>Custody</small><strong>People involved</strong></li>
                  <li class="bypass-step"><small>Local processing</small><strong>Human interpretation</strong></li>
                  <li><small>Output</small><strong>Direction or boundary</strong></li>
                  <li class="bypass-step"><small>Review</small><strong>Relationship continues</strong></li>
                </ol>
                <dl class="boundary-facts"><div><dt>Relationships</dt><dd>Personal, family, community, cultural</dd></div><div><dt>Rack work</dt><dd>Only the chosen project boundary</dd></div><div><dt>Public connection</dt><dd>None unless people create one</dd></div></dl>
              </article>
            </div>
            <a class="boundary-deep-link" href="culture.html#layers">Explore every knowledge layer <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section class="section section-light" id="local-work">
        <div class="wrap reveal">
          <div class="section-heading dark-heading"><h2>Local work already gives the rack a purpose.</h2><p>These are public projects, tools and prototypes built before the rack. Their real workloads reveal what shared local compute is for.</p></div>
          ${projectGallery(['media-network', 'music-universe', 'infinity-engine', 'legal-engine', 'gumpi-terminal', 'events-engine', 'twin-builders', 'grain-by-grain', 'wildlife-rescue'], true)}
          <div class="section-action-row"><a class="button button-dark magnetic" href="uses.html"><span>Explore every local direction</span></a><a class="text-link" href="process.html">Shape a repeatable node plan <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section class="section section-ink">
        <div class="wrap reveal">
          <div class="section-heading">
            <h2>Move through the node.</h2>
            <p>Each page deepens one part of the Dunwich rack and its cultural collaboration process.</p>
          </div>
          <div class="portal-grid">
            ${portal('node.html', 'One rack', 'What sits inside the reference rack, and what still sits outside it.')}
            ${portal('dunwich.html', 'Dunwich context', 'Ferry rhythms, island systems, Country, creative practice and local relationships.')}
            ${portal('culture.html', 'Cultural collaboration', 'Relationships and permissions carried through each real project record.')}
            ${portal('uses.html', 'Practical uses', 'Existing local projects and frontier directions around the rack.')}
            ${portal('digital-twin.html', 'Place modelling', 'Traceable workloads from public evidence to reviewable local outputs.')}
            ${portal('cooperative.html', 'Co-op layer', 'Shared employment, training, equipment and services around the node.')}
          </div>
        </div>
      </section>

      <section class="section section-spectrum">
        <div class="wrap reveal">
          ${adventureProject()}
          <div class="section-action-row light-actions"><p>The filtered Project Atlas shows the 2026 macro network behind this focused Dunwich node.</p><a class="button button-glass magnetic" href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer"><span>Open the filtered Project Atlas</span></a></div>
        </div>
      </section>`
  },

  'node.html': {
    title: 'One rack as a local workbench',
    description: 'A plain-language view of one GB200 NVL72-class rack as a flexible local workbench rather than a miniature hyperscale data centre.',
    image: 'node.webp',
    alt: 'Concept image of two technicians beside one luminous computing rack in a timber coastal workspace',
    theme: 'aqua',
    heading: 'One rack, understood as a workbench.',
    lede: 'The hardware reference is deliberately concrete. The purpose remains open: a locally operated pool of computing power for media, learning, modelling, sensing and cultural projects with permission.',
    actions: [['See possible uses', 'uses.html'], ['Follow the plan', 'process.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal">
        <div><h2>A serious local scale</h2><p class="lead">GB200 NVL72 is a rack-scale computing system. Here it gives the conversation a concrete middle scale between personal workstations and distant hyperscale infrastructure.</p></div>
        <aside class="fact-stack">
          <div><strong>Secure machine space</strong><span>Power, liquid cooling, storage, networks, fire protection and maintained access.</span></div>
          <div><strong>Visible community workshop</strong><span>Telemetry, workstations, project sessions, training and practical system knowledge.</span></div>
          <div><strong>Replaceable technical reference</strong><span>Workloads and local value lead future equipment choices across vendors and generations.</span></div>
        </aside>
      </div></section>

      <section class="section section-light"><div class="wrap reveal"><div class="section-heading dark-heading"><h2>What the rack is here to accelerate.</h2><p>Four very different projects show the value of a shared high-performance workbench.</p></div>${projectGallery(['media-network', 'extreme-matter', 'sandworm', 'clean-energy'], true)}</div></section>

      <section class="section section-ink"><div class="wrap reveal">
        <h2>The node around the rack</h2>
        <div class="layer-stack">
          <article><span>05</span><div><h3>Chosen network links</h3><p>Protocols for exchanging selected outputs or methods with other nodes.</p></div></article>
          <article><span>04</span><div><h3>Local applications</h3><p>Media tools, learning environments, models, maps, simulations and operational services.</p></div></article>
          <article><span>03</span><div><h3>Permissions and custody</h3><p>Who holds material, who accesses it, why it is used, and where it stays.</p></div></article>
          <article><span>02</span><div><h3>People and practical skill</h3><p>Operators, creators, maintainers, learners, cultural custodians and project partners.</p></div></article>
          <article><span>01</span><div><h3>Physical infrastructure</h3><p>The rack, network, storage, power, cooling, fire protection and secure rooms.</p></div></article>
        </div>
      </div></section>

      <section class="section section-aqua"><div class="wrap reveal">
        <h2>Questions worth answering before equipment</h2>
        <div class="question-grid">
          ${question('What earns daily use?', 'A clear set of ordinary workloads makes maintenance, training and cost visible.')}
          ${question('What stays local?', 'Data, model weights, logs, keys, backups and recovery arrangements each need an answer.')}
          ${question('Who holds access?', 'Technical administration and cultural permission are different responsibilities.')}
          ${question('What happens during disruption?', 'Power, connectivity, cooling and service priorities change when outside links fail.')}
          ${question('How does replacement work?', 'Portability and documented recovery reduce dependence on one vendor or generation.')}
          ${question('What evidence changes the plan?', 'A pilot is useful when its results leave room to stop, adjust or grow.')}
        </div>
      </div></section>

      <section class="section section-light"><div class="wrap split reveal">
        <div><h2>Reference hardware meets local engineering.</h2><p>Final configuration, building, power, liquid cooling, fire protection, network design, lifecycle cost and service arrangements develop from measured workloads and a real Dunwich site pathway.</p></div>
        <div class="source-card"><h3>Manufacturer reference</h3><p>The current NVIDIA page anchors the rack-scale discussion while the repeatable plan stays vendor-neutral and generation-flexible.</p><a class="text-link" href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" target="_blank" rel="noopener noreferrer">View NVIDIA GB200 NVL72 <span aria-hidden="true">↗</span></a></div>
      </div></section>`
  },

  'dunwich.html': {
    title: 'Dunwich through a local cultural compute node',
    description: 'An interactive Dunwich and Minjerribah place exploration connecting relationships, creative work, Country, island systems and chosen networks.',
    image: 'dunwich.webp',
    alt: 'Concept image of a colourful contemporary community workshop near a coastal ferry landing after rain',
    theme: 'coral',
    heading: 'Island life gives the node its shape.',
    lede: 'Dunwich brings relationships, ferry rhythms, cultural life, creative work, Country, coast and everyday services into the design of a local cultural compute node.',
    actions: [['Explore the place lenses', '#place-lenses'], ['Follow the repeatable plan', 'process.html']],
    body: `
      <section class="section section-coral place-opening"><div class="wrap place-bento reveal">
        <article class="place-bento-main"><h2>Dunwich changes the rack.</h2><p class="lead">Ferry access, island power, connectivity, cooling, heat, weather, creative practice and local service rhythms turn generic equipment into a place-specific workbench.</p><p>The node draws value from work already happening and projects already built. Cultural intelligence grows through relationship and interpretation around that work.</p></article>
        <article class="place-bento-card relationship-card"><span>01</span><h3>Existing projects</h3><p>Media, events, immersive capture, maps, repair and energy work already provide live questions and source material.</p></article>
        <article class="place-bento-card work-card"><span>02</span><h3>Island systems</h3><p>Ferry logistics, power, communications, heat and weather shape operations, maintenance and continuity.</p></article>
        <article class="place-bento-card network-card"><span>03</span><h3>Living relationships</h3><p>Luke lives on Straddie and has Indigenous friends interested in specific collaborations. Each activity develops through its own people, purpose and pace.</p></article>
      </div></section>

      <section class="section section-ink" id="place-lenses"><div class="wrap reveal">
        <div class="section-heading"><h2>One place, five working lenses</h2><p>Each lens changes what the node holds, what people do around it and which questions stay in view.</p></div>
        <div class="place-explorer" data-place-explorer>
          <div class="place-lenses" aria-label="Dunwich planning lenses">
            <button type="button" class="active" data-place-lens="relationships" aria-controls="place-relationships" aria-pressed="true"><span>Relationships</span><small>People before systems</small></button>
            <button type="button" data-place-lens="creative" aria-controls="place-creative" aria-pressed="false"><span>Creative work</span><small>Projects with rhythm</small></button>
            <button type="button" data-place-lens="country" aria-controls="place-country" aria-pressed="false"><span>Country and coast</span><small>Layered observation</small></button>
            <button type="button" data-place-lens="island" aria-controls="place-island" aria-pressed="false"><span>Island systems</span><small>Power and continuity</small></button>
            <button type="button" data-place-lens="connections" aria-controls="place-connections" aria-pressed="false"><span>Chosen links</span><small>A wider network</small></button>
          </div>
          <div class="place-panels" aria-live="polite">
            <article class="place-panel" id="place-relationships" data-place-panel="relationships">
              <div><h3>Relationships give the first workload meaning.</h3><p>The node begins as a shared object for conversation, experimentation and projects that people around it find worthwhile.</p><a class="text-link" href="culture.html">Explore cultural collaboration <span aria-hidden="true">→</span></a></div>
              <dl class="place-signals"><div><dt>Starting material</dt><dd>People, ideas and trust</dd></div><div><dt>Node contribution</dt><dd>Shared space and permission-aware tools</dd></div><div><dt>Question in view</dt><dd>What feels worth trying together?</dd></div></dl>
            </article>
            <article class="place-panel" id="place-creative" data-place-panel="creative">
              <div><h3>Real projects turn hardware into a place of practice.</h3><p>Film, sound, archives, language work, design, digital twins and local models bring recurring reasons to gather, learn and make.</p><a class="text-link" href="uses.html">Explore practical uses <span aria-hidden="true">→</span></a></div>
              <dl class="place-signals"><div><dt>Starting material</dt><dd>Existing creative energy</dd></div><div><dt>Node contribution</dt><dd>Compute, storage and production tools</dd></div><div><dt>Question in view</dt><dd>Which project earns the first session?</dd></div></dl>
            </article>
            <article class="place-panel" id="place-country" data-place-panel="country">
              <div><h3>Country and coast keep data connected to interpretation.</h3><p>Imagery, sound, field observations and local knowledge hold different provenance and boundaries. A digital twin presents chosen layers while Country exceeds the model.</p><a class="text-link" href="digital-twin.html">Explore the island digital twin <span aria-hidden="true">→</span></a></div>
              <dl class="place-signals"><div><dt>Starting material</dt><dd>Chosen observations and sources</dd></div><div><dt>Node contribution</dt><dd>Local processing and layered views</dd></div><div><dt>Question in view</dt><dd>Who interprets each layer?</dd></div></dl>
            </article>
            <article class="place-panel" id="place-island" data-place-panel="island">
              <div><h3>Island logistics make resilience practical.</h3><p>Ferries, power, connectivity, heat, weather, maintenance and spare parts become part of the operating story.</p><a class="text-link" href="node.html">Explore the rack as a workbench <span aria-hidden="true">→</span></a></div>
              <dl class="place-signals"><div><dt>Starting material</dt><dd>Island operating rhythms</dd></div><div><dt>Node contribution</dt><dd>Local capacity and recovery practice</dd></div><div><dt>Question in view</dt><dd>What keeps useful work flowing?</dd></div></dl>
            </article>
            <article class="place-panel" id="place-connections" data-place-panel="connections">
              <div><h3>Connection keeps the local centre intact.</h3><p>Selected outputs, methods and learning move between distinct nodes while names, protocols and cultural boundaries stay with each place.</p><a class="text-link" href="network.html">Explore the wider network <span aria-hidden="true">→</span></a></div>
              <dl class="place-signals"><div><dt>Starting material</dt><dd>A locally shaped node</dd></div><div><dt>Node contribution</dt><dd>Chosen exchange points</dd></div><div><dt>Question in view</dt><dd>Which links add real value?</dd></div></dl>
            </article>
          </div>
        </div>
      </div></section>

      <section class="section section-light" id="dunwich-projects"><div class="wrap reveal">
        <div class="section-heading dark-heading"><h2>Built around the island already.</h2><p>These public projects turn local context into media, evidence, events, repair, circular materials and place-based learning.</p></div>
        ${projectGallery(['gumpi-terminal', 'media-network', 'events-engine', 'grain-by-grain', 'makerspace', 'tip-loop'], true)}
      </div></section>

      <section class="section section-light"><div class="wrap reveal">
        <div class="place-route">
          <article><span>Here</span><h3>Local relationships</h3><p>Purpose and boundaries emerge from the people and place involved.</p></article>
          <i aria-hidden="true"></i>
          <article><span>Node</span><h3>Custom workbench</h3><p>Hardware, skills, access and workloads take a form suited to that context.</p></article>
          <i aria-hidden="true"></i>
          <article><span>Beyond</span><h3>Chosen global links</h3><p>Distinct local intelligences exchange what each relationship supports.</p></article>
        </div>
        <a class="button button-dark magnetic place-route-button" href="process.html"><span>Follow the repeatable plan</span></a>
      </div></section>

      <section class="section section-spectrum"><div class="wrap reveal"><div class="section-heading"><h2>Related place and policy context</h2><p>Earlier work and official public records sit here as supporting context.</p></div><div class="three-grid">
        <a class="project-card" href="https://auraofintelligence.github.io/ready-set-co-op-trust-hub/ballow-road.html" target="_blank" rel="noopener noreferrer"><strong>Earlier Ballow Road study</strong><span>A previous place-specific exploration of one shared rack.</span></a>
        <a class="project-card" href="https://www.parliament.qld.gov.au/Work-of-Committees/Inquiries/Inquiry-Details?id=8588" target="_blank" rel="noopener noreferrer"><strong>Queensland Parliament record</strong><span>The official 2026 inquiry and passage record.</span></a>
        <a class="project-card" href="https://www.legislation.qld.gov.au/view/whole/html/bill.first/bill-2026-006" target="_blank" rel="noopener noreferrer"><strong>Queensland legislation text</strong><span>State strategic project provisions in the public Bill text.</span></a>
      </div></div></section>`
  },

  'culture.html': {
    title: 'Cultural collaboration before cultural data',
    description: 'An exploratory framework for Indigenous and non-Indigenous collaboration where relationship, permission and cultural boundaries come before technical access.',
    image: 'culture.webp',
    alt: 'Concept image of a creative group working together in a contemporary media studio with a separate archive room',
    theme: 'gold',
    heading: 'Relationship gives the technology meaning.',
    lede: 'Indigenous and non-Indigenous collaboration takes form through specific people, projects and places. The node keeps each purpose, relationship, permission and output visible through the work.',
    actions: [['Explore a project record', '#layers'], ['Open the local examples', '#cultural-projects']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Different relationships remain visible together.</h2><p class="lead">One interview, event, film or place record may carry individual, family, organisational, community and cultural relationships at the same time.</p></div><div class="concept-panel"><p><strong>Living relationship</strong><br>People connected to the activity bring context, standing, memory and interpretation.</p><p><strong>Named purpose</strong><br>Viewing, storage, transcription, model work, publication and retention remain separate choices.</p><p><strong>Visible record</strong><br>Custody, access period, attribution, review and withdrawal travel with the material.</p></div></div></section>

      <section class="section section-ink" id="layers"><div class="wrap reveal"><div class="section-heading"><h2>One record. Different operations.</h2><p>Select an operation to see how permission changes while the underlying relationships stay attached.</p></div><div class="permission-board" data-permission-board>
        <button type="button" class="permission-tab active" data-layer="view" aria-pressed="true">View</button>
        <button type="button" class="permission-tab" data-layer="store" aria-pressed="false">Store</button>
        <button type="button" class="permission-tab" data-layer="transcribe" aria-pressed="false">Transcribe</button>
        <button type="button" class="permission-tab" data-layer="train" aria-pressed="false">Model work</button>
        <button type="button" class="permission-tab" data-layer="publish" aria-pressed="false">Publish</button>
        <button type="button" class="permission-tab" data-layer="withdraw" aria-pressed="false">Review and withdraw</button>
        <div class="permission-copy" data-layer-copy><h3>Viewing has its own terms.</h3><p>A person may view material for a named activity while storage, transcription, model work and publication remain separate conversations.</p></div>
      </div></div></section>

      <section class="section section-gold"><div class="wrap reveal"><h2>Questions that stay attached to material</h2><div class="question-grid">
        ${question('Who is connected to it?', 'A file may carry individual, family, organisational, community and cultural relationships at once.')}
        ${question('What purpose was agreed?', 'Viewing, preserving, teaching, transcribing and model training are separate uses.')}
        ${question('Where does it live?', 'Local storage, backups, logs, temporary copies and external services all matter.')}
        ${question('Who sees the record?', 'Access decisions, changes and exports need a history that relevant people understand.')}
        ${question('What happens later?', 'Review dates, withdrawal pathways and deletion limits belong in the first conversation.')}
        ${question('What remains human-held?', 'A project may record a direction or boundary while the knowledge itself stays in living relationship.')}
      </div></div></section>

      <section class="section section-ink" id="cultural-projects"><div class="wrap reveal"><div class="section-heading"><h2>Local projects give collaboration a real shape.</h2><p>Media, events and documentary work each bring different people, material, purposes and public outputs around the node.</p></div>${projectGallery(['media-network', 'events-engine', 'grain-by-grain'], true)}</div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Guidance worth bringing into each project.</h2><p>These public frameworks add practical questions about collective benefit, control, responsibility, ethics and research relationships. Each project still develops through its own people and context.</p></div><div class="link-stack"><a href="https://www.maiamnayriwingara.org/" target="_blank" rel="noopener noreferrer"><strong>Maiam nayri Wingara</strong><span>Indigenous Data Sovereignty Collective</span></a><a href="https://www.gida-global.org/care" target="_blank" rel="noopener noreferrer"><strong>CARE Principles</strong><span>Collective Benefit, Authority to Control, Responsibility and Ethics</span></a><a href="https://aiatsis.gov.au/research/ethical-research/code-ethics" target="_blank" rel="noopener noreferrer"><strong>AIATSIS Code of Ethics</strong><span>Official ethical research guidance</span></a></div></div></section>`
  },

  'uses.html': {
    title: 'Practical uses for a local node',
    description: 'A focused set of possible everyday and disruption workloads for one local cultural compute node.',
    image: 'uses.webp',
    alt: 'Concept image of a lively coastal workbench combining media production, environmental observation, learning and local computing',
    theme: 'lime',
    heading: 'Useful on an ordinary Tuesday.',
    lede: 'A local node makes more sense when people reach for it during everyday work. Emergency usefulness grows from equipment, skills and relationships already in use.',
    actions: [['Explore the local projects', '#workloads'], ['Open the place workbench', 'digital-twin.html']],
    body: `
      <section class="section section-light"><div class="wrap reveal">
        <div class="section-heading dark-heading"><h2>The same capability changes with the day.</h2><p>Choose a mode to see how four existing local directions change their workload, people and output.</p></div>
        <div class="mode-explorer" data-mode-explorer>
          <div class="mode-switch" aria-label="Choose an operating mode"><button class="active" type="button" data-mode="everyday" aria-controls="mode-everyday" aria-pressed="true">Ordinary Tuesday</button><button type="button" data-mode="disruption" aria-controls="mode-disruption" aria-pressed="false">During disruption</button></div>
          <div class="mode-panels" aria-live="polite">
            <div class="mode-panel" id="mode-everyday" data-mode-panel="everyday">
              <article><small>Screen and media</small><strong>Edit, transcribe, colour and render local productions.</strong><span>Creators, trainees and media crews use the rack as a shared studio engine.</span></article>
              <article><small>Events</small><strong>Build listings, run plans, place maps and public notices.</strong><span>Organisers and suppliers keep reusable records close to the island.</span></article>
              <article><small>Place evidence</small><strong>Process 360 captures, field records and simulation inputs.</strong><span>Project teams compare source-labelled views and record corrections.</span></article>
              <article><small>Making and energy</small><strong>Develop fabrication files, material loops and energy models.</strong><span>Makers, repairers and systems thinkers move between digital and physical work.</span></article>
            </div>
            <div class="mode-panel" id="mode-disruption" data-mode-panel="disruption">
              <article><small>Trusted local media</small><strong>Prepare selected updates and retain local production access.</strong><span>Known local relationships support clear information and durable records.</span></article>
              <article><small>Event infrastructure</small><strong>Reuse place, supplier and run records for local coordination.</strong><span>Existing tools shift towards changed access, notices and aftercare.</span></article>
              <article><small>Place evidence</small><strong>Compare previous captures with current field observations.</strong><span>Source dates, location precision and uncertainty stay visible through review.</span></article>
              <article><small>Making and energy</small><strong>Prioritise repair, service continuity and available power.</strong><span>Local skills, equipment and tested workflows shape the response.</span></article>
            </div>
          </div>
        </div>
      </div></section>

      <section class="section section-ink" id="workloads"><div class="wrap reveal">
        <div class="section-heading"><h2>Work already alive around the rack.</h2><p>These public projects carry real local context, interfaces, sources and next-stage workloads.</p></div>
        ${projectGallery(['media-network', 'gumpi-terminal', 'events-engine', 'twin-builders', 'grain-by-grain', 'wildlife-rescue', 'trust-hub', 'community-wealth'])}
      </div></section>

      <section class="section section-spectrum"><div class="wrap reveal">
        <div class="section-heading"><h2>Culture becomes music, motion and usable public knowledge.</h2><p>These live engines show how one rack supports cultural production, visual pipelines and citation-first public-law research.</p></div>
        ${projectGallery(['music-universe', 'infinity-engine', 'legal-engine'])}
      </div></section>

      <section class="section section-lime"><div class="wrap reveal">
        <div class="section-heading dark-heading"><h2>Frontier directions worth arguing about.</h2><p>Makerspace, circular materials, extreme matter, subterranean systems, clean energy and a public hub turn the rack into an instrument for ambitious local experimentation.</p></div>
        ${projectGallery(['makerspace', 'tip-loop', 'extreme-matter', 'sandworm', 'clean-energy', 'ballow-road'])}
      </div></section>

      <section class="section section-light"><div class="wrap reveal">
        <div class="evidence-route"><article><small>01</small><strong>Choose a live question</strong><span>Start with a project people already care about.</span></article><i aria-hidden="true">→</i><article><small>02</small><strong>Run it on the node</strong><span>Record energy, time, quality, skills and local value.</span></article><i aria-hidden="true">→</i><article><small>03</small><strong>Publish what was learned</strong><span>Give the next project a stronger starting point.</span></article></div>
        <div class="section-action-row"><a class="button button-dark magnetic" href="process.html"><span>Shape the repeatable plan</span></a><a class="text-link" href="network.html">See the wider network <span aria-hidden="true">→</span></a></div>
      </div></section>`
  },

  'digital-twin.html': {
    title: 'Place modelling workloads for Dunwich',
    description: 'A source-to-rack workbench connecting real Minjerribah maps, 360 evidence, media worlds and island continuity questions.',
    image: 'digital-twin.webp',
    alt: 'Concept image of a moonlit island model formed from colourful transparent data layers above a circular table',
    theme: 'blue',
    heading: 'Local models need a serious workbench.',
    lede: 'Dunwich already has public place records, 360 captures, event maps, prompt builders and ambitious simulation work. The rack brings those separate sources into traceable workloads built around one question at a time.',
    actions: [['Open the workload explorer', '#model-workbench'], ['See the local foundations', '#model-foundations']],
    body: `
      <section class="section section-light" id="model-foundations"><div class="wrap reveal">
        <div class="section-heading dark-heading"><h2>Real foundations already exist.</h2><p>Each public project contributes a different part of the workload: evidence, structured place records, or portable world-building instructions.</p></div>
        ${projectGallery(['gumpi-terminal', 'events-engine', 'twin-builders'], true)}
      </div></section>

      <section class="section section-ink" id="model-workbench"><div class="wrap reveal">
        <div class="section-heading"><h2>Choose the question. Trace the whole job.</h2><p>Every selection exposes the source, rack work, output, review record and present project status.</p></div>
        <div class="workbench-explorer" data-workbench-explorer>
          <div class="workbench-tabs" aria-label="Choose a local modelling workload">
            <button class="active" type="button" data-workbench-mode="gumpi" aria-controls="workbench-gumpi" aria-pressed="true"><span>Gumpi 360</span><small>Site evidence</small></button>
            <button type="button" data-workbench-mode="events" aria-controls="workbench-events" aria-pressed="false"><span>Events map</span><small>Place coordination</small></button>
            <button type="button" data-workbench-mode="screen" aria-controls="workbench-screen" aria-pressed="false"><span>Screen world</span><small>Immersive media</small></button>
            <button type="button" data-workbench-mode="continuity" aria-controls="workbench-continuity" aria-pressed="false"><span>Node continuity</span><small>Island systems</small></button>
          </div>
          <div class="workbench-panels" aria-live="polite">
            <article class="workbench-panel" id="workbench-gumpi" data-workbench-panel="gumpi">
              <header><small>Working public prototype</small><h3>Explore ferry gateway choices through traceable captures.</h3></header>
              <div class="workbench-flow"><div><small>Source</small><strong>33 GPS-rounded 360 points and official project records</strong></div><i aria-hidden="true">→</i><div><small>Rack work</small><strong>Align imagery, compare options and render walkthroughs</strong></div><i aria-hidden="true">→</i><div><small>Output</small><strong>Reviewable views with date, precision and source attached</strong></div></div>
              <dl><div><dt>Local project</dt><dd>Dunwich (Gumpi) Ferry Terminal Open Data Lab</dd></div><div><dt>Review focus</dt><dd>Source quality, missing views, public interpretation and changed conditions</dd></div><div><dt>Next compute job</dt><dd>Photogrammetry and LiDAR processing from stronger capture sets</dd></div></dl>
              <a class="button button-bright magnetic" href="https://auraofintelligence.github.io/dunwich-gumpi-ferry-terminal-open-data-lab/" target="_blank" rel="noopener noreferrer"><span>Open the evidence lab</span></a>
            </article>
            <article class="workbench-panel" id="workbench-events" data-workbench-panel="events">
              <header><small>Working public tool</small><h3>Turn events and places into reusable coordination records.</h3></header>
              <div class="workbench-flow"><div><small>Source</small><strong>Organiser records, places, suppliers and public pathways</strong></div><i aria-hidden="true">→</i><div><small>Rack work</small><strong>Index records, test runs and assemble local notices</strong></div><i aria-hidden="true">→</i><div><small>Output</small><strong>Maps and downloadable Markdown with provenance intact</strong></div></div>
              <dl><div><dt>Local project</dt><dd>Quandamooka Country Events Engine</dd></div><div><dt>Review focus</dt><dd>Organiser source, dates, place precision and aftercare</dd></div><div><dt>Next compute job</dt><dd>Local semantic search and richer event simulations</dd></div></dl>
              <a class="button button-bright magnetic" href="https://auraofintelligence.github.io/quandamooka-country-events-engine/" target="_blank" rel="noopener noreferrer"><span>Open the Events Engine</span></a>
            </article>
            <article class="workbench-panel" id="workbench-screen" data-workbench-panel="screen">
              <header><small>Connected public builders</small><h3>Move from a chosen place to a reviewable media world.</h3></header>
              <div class="workbench-flow"><div><small>Source</small><strong>Project media, scene choices and portable prompt packets</strong></div><i aria-hidden="true">→</i><div><small>Rack work</small><strong>Edit, transcribe, generate, render and version locally</strong></div><i aria-hidden="true">→</i><div><small>Output</small><strong>Selected film, image, spatial scene or simulation version</strong></div></div>
              <dl><div><dt>Local projects</dt><dd>Screen & Media Network and Straddie Digital Twin Builders</dd></div><div><dt>Review focus</dt><dd>Creator terms, contributors, credits, locations and release version</dd></div><div><dt>Next compute job</dt><dd>High-resolution rendering and interactive scene generation</dd></div></dl>
              <a class="button button-bright magnetic" href="https://auraofintelligence.github.io/straddie-digital-twin-builders/" target="_blank" rel="noopener noreferrer"><span>Open the scene builder</span></a>
            </article>
            <article class="workbench-panel" id="workbench-continuity" data-workbench-panel="continuity">
              <header><small>Proposed rack workload</small><h3>Explore how island systems shape useful node operation.</h3></header>
              <div class="workbench-flow"><div><small>Source</small><strong>Power, cooling, heat, ferry, network and weather records</strong></div><i aria-hidden="true">→</i><div><small>Rack work</small><strong>Run scenarios across demand, disruption and recovery choices</strong></div><i aria-hidden="true">→</i><div><small>Output</small><strong>Service priorities, operating envelope and recovery practice</strong></div></div>
              <dl><div><dt>Local project</dt><dd>Dunwich cultural compute node</dd></div><div><dt>Review focus</dt><dd>Measured inputs, energy budget, maintained services and people involved</dd></div><div><dt>Next compute job</dt><dd>A source-labelled node continuity model built from real engineering data</dd></div></dl>
              <a class="button button-bright magnetic" href="node.html"><span>Explore the rack</span></a>
            </article>
          </div>
        </div>
      </div></section>

      <section class="section section-blue"><div class="wrap prototype-status reveal">
        <div><small>Next-stage prototype</small><h2>The Minjerribah Living Twin belongs in the rebuild queue.</h2><p class="lead">Its substantial data and systems catalogue now needs stronger spatial geometry, architecture, compute and embedding quality before it serves this site as a working instrument.</p></div>
        <a class="button button-dark magnetic" href="https://auraofintelligence.github.io/minjerribah-living-twin/" target="_blank" rel="noopener noreferrer"><span>View the current prototype separately</span></a>
      </div></section>

      <section class="section section-light"><div class="wrap country-principle reveal"><h2>Country exceeds every model.</h2><div><p><strong>Computational records</strong><span>Public maps, node telemetry, chosen observations and project material remain distinct, sourced layers.</span></p><p><strong>Living interpretation</strong><span>People connected to place interpret what a layer means, where it ends and what another view misses.</span></p><p><strong>Cultural relationships</strong><span>Cultural knowledge follows the people, purpose and relationships around a specific activity rather than an automatic map control.</span></p></div></div></section>`
  },

  'process.html': {
    title: 'A repeatable and customisable plan',
    description: 'A seven-part process for exploring a locally shaped cultural compute node without treating one place as a template for another.',
    image: 'process.webp',
    alt: 'Concept image of a planning room where local workloads flow as separate coloured layers between one computing rack and an island model',
    theme: 'magenta',
    heading: 'Repeat the process, not the answer.',
    lede: 'The reusable part is a way of asking questions, testing a working version and leaving local choice intact. The equipment, name, relationships, permissions and uses remain different in every place.',
    actions: [['Build a node brief', '#plan-builder'], ['Walk through the process', '#plan']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Customisable by design</h2><p class="lead">The questions, evidence loop and learning travel. Purpose, pace, equipment, language, relationships and connections take a local form each time.</p></div><div class="concept-panel"><p><strong>Repeatable questions</strong><br>Purpose, relationships, workloads, place, people, evidence and connections.</p><p><strong>Local answers</strong><br>Each group writes its own brief in its own words and order.</p><p><strong>Living record</strong><br>The working brief develops through sessions, pilots, corrections and new possibilities.</p></div></div></section>

      <section class="section section-ink" id="plan-builder"><div class="wrap reveal">
        <div class="section-heading"><h2>Build a working node brief.</h2><p>Blank fields leave every choice with the visitor. Entries stay in this browser tab until copied or downloaded.</p></div>
        <div class="node-plan-builder" data-node-plan-builder>
          <form class="plan-fields" data-plan-fields>
            <label><span>Place and purpose</span><textarea name="place" rows="4" placeholder="Place, people, question and reason for exploring"></textarea></label>
            <label><span>Relationships and permissions</span><textarea name="relationships" rows="4" placeholder="People connected to the work, material, custody and operation-specific permissions"></textarea></label>
            <label><span>Everyday workloads</span><textarea name="everyday" rows="4" placeholder="Projects, inputs, outputs, people and recurring local value"></textarea></label>
            <label><span>Disruption roles</span><textarea name="disruption" rows="4" placeholder="Useful services, priorities, power envelope, communications and recovery practice"></textarea></label>
            <label><span>Equipment holder and people</span><textarea name="people" rows="4" placeholder="Asset holder, operators, creators, maintainers, learners and project reviewers"></textarea></label>
            <label><span>Hardware and connections</span><textarea name="hardware" rows="4" placeholder="Compute scale, storage, power, cooling, workshop and chosen outside links"></textarea></label>
            <label><span>Evidence and next review</span><textarea name="evidence" rows="4" placeholder="Measures, public value, unresolved questions, review point and possible next movements"></textarea></label>
          </form>
          <aside class="plan-output"><div><small>Live Markdown brief</small><strong data-plan-title>Cultural compute node working brief</strong></div><pre aria-live="polite"><code data-plan-preview></code></pre><div class="plan-actions"><button type="button" class="button button-bright" data-plan-copy><span>Copy Markdown</span></button><button type="button" class="button button-ghost" data-plan-download><span>Download .md</span></button></div><p data-plan-message aria-live="polite"></p></aside>
        </div>
      </div></section>

      <section class="section section-light" id="plan"><div class="wrap reveal"><h2>Seven movements</h2><div class="plan-list">
        ${planStep('01', 'Listen locally', 'Gather purposes, concerns, existing projects and points of difference. Record who is present and whose perspectives remain to be heard.', 'Output: a living question map.')}
        ${planStep('02', 'Map relationships and permission', 'Separate technical access, legal rights, cultural relationships, personal consent, organisational responsibility and public material.', 'Output: permission dimensions and open questions.')}
        ${planStep('03', 'Choose grounded workloads', 'Select work people already value or genuinely want to test. Describe inputs, outputs, users, risks and human review.', 'Output: a defined workload portfolio.')}
        ${planStep('04', 'Shape the physical node', 'Match equipment, storage, power, cooling, access, safety and maintenance to those workloads and the place.', 'Output: a vendor-neutral reference design.')}
        ${planStep('05', 'Build the people layer', 'Identify paid roles, training, creative practice, operations, cultural review, maintenance and outside expertise.', 'Output: a skills and responsibility map.')}
        ${planStep('06', 'Test a working version', 'Run grounded pilots and observe real use, energy, time, quality, access and unintended effects.', 'Output: evidence and corrections.')}
        ${planStep('07', 'Choose what happens next', 'Local participants weigh the evidence and choose to stop, adjust, repeat, expand or connect selected parts elsewhere.', 'Output: a documented local choice.')}
      </div></div></section>

      <section class="section section-magenta"><div class="wrap reveal"><h2>Four records that travel well</h2><div class="four-grid"><article class="solid-card"><h3>Purpose card</h3><p>What is being explored, for whom, and what sits outside scope.</p></article><article class="solid-card"><h3>Permission map</h3><p>Material, people, purposes, access, custody, review and withdrawal.</p></article><article class="solid-card"><h3>Node sheet</h3><p>Workloads, equipment, place requirements, skills, costs and recovery.</p></article><article class="solid-card"><h3>Evidence log</h3><p>What was tried, what happened, whose view is recorded and what changed.</p></article></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Connections follow local purpose.</h2><p>A node may share a public method, selected output, benchmark, open tool, model component or learning exchange. Every bridge keeps its cargo, source and terms visible.</p></div><a class="button button-dark magnetic" href="network.html"><span>Explore chosen connections</span></a></div></section>`
  },

  'cooperative.html': {
    title: 'The cooperative layer around the node',
    description: 'Ready Sustainable Employment and Training as the shared work, skill, equipment and service layer around one cultural compute node.',
    image: 'cooperative.webp',
    alt: 'Concept image of an intergenerational group sharing media and technical equipment in a warm cooperative workspace',
    theme: 'orange',
    heading: 'Shared work around shared equipment.',
    lede: 'Ready Sustainable Employment and Training describes a cooperative layer around the node: practical pathways into paid work, learning, equipment access and locally useful services.',
    actions: [['See possible roles', '#roles'], ['Explore the network', 'network.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>The co-op keeps useful work moving.</h2><p class="lead">A cooperative layer holds equipment, coordinates services, creates paid pathways and supports learning. Cultural decisions stay with the people and relationships connected to each project.</p></div><div class="concept-panel"><p><strong>Equipment layer</strong><br>Access, booking, maintenance, insurance and lifecycle planning.</p><p><strong>Work layer</strong><br>Paid projects, technical services, creative production and local operations.</p><p><strong>Learning layer</strong><br>Supported practice, mentoring, credentials where useful and peer exchange.</p></div></div></section>

      <section class="section section-ink" id="roles"><div class="wrap reveal"><h2>Possible roles around one node</h2><div class="role-wheel" data-role-wheel><button type="button" data-role="operator">Node operations</button><button type="button" data-role="media">Media production</button><button type="button" data-role="data">Data stewardship</button><button type="button" data-role="culture">Cultural review</button><button type="button" data-role="learning">Learning support</button><button type="button" data-role="field">Field observation</button><button type="button" data-role="care">Maintenance and care</button><div class="role-copy" data-role-copy><h3>Node operations</h3><p>Monitoring, access, backups, incident records, service priorities and recovery practice.</p></div></div></div></section>

      <section class="section section-orange"><div class="wrap reveal"><h2>Value beyond machine time</h2><div class="three-grid"><article class="solid-card"><h3>Local capability</h3><p>More people understand how the system works, where its limits sit and how to recover it.</p></article><article class="solid-card"><h3>Shared access</h3><p>Equipment that is unrealistic for one person becomes a managed resource for suitable projects.</p></article><article class="solid-card"><h3>Longer relationships</h3><p>Repeated work supports trust, correction and continuity beyond one short technical pilot.</p></article></div></div></section>

      <section class="section section-ink"><div class="wrap reveal"><div class="section-heading"><h2>Existing projects already reveal the work.</h2><p>Shared media production, a maker workshop and community-wealth research each need different roles around the same local infrastructure.</p></div>${projectGallery(['trust-hub', 'media-network', 'makerspace', 'community-wealth'], true)}</div></section>

      <section class="section section-light"><div class="wrap reveal"><h2>Questions for a real cooperative conversation</h2><div class="boundary-list"><p><strong>Membership:</strong> Who wants to participate, and under what terms?</p><p><strong>Benefit:</strong> What value stays with workers, creators, custodians and the local community?</p><p><strong>Responsibility:</strong> Who holds equipment risk, employment duties, privacy and service obligations?</p><p><strong>Boundaries:</strong> Which decisions sit with the co-op, and which clearly do not?</p><p><strong>Exit:</strong> What happens to equipment, data, access and unfinished work if the structure changes?</p></div></div></section>`
  },

  'network.html': {
    title: 'A network of distinct local intelligences',
    description: 'A node-to-node network where each place keeps its own identity, permissions and centre while selecting what travels.',
    image: 'network.webp',
    alt: 'Concept image of colourful island-like intelligence nodes forming a loose constellation across Oceania and the globe',
    theme: 'cyan',
    heading: 'A constellation of local intelligences.',
    lede: 'The Dunwich rack begins inside a local network that already exists. Media, events, place evidence, making, energy and community wealth each bring a different intelligence and a different connection.',
    actions: [['Explore the local constellation', '#connections'], ['Open Project Atlas', 'https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest', true]],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Family without sameness</h2><p class="lead">One place may centre language work, another climate observation, another film, health, learning, infrastructure or an idea still waiting for its first name.</p></div><div class="concept-panel"><p><strong>Local identity</strong><br>Each node carries its own name, purposes, relationships and way of working.</p><p><strong>Named cargo</strong><br>Every connection states whether it carries a public method, selected output, tool, benchmark or learning exchange.</p><p><strong>Living connection</strong><br>People revisit the purpose, terms and value of each bridge as projects change.</p></div></div></section>

      <section class="section section-ink" id="connections"><div class="wrap reveal">
        <div class="section-heading"><h2>The first constellation is already local.</h2><p>Clicking a project opens the real public work in a separate tab.</p></div>
        ${projectGallery(['media-network', 'music-universe', 'infinity-engine', 'legal-engine', 'events-engine', 'gumpi-terminal', 'makerspace', 'tip-loop', 'clean-energy', 'community-wealth'], true)}
      </div></section>

      <section class="section section-cyan"><div class="wrap reveal"><h2>Every bridge names its cargo.</h2><div class="cargo-grid">
        <article><small>Events Engine → Dunwich node</small><strong>Structured public records</strong><p>Event, place and supplier records support local search, simulation, notices and continuity workflows.</p><span>Source and organiser stay attached.</span></article>
        <article><small>Media Network → Dunwich node</small><strong>Named production workloads</strong><p>Editing, transcription, rendering and archive search sit inside the terms of each screen project.</p><span>Creators and contributors stay visible.</span></article>
        <article><small>Dunwich node → other places</small><strong>Reusable public methods</strong><p>Workload patterns, energy findings, open tools and selected outputs give another place a stronger starting point.</p><span>Local names and protocols stay local.</span></article>
      </div></div></section>

      <section class="section section-spectrum"><div class="wrap reveal">
        ${adventureProject()}
        <div class="section-action-row light-actions"><p>Project Atlas reveals the larger 2026 body of work. This node follows the cultural compute thread through it.</p><a class="button button-glass magnetic" href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer"><span>Open the filtered Project Atlas</span></a></div>
      </div></section>`
  },

  'sitemap.html': {
    title: 'Complete sitemap',
    description: 'Every page and principal public source in the Ready S.E.T. Co-op Cultural Intelligence Node website.',
    image: 'sitemap.webp',
    alt: 'Concept image of ten luminous portals distributed across a colourful night-time island archipelago',
    theme: 'purple',
    heading: 'Every path through the node.',
    lede: 'The complete page map, followed by the main public sources and related projects. Internal pages stay in this window; outside sources open separately.',
    actions: [['Browse every page', '#all-pages'], ['Return home', 'index.html']],
    body: `
      <section class="section section-light" id="all-pages"><div class="wrap reveal"><h2>Website pages</h2><div class="sitemap-grid">
        ${siteEntry('index.html', 'Home', 'The concept, its boundaries and the seven-movement overview.')}
        ${siteEntry('node.html', 'One rack', 'The physical reference and the people, permissions and applications around it.')}
        ${siteEntry('dunwich.html', 'Dunwich place study', 'Island systems, relationships and public projects already built around the place.')}
        ${siteEntry('culture.html', 'Cultural collaboration', 'Overlapping relationships, operation-by-operation permissions and local project examples.')}
        ${siteEntry('uses.html', 'Practical uses', 'Working local foundations and frontier directions around the rack.')}
        ${siteEntry('digital-twin.html', 'Place modelling', 'Traceable source-to-rack workloads built from real local project foundations.')}
        ${siteEntry('process.html', 'Repeatable plan', 'The customisable seven-part process and its four portable records.')}
        ${siteEntry('cooperative.html', 'Co-op layer', 'Employment, training, equipment and service roles around the node.')}
        ${siteEntry('network.html', 'Wider network', 'Chosen connections between distinct local intelligences.')}
        ${siteEntry('sitemap.html', 'Sitemap', 'This complete map of pages, sources, boundaries and licence.')}
      </div></div></section>

      <section class="section section-ink"><div class="wrap reveal"><h2>Main public sources</h2><div class="link-stack wide"><a href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" target="_blank" rel="noopener noreferrer"><strong>NVIDIA GB200 NVL72</strong><span>Current manufacturer hardware reference</span></a><a href="https://www.maiamnayriwingara.org/" target="_blank" rel="noopener noreferrer"><strong>Maiam nayri Wingara</strong><span>Indigenous Data Sovereignty Collective</span></a><a href="https://www.gida-global.org/care" target="_blank" rel="noopener noreferrer"><strong>CARE Principles</strong><span>Indigenous data-governance principles</span></a><a href="https://aiatsis.gov.au/research/ethical-research/code-ethics" target="_blank" rel="noopener noreferrer"><strong>AIATSIS Code of Ethics</strong><span>Ethical research guidance</span></a><a href="https://www.parliament.qld.gov.au/Work-of-Committees/Inquiries/Inquiry-Details?id=8588" target="_blank" rel="noopener noreferrer"><strong>Queensland Parliament Bill inquiry</strong><span>Official 2026 process record</span></a><a href="https://www.legislation.qld.gov.au/view/whole/html/bill.first/bill-2026-006" target="_blank" rel="noopener noreferrer"><strong>Queensland legislation text</strong><span>Official State strategic project provisions</span></a></div></div></section>

      <section class="section section-purple"><div class="wrap reveal"><div class="section-heading"><h2>Local public project network</h2><p>The complete focused set linked from this website. Every project opens in a separate tab.</p></div>${projectGallery(['media-network', 'gumpi-terminal', 'events-engine', 'twin-builders', 'grain-by-grain', 'wildlife-rescue', 'trust-hub', 'community-wealth', 'music-universe', 'infinity-engine', 'legal-engine', 'makerspace', 'tip-loop', 'extreme-matter', 'sandworm', 'clean-energy', 'ballow-road'], true)}</div></section>

      <section class="section section-spectrum"><div class="wrap reveal">${adventureProject()}<div class="section-action-row light-actions"><p>Project Atlas, Future of Life 2045 and related public work provide the wider horizon.</p><div class="inline-link-row"><a href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer">Project Atlas ↗</a><a href="https://auraofintelligence.github.io/Future-of-Life-2045/" target="_blank" rel="noopener noreferrer">Future of Life 2045 ↗</a><a href="https://auraofintelligence.github.io/Oceania-healthy-de-slop-co-ops/" target="_blank" rel="noopener noreferrer">Oceania Healthy De-Slop Co-ops ↗</a></div></div></div></section>

      <section class="section section-ink"><div class="wrap reveal"><h2>Submissions and support documents</h2><p class="lead">Public Markdown editions of the supplied source documents. They show the wider thinking while this website stays with the single-node process.</p><div class="link-stack wide"><a href="supporting-documents/senate-ai-and-data-centres-submission-2026.md"><strong>Senate AI and Data Centres Submission</strong><span>Australian infrastructure submission, 2026</span></a><a href="supporting-documents/aukus-public-inquiry-submission-2026.md"><strong>AUKUS Public Inquiry Submission</strong><span>Australian public-inquiry submission, 2026</span></a><a href="supporting-documents/a-fair-go-for-the-ai-age.md"><strong>A Fair Go for the AI Age</strong><span>Postcode-level sovereign compute as shared national infrastructure</span></a><a href="supporting-documents/do-not-put-all-our-eggs-in-one-basket.md"><strong>Do Not Put All Our Eggs in One Basket</strong><span>Distributed national compute and resilience</span></a><a href="supporting-documents/local-government-funding-inquiry-submission.md"><strong>Local Government Funding Inquiry Submission</strong><span>Local-government funding and infrastructure context</span></a><a href="supporting-documents/fiji-australia-vuvale-union-submission-2026.md"><strong>Fiji-Australia Vuvale Union Submission</strong><span>Oceania relationship and infrastructure context</span></a><a href="supporting-documents/ocean-of-peace-alliance-veitacini-treaty-submission-2026.md"><strong>Ocean of Peace Alliance and Veitacini Treaty Submission</strong><span>Oceania cooperation context</span></a><a href="supporting-documents/setco-2026-pitch-plan-revision.md"><strong>Ready S.E.T. Co-op 2026 Pitch Plan</strong><span>Earlier planning source, not a current declaration</span></a><a href="supporting-documents/README.md"><strong>Document index and boundaries</strong><span>Source notes for the complete set</span></a></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Repository and licence</h2><p>The source, change history and image provenance are public. The Strange But True Public Source Licence permits non-commercial study and adaptation under its stated conditions.</p></div><div class="link-stack"><a href="https://github.com/auraofintelligence/ready-set-co-op-cultural-intelligence-node" target="_blank" rel="noopener noreferrer"><strong>GitHub repository</strong><span>Source and change history</span></a><a href="LICENSE"><strong>Strange But True Public Source Licence</strong><span>Reuse terms and cultural-rights boundary</span></a><a href="IMAGE-PROMPTS.md"><strong>Original image prompt record</strong><span>Page-by-page generated visual provenance</span></a></div></div></section>`
  }
};

function localProject(id, compact = false) {
  const project = projectById[id];
  if (!project) throw new Error(`Unknown public project: ${id}`);
  return `<a class="local-project-card${compact ? ' compact' : ''}" href="${project.url}" target="_blank" rel="noopener noreferrer">
    <span class="project-image"><img src="assets/projects/${project.image}" alt="" loading="lazy" decoding="async" width="960" height="600"><small>${project.status}</small></span>
    <span class="project-copy"><strong>${project.title}</strong><span>${project.description}</span><em><b>Rack connection</b>${project.rack}</em><i aria-hidden="true">Open project ↗</i></span>
  </a>`;
}

function projectGallery(ids, compact = false) {
  return `<div class="local-project-grid${compact ? ' compact-grid' : ''}">${ids.map(id => localProject(id, compact)).join('')}</div>`;
}

function adventureProject() {
  const project = projectById['community-ledger'];
  return `<a class="adventure-project" href="${project.url}" target="_blank" rel="noopener noreferrer">
    <img src="assets/projects/${project.image}" alt="" loading="lazy" decoding="async" width="1440" height="720">
    <span><small>${project.status}</small><strong>Choose your own adventure.</strong><p>${project.description}</p><b>Open the Community Ledger <i aria-hidden="true">↗</i></b></span>
  </a>`;
}

function portal(href, title, copy) {
  return `<a class="portal-card" href="${href}"><span>${title}</span><p>${copy}</p><b aria-hidden="true">↗</b></a>`;
}

function question(title, copy) {
  return `<article><h3>${title}</h3><p>${copy}</p></article>`;
}

function planStep(number, title, copy, output) {
  return `<article><span>${number}</span><div><h3>${title}</h3><p>${copy}</p><small>${output}</small></div></article>`;
}

function siteEntry(href, title, copy) {
  return `<a href="${href}"><strong>${title}</strong><span>${copy}</span><b aria-hidden="true">→</b></a>`;
}

function nav(current) {
  return routes.map(route => `<a href="${route.file}"${route.file === current ? ' aria-current="page"' : ''}>${route.label}</a>`).join('');
}

function actions(items) {
  return items.map(([label, href, external], index) => `<a class="button ${index ? 'button-ghost' : 'button-bright'} magnetic" href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>${label}</span></a>`).join('');
}

function pageTemplate(file, page) {
  const index = routes.findIndex(route => route.file === file);
  const previous = routes[(index - 1 + routes.length) % routes.length];
  const next = routes[(index + 1) % routes.length];
  const canonical = file === 'index.html' ? baseUrl : `${baseUrl}${file}`;
  return `<!doctype html>
<html lang="en-AU" data-theme="${page.theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title} | Ready S.E.T. Co-op</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#090912">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192.png">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="preload" as="image" href="assets/heroes/${page.image}" type="image/webp">
  <link rel="stylesheet" href="assets/styles.css">
  <script src="assets/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-site-header>
    <a class="brand" href="index.html" aria-label="Ready S.E.T. Co-op home"><img src="assets/favicon-32.png" width="32" height="32" alt=""><span><strong>Ready S.E.T. Co-op</strong><small>Cultural Intelligence Node</small></span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span>Menu</span><i aria-hidden="true"></i></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation" data-site-nav>${nav(file)}</nav>
  </header>
  <main id="main">
    <section class="hero" data-hero>
      <img class="hero-image" src="assets/heroes/${page.image}" alt="${page.alt}" width="1774" height="886">
      <div class="hero-shade"></div>
      <div class="hero-light" data-hero-light></div>
      <div class="hero-content wrap">
        <h1>${page.heading}</h1>
        <p>${page.lede}</p>
        <div class="hero-actions">${actions(page.actions)}</div>
      </div>
      <a class="scroll-cue" href="#after-hero"><span>Explore</span><i aria-hidden="true"></i></a>
    </section>
    <div id="after-hero"></div>
    ${page.body.trim()}
  </main>
  <footer class="site-footer">
    <div class="wrap route-nav">
      <a class="route-link previous" href="${previous.file}"><small>Previous</small><strong><span aria-hidden="true">←</span> ${previous.label}</strong></a>
      <a class="route-link next" href="${next.file}"><small>Next</small><strong>${next.label} <span aria-hidden="true">→</span></strong></a>
    </div>
    <div class="wrap footer-base">
      <div><strong>Ready S.E.T. Co-op</strong><p>A self-sovereign exploration of one local cultural compute node.</p></div>
      <div class="footer-links"><a href="sitemap.html">Sitemap</a><a href="LICENSE">Licence</a><a href="https://github.com/auraofintelligence/ready-set-co-op-cultural-intelligence-node" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
      <p class="boundary-note">Public working concept by Luke Nathan Hayes. Project status, relationships and sources are identified where they appear.</p>
    </div>
  </footer>
  <button class="to-top" type="button" aria-label="Return to top" data-to-top><span aria-hidden="true">↑</span></button>
</body>
</html>`;
}

for (const route of routes) {
  fs.writeFileSync(path.join(root, route.file), pageTemplate(route.file, pages[route.file]), 'utf8');
}

const notFound = `<!doctype html>
<html lang="en-AU" data-theme="violet"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Path not found | Ready S.E.T. Co-op</title><meta name="robots" content="noindex"><meta name="theme-color" content="#090912"><link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png"><link rel="stylesheet" href="assets/styles.css"><script src="assets/site.js" defer></script></head>
<body><a class="skip-link" href="#main">Skip to content</a><header class="site-header" data-site-header><a class="brand" href="index.html"><img src="assets/favicon-32.png" width="32" height="32" alt=""><span><strong>Ready S.E.T. Co-op</strong><small>Cultural Intelligence Node</small></span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span>Menu</span><i aria-hidden="true"></i></button><nav class="site-nav" id="site-nav" aria-label="Main navigation" data-site-nav>${nav('404.html')}</nav></header><main id="main"><section class="hero hero-404"><img class="hero-image" src="assets/heroes/not-found.webp" alt="Concept image of branching moonlit paths through coastal dunes" width="1774" height="886"><div class="hero-shade"></div><div class="hero-light" data-hero-light></div><div class="hero-content wrap"><h1>This path drifts into the dunes.</h1><p>The page may have moved. The complete sitemap brings every current route back into view.</p><div class="hero-actions"><a class="button button-bright magnetic" href="sitemap.html"><span>Open the sitemap</span></a><a class="button button-ghost magnetic" href="index.html"><span>Return home</span></a></div></div></section><section class="section section-light"><div class="wrap split"><div><h2>Every current page is still close by</h2><p>The public page map brings every current path together.</p></div><a class="button button-dark magnetic" href="sitemap.html"><span>See every page</span></a></div></section></main><footer class="site-footer"><div class="wrap route-nav"><a class="route-link previous" href="sitemap.html"><small>Previous</small><strong><span aria-hidden="true">←</span> Sitemap</strong></a><a class="route-link next" href="index.html"><small>Next</small><strong>Home <span aria-hidden="true">→</span></strong></a></div><div class="wrap footer-base"><div><strong>Ready S.E.T. Co-op</strong><p>A self-sovereign exploration of one local cultural compute node.</p></div><div class="footer-links"><a href="sitemap.html">Sitemap</a><a href="LICENSE">Licence</a><a href="https://github.com/auraofintelligence/ready-set-co-op-cultural-intelligence-node" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div><p class="boundary-note">Public working concept by Luke Nathan Hayes. Project status, relationships and sources are identified where they appear.</p></div></footer><button class="to-top" type="button" aria-label="Return to top" data-to-top><span aria-hidden="true">↑</span></button></body></html>`;
fs.writeFileSync(path.join(root, '404.html'), notFound, 'utf8');

const redirect = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Repeatable plan | Ready S.E.T. Co-op</title><meta http-equiv="refresh" content="0; url=process.html"><link rel="canonical" href="${baseUrl}process.html"></head><body><p>The custom model page has become the <a href="process.html">repeatable plan</a>.</p></body></html>`;
fs.writeFileSync(path.join(root, 'model.html'), redirect, 'utf8');

const sitemapFiles = [...routes.map(route => route.file), ...supportFiles];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles.map(file => `  <url><loc>${file === 'index.html' ? baseUrl : `${baseUrl}${file}`}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Built ${routes.length} public pages, 404.html, model.html redirect and sitemap.xml.`);
