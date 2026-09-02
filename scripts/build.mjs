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
            <h2>A smaller starting point</h2>
            <p class="lead">Between a laptop and a hyperscale data centre sits a useful middle scale: one serious rack of local computing equipment, surrounded by people, skills, relationships and everyday reasons to use it.</p>
          </div>
          <div class="concept-panel">
            <p><strong>Working hardware reference</strong><br>One NVIDIA GB200 NVL72-class rack. The brand and generation are examples, not a purchase decision.</p>
            <p><strong>Working place reference</strong><br>Dunwich on Minjerribah. The place is a study context, not a claim of site control or approval.</p>
            <p><strong>Working social reference</strong><br>Indigenous and non-Indigenous friends interested in exploring collaboration. No person or group is presented as endorsing this website.</p>
          </div>
        </div>
      </section>

      <section class="section section-ink">
        <div class="wrap reveal">
          <h2>Compute is only one layer</h2>
          <div class="four-grid">
            <article class="colour-card coral"><h3>Local purpose</h3><p>The first question is not what the machine does. It is what people around it find worth doing together.</p></article>
            <article class="colour-card aqua"><h3>Cultural boundaries</h3><p>Permission, custody, attribution, human-only knowledge and the choice not to digitise remain visible parts of the design.</p></article>
            <article class="colour-card yellow"><h3>Practical work</h3><p>Media, learning, local models, environmental observation, digital twins and disruption readiness give the rack everyday relevance.</p></article>
            <article class="colour-card violet"><h3>Chosen connections</h3><p>A node keeps its own centre. Links to other places support exchange without turning difference into one central system.</p></article>
          </div>
        </div>
      </section>

      <section class="section section-sunrise">
        <div class="wrap split reveal">
          <div>
            <h2>A cultural compute node</h2>
            <p class="lead">The phrase describes a place where computation sits inside living relationships rather than above them.</p>
            <p>Some material may be public. Some may be shared for one purpose. Some may stay within a family, organisation or cultural boundary. Some may remain human-only. The architecture begins by keeping those distinctions intact.</p>
            <a class="text-link" href="culture.html">Explore cultural collaboration <span aria-hidden="true">→</span></a>
          </div>
          <div class="orbit-stage" data-orbit-stage aria-label="Animated constellation showing separate local layers">
            <span class="orbit-core">Local<br>choice</span>
            <span class="orbit-dot dot-a">Culture</span>
            <span class="orbit-dot dot-b">Work</span>
            <span class="orbit-dot dot-c">Place</span>
            <span class="orbit-dot dot-d">Learning</span>
          </div>
        </div>
      </section>

      <section class="section section-light">
        <div class="wrap reveal">
          <h2>The process in seven movements</h2>
          <ol class="process-rail">
            <li><span>01</span><strong>Listen locally</strong><small>Purposes, limits and unanswered questions.</small></li>
            <li><span>02</span><strong>Map permissions</strong><small>People, material, custody and boundaries.</small></li>
            <li><span>03</span><strong>Choose workloads</strong><small>Useful tasks before technical scale.</small></li>
            <li><span>04</span><strong>Shape the place</strong><small>Power, cooling, access and local fit.</small></li>
            <li><span>05</span><strong>Build local skill</strong><small>Operation, media, care and repair.</small></li>
            <li><span>06</span><strong>Test small</strong><small>Evidence before expansion.</small></li>
            <li><span>07</span><strong>Choose connections</strong><small>Exchange, pause, refuse or grow.</small></li>
          </ol>
          <a class="button button-dark magnetic" href="process.html"><span>See the repeatable plan</span></a>
        </div>
      </section>

      <section class="section section-ink">
        <div class="wrap reveal">
          <div class="section-heading">
            <h2>Look at one layer at a time</h2>
            <p>Each page stays close to the single-node question.</p>
          </div>
          <div class="portal-grid">
            ${portal('node.html', 'One rack', 'What sits inside the reference rack, and what still sits outside it.')}
            ${portal('dunwich.html', 'Dunwich context', 'A place study grounded in island life, without claiming a site or approval.')}
            ${portal('culture.html', 'Cultural collaboration', 'Relationship, permission and separate knowledge layers before datasets.')}
            ${portal('uses.html', 'Practical uses', 'Workloads that give local compute ordinary value as well as disruption value.')}
            ${portal('digital-twin.html', 'Island digital twin', 'A layered model that shows provenance, permissions and uncertainty.')}
            ${portal('cooperative.html', 'Co-op layer', 'Shared employment, training, equipment and services around the node.')}
          </div>
        </div>
      </section>

      <section class="section section-spectrum">
        <div class="wrap split reveal">
          <div>
            <h2>One node inside a much wider body of work</h2>
            <p>The 2026 Project Atlas shows the surrounding network of ideas built with agents. This website does not attempt to retell that network. It keeps one practical thread in focus.</p>
          </div>
          <a class="button button-glass magnetic" href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer"><span>Open the filtered Project Atlas</span></a>
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
        <div><h2>What the reference means</h2><p class="lead">GB200 NVL72 is a rack-scale computing system. Here it acts as a scale reference: much more capable than a personal workstation, far smaller and more locally legible than a hyperscale data centre.</p></div>
        <aside class="fact-stack">
          <div><strong>Concrete enough to discuss</strong><span>Space, power, cooling, skills, access and useful workloads.</span></div>
          <div><strong>Flexible enough to replace</strong><span>The eventual equipment remains vendor-neutral and generation-flexible.</span></div>
          <div><strong>Incomplete by itself</strong><span>A rack supplies compute. It does not supply trust, cultural authority, purpose or consent.</span></div>
        </aside>
      </div></section>

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
        <div><h2>A reference, not a shopping list</h2><p>Power and cooling figures depend on the final configuration, building and operating profile. Site engineering, energy supply, fire safety, network design, lifecycle costs and service arrangements remain work for qualified people at the point of a real proposal.</p></div>
        <div class="source-card"><h3>Hardware starting point</h3><p>The manufacturer page gives the current technical reference. It is an external source, not evidence that this project has selected or acquired the system.</p><a class="text-link" href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" target="_blank" rel="noopener noreferrer">View NVIDIA GB200 NVL72 <span aria-hidden="true">↗</span></a></div>
      </div></section>`
  },

  'dunwich.html': {
    title: 'Dunwich as a place study',
    description: 'A grounded Dunwich and Minjerribah place study for one local cultural compute node, with unknowns and relationship boundaries kept visible.',
    image: 'dunwich.webp',
    alt: 'Concept image of a colourful contemporary community workshop near a coastal ferry landing after rain',
    theme: 'coral',
    heading: 'Start with the life already here.',
    lede: 'Dunwich is the local lens for this exploration: an island service centre, ferry gateway, cultural landscape and lived community rather than an empty site waiting for technology.',
    actions: [['Explore collaboration', 'culture.html'], ['See the repeatable plan', 'process.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal">
        <div><h2>Local context supplied by Luke</h2><p class="lead">Luke lives on Straddie and has Indigenous friends interested in collaboration. That relationship is the reason to explore carefully, not evidence of collective endorsement, cultural authority or permission for any particular project.</p></div>
        <div class="concept-panel"><p><strong>Place names</strong><br>Minjerribah and North Stradbroke Island appear together where clarity helps different readers.</p><p><strong>Current status</strong><br>Public working concept. No confirmed site, lease, funding, procurement, government approval or First Nations endorsement.</p><p><strong>Useful next form</strong><br>A conversation object that local people are free to question, reshape, narrow or leave alone.</p></div>
      </div></section>

      <section class="section section-ink"><div class="wrap reveal"><h2>What place changes</h2><div class="three-grid">
        <article class="glass-card"><h3>Island logistics</h3><p>Equipment delivery, maintenance access, spare parts, weather and ferry dependence belong inside the operating model.</p></article>
        <article class="glass-card"><h3>Energy and heat</h3><p>Power quality, cooling, noise, heat reuse and disruption planning need local measurements rather than generic data-centre assumptions.</p></article>
        <article class="glass-card"><h3>Existing work</h3><p>Media, education, land and sea observation, local services and creative practice offer possible daily workloads.</p></article>
        <article class="glass-card"><h3>Cultural relationships</h3><p>Country, knowledge and cultural material are not infrastructure inputs. Their place in any project begins through relationship and permission.</p></article>
        <article class="glass-card"><h3>Public benefit</h3><p>Training, paid work, shared equipment and resilient services offer practical tests of community value.</p></article>
        <article class="glass-card"><h3>Limits and exits</h3><p>A locally shaped plan includes ways to pause, remove material, change providers, recover systems or decide not to proceed.</p></article>
      </div></div></section>

      <section class="section section-coral"><div class="wrap reveal"><h2>A Ballow Road question, not a site claim</h2><div class="split"><p class="lead">Earlier Ready S.E.T. work used Ballow Road as one concrete place to think through a shared rack. This version keeps it as a linked case study only. Ownership, tenure, planning, cultural heritage, infrastructure, community interest and technical suitability all remain unconfirmed here.</p><a class="button button-dark magnetic" href="https://auraofintelligence.github.io/ready-set-co-op-trust-hub/ballow-road.html" target="_blank" rel="noopener noreferrer"><span>Open the earlier place study</span></a></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>A new Queensland policy doorway</h2><p>The 2026 Queensland Bill introduced a broader State strategic project framework and passed with amendment on 26 August 2026. That language may be relevant to a future integrated proposal. It does not designate, approve or support this node, and it does not establish site rights or cultural authority.</p></div><div class="source-card"><h3>Official records</h3><p>The Parliament inquiry page records the Bill's introduction and passage. The Queensland legislation page contains the State strategic project and modification-order provisions.</p><p><a class="text-link" href="https://www.parliament.qld.gov.au/Work-of-Committees/Inquiries/Inquiry-Details?id=8588" target="_blank" rel="noopener noreferrer">Queensland Parliament inquiry <span aria-hidden="true">↗</span></a></p><p><a class="text-link" href="https://www.legislation.qld.gov.au/view/whole/html/bill.first/bill-2026-006" target="_blank" rel="noopener noreferrer">Queensland legislation text <span aria-hidden="true">↗</span></a></p></div></div></section>`
  },

  'culture.html': {
    title: 'Cultural collaboration before cultural data',
    description: 'An exploratory framework for Indigenous and non-Indigenous collaboration where relationship, permission and cultural boundaries come before technical access.',
    image: 'culture.webp',
    alt: 'Concept image of an Indigenous and non-Indigenous creative group working in a contemporary media studio with a protected archive room',
    theme: 'gold',
    heading: 'Relationship comes before the dataset.',
    lede: 'A cultural compute node begins with people, context and boundaries. Computation enters only where a relationship gives it a legitimate, specific and reversible role.',
    actions: [['Map the permission layers', '#layers'], ['Explore practical uses', 'uses.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Collaboration without flattening difference</h2><p class="lead">Indigenous and non-Indigenous participation does not imply one combined knowledge pool. Different people, families, organisations and cultural groups may hold different rights, responsibilities and expectations.</p></div><div class="concept-panel"><p><strong>Technology does not grant sovereignty.</strong><br>It either respects existing authority and relationship boundaries or cuts across them.</p><p><strong>Storage is not permission.</strong><br>Possessing a file does not establish a right to train, publish, combine or retain it.</p><p><strong>Connection is not sameness.</strong><br>Nodes may exchange selected outputs while keeping their own protocols, names and centres.</p></div></div></section>

      <section class="section section-ink" id="layers"><div class="wrap reveal"><h2>Five visible knowledge layers</h2><div class="permission-board" data-permission-board>
        <button type="button" class="permission-tab active" data-layer="public">Public</button>
        <button type="button" class="permission-tab" data-layer="purpose">Purpose shared</button>
        <button type="button" class="permission-tab" data-layer="group">Group held</button>
        <button type="button" class="permission-tab" data-layer="human">Human-only</button>
        <button type="button" class="permission-tab" data-layer="unknown">Unresolved</button>
        <div class="permission-copy" data-layer-copy><h3>Public material</h3><p>Material intentionally released for broad access, with provenance, attribution and reuse terms still attached.</p></div>
      </div></div></section>

      <section class="section section-gold"><div class="wrap reveal"><h2>Questions that stay attached to material</h2><div class="question-grid">
        ${question('Who is connected to it?', 'A file may carry individual, family, organisational, community and cultural relationships at once.')}
        ${question('What purpose was agreed?', 'Viewing, preserving, teaching, transcribing and model training are separate uses.')}
        ${question('Where does it live?', 'Local storage, backups, logs, temporary copies and external services all matter.')}
        ${question('Who sees the record?', 'Access decisions, changes and exports need a history that relevant people understand.')}
        ${question('What happens later?', 'Review dates, withdrawal pathways and deletion limits belong in the first conversation.')}
        ${question('What remains human-only?', 'Not every valuable relationship or form of knowledge belongs in a machine.')}
      </div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Existing guidance worth bringing into the room</h2><p>This website does not replace protocols developed by Indigenous data-sovereignty and ethical-research communities. These links offer starting points for locally chosen discussion and qualified guidance.</p></div><div class="link-stack"><a href="https://www.maiamnayriwingara.org/" target="_blank" rel="noopener noreferrer"><strong>Maiam nayri Wingara</strong><span>Indigenous Data Sovereignty Collective</span></a><a href="https://www.gida-global.org/care" target="_blank" rel="noopener noreferrer"><strong>CARE Principles</strong><span>Collective Benefit, Authority to Control, Responsibility and Ethics</span></a><a href="https://aiatsis.gov.au/research/ethical-research/code-ethics" target="_blank" rel="noopener noreferrer"><strong>AIATSIS Code of Ethics</strong><span>Official ethical research guidance</span></a></div></div></section>`
  },

  'uses.html': {
    title: 'Practical uses for a local node',
    description: 'A focused set of possible everyday and disruption workloads for one local cultural compute node.',
    image: 'uses.webp',
    alt: 'Concept image of a lively coastal workbench combining media production, environmental observation, learning and local computing',
    theme: 'lime',
    heading: 'Useful on an ordinary Tuesday.',
    lede: 'A local node makes more sense when people reach for it during everyday work. Emergency usefulness grows from equipment, skills and relationships already in use.',
    actions: [['Browse the workload families', '#workloads'], ['See the digital twin', 'digital-twin.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Daily value and disruption value</h2><p class="lead">The same local storage, computing capacity and trained people may support creative work one day and continuity work during an outage or severe-weather event.</p></div><div class="dual-meter"><div><span>Everyday mode</span><strong>Learn • create • model • observe</strong></div><div><span>Disruption mode</span><strong>Local access • prioritise • communicate • recover</strong></div></div></div></section>

      <section class="section section-ink" id="workloads"><div class="wrap reveal"><h2>Six workload families</h2><div class="use-grid">
        <article><span class="use-number">01</span><h3>Culture and language</h3><p>Permissioned transcription, language tools, archive description, search and locally held models. Human-only layers remain outside the system.</p><small>Starts with authority, purpose and custody.</small></article>
        <article><span class="use-number">02</span><h3>Film, sound and immersive media</h3><p>Editing, rendering, colour, audio restoration, animation, virtual production and extended-reality experiments close to the creators.</p><small>Starts with real projects and skilled users.</small></article>
        <article><span class="use-number">03</span><h3>Island digital twin</h3><p>Layered views of environment, infrastructure, movement, hazards and community observations with provenance and uncertainty visible.</p><small>Starts with a narrow question, not a total island model.</small></article>
        <article><span class="use-number">04</span><h3>Learning and local models</h3><p>Technical training, creative experimentation, domain models and evaluation using material that is appropriate for that purpose.</p><small>Starts with capability and review, not automation theatre.</small></article>
        <article><span class="use-number">05</span><h3>Environmental observation</h3><p>Processing imagery, sound, sensors and field records for locally relevant land, sea and coastal questions.</p><small>Starts with source quality and local interpretation.</small></article>
        <article><span class="use-number">06</span><h3>Continuity and recovery</h3><p>Selected local services, cached information, mapping, communications support and recovery tools when outside connections are constrained.</p><small>Starts with tested roles and realistic power limits.</small></article>
      </div></div></section>

      <section class="section section-lime"><div class="wrap reveal"><h2>A workload earns its place through evidence</h2><div class="evidence-loop"><div><strong>Purpose</strong><span>Who finds this useful?</span></div><div><strong>Boundary</strong><span>What is out of scope?</span></div><div><strong>Small test</strong><span>What is the least costly useful version?</span></div><div><strong>Observation</strong><span>What actually happened?</span></div><div><strong>Choice</strong><span>Stop, adjust, repeat or expand?</span></div></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Not every good idea belongs on this rack</h2><p>Some work is better on a laptop. Some needs a trusted external service. Some material is inappropriate for computation. Some workloads exceed one rack. A useful node design makes those boundaries obvious instead of treating local compute as a universal answer.</p></div><a class="button button-dark magnetic" href="process.html"><span>Use the selection process</span></a></div></section>`
  },

  'digital-twin.html': {
    title: 'A layered island digital twin',
    description: 'An island digital twin treated as a collection of source-labelled layers, questions and permissions rather than one totalising model.',
    image: 'digital-twin.webp',
    alt: 'Concept image of a moonlit island model formed from colourful transparent data layers above a circular table',
    theme: 'blue',
    heading: 'Many layers, never one total view.',
    lede: 'An island digital twin is explored here as a shared instrument: separate source-labelled layers assembled for particular questions, with gaps, uncertainty and access boundaries left visible.',
    actions: [['Explore the layers', '#twin-layers'], ['Return to practical uses', 'uses.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>A twin is a question, not a copy</h2><p class="lead">No model contains the whole island. Every layer reflects a source, date, resolution, purpose and point of view.</p></div><div class="concept-panel"><p><strong>Provenance</strong><br>Where a layer came from and how it changed.</p><p><strong>Uncertainty</strong><br>What is measured, inferred, incomplete or disputed.</p><p><strong>Permission</strong><br>Who sees, edits, combines or exports each layer.</p></div></div></section>

      <section class="section section-ink" id="twin-layers"><div class="wrap reveal"><h2>A layered demonstration</h2><div class="twin-lab" data-twin-lab>
        <div class="twin-view" aria-hidden="true"><canvas data-twin-canvas></canvas><div class="island-shape"></div></div>
        <div class="twin-controls">
          <label><input type="checkbox" data-twin-layer="coast" checked> Coast and terrain <span>Public source example</span></label>
          <label><input type="checkbox" data-twin-layer="water" checked> Water and weather <span>Source date required</span></label>
          <label><input type="checkbox" data-twin-layer="movement" checked> Movement and access <span>Aggregated example</span></label>
          <label><input type="checkbox" data-twin-layer="infrastructure"> Infrastructure <span>Access varies</span></label>
          <label><input type="checkbox" data-twin-layer="culture"> Cultural layer <span>Not automatically available</span></label>
        </div>
      </div></div></section>

      <section class="section section-blue"><div class="wrap reveal"><h2>A narrow first twin</h2><div class="three-grid"><article class="solid-card"><h3>One question</h3><p>For example: how do heat, power demand and service priorities interact around one possible node?</p></article><article class="solid-card"><h3>A few suitable sources</h3><p>Each source arrives with date, ownership, licence, spatial limits and uncertainty.</p></article><article class="solid-card"><h3>A reviewable result</h3><p>People compare the model with lived knowledge, correct it and decide whether another layer is worthwhile.</p></article></div></div></section>

      <section class="section section-light"><div class="wrap reveal"><h2>What the twin does not settle</h2><div class="boundary-list"><p><strong>Country is not reduced to geometry.</strong> A spatial layer is not cultural authority.</p><p><strong>Simulation is not permission.</strong> A plausible model does not approve a project.</p><p><strong>Data density is not truth.</strong> More measurements do not erase missing context or contested interpretation.</p><p><strong>Prediction is not a decision.</strong> Outputs remain material for human judgement.</p></div></div></section>`
  },

  'process.html': {
    title: 'A repeatable and customisable plan',
    description: 'A seven-part process for exploring a locally shaped cultural compute node without treating one place as a template for another.',
    image: 'process.webp',
    alt: 'Concept image of a planning room where local workloads flow as separate coloured layers between one computing rack and an island model',
    theme: 'magenta',
    heading: 'Repeat the process, not the answer.',
    lede: 'The reusable part is a way of asking questions, testing a modest version and leaving local choice intact. The equipment, name, relationships, permissions and uses remain different in every place.',
    actions: [['Walk through the process', '#plan'], ['See the co-op layer', 'cooperative.html']],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Customisable by design</h2><p class="lead">A repeatable plan avoids pretending that Dunwich, another island, a regional town or a cultural organisation needs the same node.</p></div><div class="concept-panel"><p><strong>Repeatable</strong><br>The questions, evidence loop and decision points travel.</p><p><strong>Customisable</strong><br>The purpose, pace, hardware, governance, language and connections stay local.</p><p><strong>Reversible</strong><br>Each stage leaves room to stop, remove, repair or redirect.</p></div></div></section>

      <section class="section section-ink" id="plan"><div class="wrap reveal"><h2>Seven movements</h2><div class="plan-list">
        ${planStep('01', 'Listen locally', 'Gather purposes, concerns, existing projects and points of difference. Record who is present and who is not.', 'Output: a question map, not a declaration.')}
        ${planStep('02', 'Map authority and permission', 'Separate technical control, legal rights, cultural authority, personal consent, organisational responsibility and public material.', 'Output: permission layers and unresolved boundaries.')}
        ${planStep('03', 'Choose a few workloads', 'Select work people already value or genuinely want to test. Describe inputs, outputs, users, risks and human review.', 'Output: a small workload portfolio.')}
        ${planStep('04', 'Shape the physical node', 'Match equipment, storage, power, cooling, access, safety and maintenance to those workloads and the place.', 'Output: a vendor-neutral reference design.')}
        ${planStep('05', 'Build the people layer', 'Identify paid roles, training, creative practice, operations, cultural review, maintenance and outside expertise.', 'Output: a skills and responsibility map.')}
        ${planStep('06', 'Test a modest version', 'Run narrow pilots, observe real use, energy, time, quality, access and unintended effects.', 'Output: evidence and corrections.')}
        ${planStep('07', 'Choose what happens next', 'Local participants weigh the evidence and choose to stop, adjust, repeat, expand or connect selected parts elsewhere.', 'Output: a documented local choice.')}
      </div></div></section>

      <section class="section section-magenta"><div class="wrap reveal"><h2>Four records that travel well</h2><div class="four-grid"><article class="solid-card"><h3>Purpose card</h3><p>What is being explored, for whom, and what sits outside scope.</p></article><article class="solid-card"><h3>Permission map</h3><p>Material, people, purposes, access, custody, review and withdrawal.</p></article><article class="solid-card"><h3>Node sheet</h3><p>Workloads, equipment, place requirements, skills, costs and recovery.</p></article><article class="solid-card"><h3>Evidence log</h3><p>What was tried, what happened, whose view is recorded and what changed.</p></article></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Connections come last</h2><p>A node joins a wider network after its own purposes and boundaries are understood. It may share a method, public output, benchmark, model component or nothing at all. Interoperability is useful only when it does not silently override local protocols.</p></div><a class="button button-dark magnetic" href="network.html"><span>Explore chosen connections</span></a></div></section>`
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
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>The co-op is not cultural authority</h2><p class="lead">A cooperative structure may hold equipment, coordinate services and support work. It does not acquire authority over culture, Country, community knowledge or the people participating in a project.</p></div><div class="concept-panel"><p><strong>Equipment layer</strong><br>Access, booking, maintenance, insurance and lifecycle planning.</p><p><strong>Work layer</strong><br>Paid projects, technical services, creative production and local operations.</p><p><strong>Learning layer</strong><br>Supported practice, mentoring, credentials where useful and peer exchange.</p></div></div></section>

      <section class="section section-ink" id="roles"><div class="wrap reveal"><h2>Possible roles around one node</h2><div class="role-wheel" data-role-wheel><button type="button" data-role="operator">Node operations</button><button type="button" data-role="media">Media production</button><button type="button" data-role="data">Data stewardship</button><button type="button" data-role="culture">Cultural review</button><button type="button" data-role="learning">Learning support</button><button type="button" data-role="field">Field observation</button><button type="button" data-role="care">Maintenance and care</button><div class="role-copy" data-role-copy><h3>Node operations</h3><p>Monitoring, access, backups, incident records, service priorities and recovery practice.</p></div></div></div></section>

      <section class="section section-orange"><div class="wrap reveal"><h2>Value beyond machine time</h2><div class="three-grid"><article class="solid-card"><h3>Local capability</h3><p>More people understand how the system works, where its limits sit and how to recover it.</p></article><article class="solid-card"><h3>Shared access</h3><p>Equipment that is unrealistic for one person becomes a managed resource for suitable projects.</p></article><article class="solid-card"><h3>Longer relationships</h3><p>Repeated work supports trust, correction and continuity beyond one short technical pilot.</p></article></div></div></section>

      <section class="section section-light"><div class="wrap reveal"><h2>Questions for a real cooperative conversation</h2><div class="boundary-list"><p><strong>Membership:</strong> Who wants to participate, and under what terms?</p><p><strong>Benefit:</strong> What value stays with workers, creators, custodians and the local community?</p><p><strong>Responsibility:</strong> Who holds equipment risk, employment duties, privacy and service obligations?</p><p><strong>Boundaries:</strong> Which decisions sit with the co-op, and which clearly do not?</p><p><strong>Exit:</strong> What happens to equipment, data, access and unfinished work if the structure changes?</p></div></div></section>`
  },

  'network.html': {
    title: 'A network of distinct local intelligences',
    description: 'A node-to-node network where each place keeps its own identity, permissions and centre while selecting what travels.',
    image: 'network.webp',
    alt: 'Concept image of colourful island-like intelligence nodes forming a loose constellation across Oceania and the globe',
    theme: 'cyan',
    heading: 'Connected without becoming one centre.',
    lede: 'The wider vision is a constellation of locally shaped intelligences. Each node keeps its own name, purposes, protocols and boundaries while choosing what, if anything, travels between them.',
    actions: [['Explore the connection pattern', '#connections'], ['Open Project Atlas', 'https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest', true]],
    body: `
      <section class="section section-light"><div class="wrap intro-grid reveal"><div><h2>Family without sameness</h2><p class="lead">A global network does not require a global template. One place may centre language work, another climate observation, another film, health, learning, infrastructure or something not imagined here.</p></div><div class="concept-panel"><p><strong>Local centre</strong><br>Identity, purpose and decision-making stay with the node and its relationships.</p><p><strong>Selective exchange</strong><br>Methods, public outputs or technical components move only under stated terms.</p><p><strong>Right to disconnect</strong><br>Participation includes pause, refusal, revision and exit.</p></div></div></section>

      <section class="section section-ink" id="connections"><div class="wrap reveal"><h2>What might travel</h2><div class="network-field" data-network-field><canvas data-network-canvas aria-hidden="true"></canvas><div class="network-labels"><span>Public methods</span><span>Benchmarks</span><span>Open tools</span><span>Selected outputs</span><span>Learning exchanges</span><span>Recovery support</span></div></div></div></section>

      <section class="section section-cyan"><div class="wrap reveal"><h2>What does not move by default</h2><div class="four-grid"><article class="solid-card"><h3>Cultural material</h3><p>No automatic pooling, scraping or training across nodes.</p></article><article class="solid-card"><h3>Identity</h3><p>No requirement to adopt one brand, legal form or theory of intelligence.</p></article><article class="solid-card"><h3>Control</h3><p>No distant operator quietly becomes the centre of local decisions.</p></article><article class="solid-card"><h3>Unresolved knowledge</h3><p>Ambiguity stays visible instead of being normalised into a shared dataset.</p></article></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>The wider 2026 macro network</h2><p>Project Atlas maps the broader body of projects Luke has built with agents. It offers context for the larger system without pulling this site away from the one-node process.</p></div><div class="link-stack"><a href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer"><strong>Filtered Project Atlas</strong><span>Current wider network context</span></a><a href="https://auraofintelligence.github.io/Future-of-Life-2045/" target="_blank" rel="noopener noreferrer"><strong>Future of Life 2045</strong><span>Long-range public context</span></a><a href="https://auraofintelligence.github.io/Oceania-healthy-de-slop-co-ops/" target="_blank" rel="noopener noreferrer"><strong>Oceania Healthy De-Slop Co-ops</strong><span>Related Oceania cooperative exploration</span></a></div></div></section>`
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
        ${siteEntry('dunwich.html', 'Dunwich place study', 'Local context, open questions and the limited Ballow Road reference.')}
        ${siteEntry('culture.html', 'Cultural collaboration', 'Permission layers, human-only knowledge and external protocol sources.')}
        ${siteEntry('uses.html', 'Practical uses', 'Six workload families for everyday and disruption value.')}
        ${siteEntry('digital-twin.html', 'Island digital twin', 'Source-labelled layers, uncertainty and a narrow first model.')}
        ${siteEntry('process.html', 'Repeatable plan', 'The customisable seven-part process and its four portable records.')}
        ${siteEntry('cooperative.html', 'Co-op layer', 'Employment, training, equipment and service roles around the node.')}
        ${siteEntry('network.html', 'Wider network', 'Chosen connections between distinct local intelligences.')}
        ${siteEntry('sitemap.html', 'Sitemap', 'This complete map of pages, sources, boundaries and licence.')}
      </div></div></section>

      <section class="section section-ink"><div class="wrap reveal"><h2>Main public sources</h2><div class="link-stack wide"><a href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" target="_blank" rel="noopener noreferrer"><strong>NVIDIA GB200 NVL72</strong><span>Current manufacturer hardware reference</span></a><a href="https://www.maiamnayriwingara.org/" target="_blank" rel="noopener noreferrer"><strong>Maiam nayri Wingara</strong><span>Indigenous Data Sovereignty Collective</span></a><a href="https://www.gida-global.org/care" target="_blank" rel="noopener noreferrer"><strong>CARE Principles</strong><span>Indigenous data-governance principles</span></a><a href="https://aiatsis.gov.au/research/ethical-research/code-ethics" target="_blank" rel="noopener noreferrer"><strong>AIATSIS Code of Ethics</strong><span>Ethical research guidance</span></a><a href="https://www.parliament.qld.gov.au/Work-of-Committees/Inquiries/Inquiry-Details?id=8588" target="_blank" rel="noopener noreferrer"><strong>Queensland Parliament Bill inquiry</strong><span>Official 2026 process record</span></a><a href="https://www.legislation.qld.gov.au/view/whole/html/bill.first/bill-2026-006" target="_blank" rel="noopener noreferrer"><strong>Queensland legislation text</strong><span>Official State strategic project provisions</span></a></div></div></section>

      <section class="section section-purple"><div class="wrap reveal"><h2>Related public projects</h2><div class="three-grid"><a class="project-card" href="https://auraofintelligence.github.io/project-atlas/?query=set&amp;year=&amp;family=&amp;page=&amp;connections=&amp;sort=newest" target="_blank" rel="noopener noreferrer"><strong>Project Atlas</strong><span>The wider 2026 network, filtered for SET.</span></a><a class="project-card" href="https://auraofintelligence.github.io/grain-by-grain-documentary/" target="_blank" rel="noopener noreferrer"><strong>Grain by Grain</strong><span>Related Minjerribah documentary work.</span></a><a class="project-card" href="https://auraofintelligence.github.io/extreme-matter-atlas/" target="_blank" rel="noopener noreferrer"><strong>Extreme Matter Atlas</strong><span>A related public research atlas.</span></a><a class="project-card" href="https://auraofintelligence.github.io/australian-law-2012-lukes-relevance/" target="_blank" rel="noopener noreferrer"><strong>Australian Law 2012</strong><span>Luke's public legal-context work.</span></a><a class="project-card" href="https://auraofintelligence.github.io/Future-of-Life-2045/" target="_blank" rel="noopener noreferrer"><strong>Future of Life 2045</strong><span>Long-range future context.</span></a><a class="project-card" href="https://auraofintelligence.github.io/Oceania-healthy-de-slop-co-ops/" target="_blank" rel="noopener noreferrer"><strong>Oceania Healthy De-Slop Co-ops</strong><span>Related cooperative exploration.</span></a><a class="project-card" href="https://auraofintelligence.github.io/moreton-bay-community-wealth-and-mutuals/" target="_blank" rel="noopener noreferrer"><strong>Moreton Bay Community Wealth and Mutuals</strong><span>Related community ownership context.</span></a><a class="project-card" href="https://auraofintelligence.github.io/ready-set-co-op-trust-hub/ballow-road.html" target="_blank" rel="noopener noreferrer"><strong>Ballow Road study</strong><span>The earlier single-place rack example.</span></a></div></div></section>

      <section class="section section-ink"><div class="wrap reveal"><h2>Submissions and support documents</h2><p class="lead">Public Markdown editions of the supplied source documents. They show the wider thinking while this website stays with the single-node process.</p><div class="link-stack wide"><a href="supporting-documents/senate-ai-and-data-centres-submission-2026.md"><strong>Senate AI and Data Centres Submission</strong><span>Australian infrastructure submission, 2026</span></a><a href="supporting-documents/aukus-public-inquiry-submission-2026.md"><strong>AUKUS Public Inquiry Submission</strong><span>Australian public-inquiry submission, 2026</span></a><a href="supporting-documents/a-fair-go-for-the-ai-age.md"><strong>A Fair Go for the AI Age</strong><span>Postcode-level sovereign compute as shared national infrastructure</span></a><a href="supporting-documents/do-not-put-all-our-eggs-in-one-basket.md"><strong>Do Not Put All Our Eggs in One Basket</strong><span>Distributed national compute and resilience</span></a><a href="supporting-documents/local-government-funding-inquiry-submission.md"><strong>Local Government Funding Inquiry Submission</strong><span>Local-government funding and infrastructure context</span></a><a href="supporting-documents/fiji-australia-vuvale-union-submission-2026.md"><strong>Fiji-Australia Vuvale Union Submission</strong><span>Oceania relationship and infrastructure context</span></a><a href="supporting-documents/ocean-of-peace-alliance-veitacini-treaty-submission-2026.md"><strong>Ocean of Peace Alliance and Veitacini Treaty Submission</strong><span>Oceania cooperation context</span></a><a href="supporting-documents/setco-2026-pitch-plan-revision.md"><strong>Ready S.E.T. Co-op 2026 Pitch Plan</strong><span>Earlier planning source, not a current declaration</span></a><a href="supporting-documents/README.md"><strong>Document index and boundaries</strong><span>Source notes for the complete set</span></a></div></div></section>

      <section class="section section-light"><div class="wrap split reveal"><div><h2>Repository and licence</h2><p>The source, change history and image provenance are public. The Strange But True Public Source Licence permits non-commercial study and adaptation under its stated conditions.</p></div><div class="link-stack"><a href="https://github.com/auraofintelligence/ready-set-co-op-cultural-intelligence-node" target="_blank" rel="noopener noreferrer"><strong>GitHub repository</strong><span>Source and change history</span></a><a href="LICENSE"><strong>Strange But True Public Source Licence</strong><span>Reuse terms and cultural-rights boundary</span></a><a href="IMAGE-PROMPTS.md"><strong>Original image prompt record</strong><span>Page-by-page generated visual provenance</span></a></div></div></section>`
  }
};

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
      <p class="boundary-note">Working concept by Luke Nathan Hayes. No claimed endorsement, approval, site control or cultural authority.</p>
    </div>
  </footer>
  <button class="to-top" type="button" aria-label="Return to top" data-to-top><span aria-hidden="true">↑</span></button>
  <canvas class="ambient-canvas" data-ambient-canvas aria-hidden="true"></canvas>
</body>
</html>`;
}

for (const route of routes) {
  fs.writeFileSync(path.join(root, route.file), pageTemplate(route.file, pages[route.file]), 'utf8');
}

const notFound = `<!doctype html>
<html lang="en-AU" data-theme="violet"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Path not found | Ready S.E.T. Co-op</title><meta name="robots" content="noindex"><meta name="theme-color" content="#090912"><link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png"><link rel="stylesheet" href="assets/styles.css"><script src="assets/site.js" defer></script></head>
<body><a class="skip-link" href="#main">Skip to content</a><header class="site-header" data-site-header><a class="brand" href="index.html"><img src="assets/favicon-32.png" width="32" height="32" alt=""><span><strong>Ready S.E.T. Co-op</strong><small>Cultural Intelligence Node</small></span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-button><span>Menu</span><i aria-hidden="true"></i></button><nav class="site-nav" id="site-nav" aria-label="Main navigation" data-site-nav>${nav('404.html')}</nav></header><main id="main"><section class="hero hero-404"><img class="hero-image" src="assets/heroes/not-found.webp" alt="Concept image of branching moonlit paths through coastal dunes" width="1774" height="886"><div class="hero-shade"></div><div class="hero-light" data-hero-light></div><div class="hero-content wrap"><h1>This path drifts into the dunes.</h1><p>The page may have moved. The complete sitemap brings every current route back into view.</p><div class="hero-actions"><a class="button button-bright magnetic" href="sitemap.html"><span>Open the sitemap</span></a><a class="button button-ghost magnetic" href="index.html"><span>Return home</span></a></div></div></section><section class="section section-light"><div class="wrap split"><div><h2>Every current page is still close by</h2><p>No account, code or special access is needed. The public page map lists the whole site.</p></div><a class="button button-dark magnetic" href="sitemap.html"><span>See every page</span></a></div></section></main><footer class="site-footer"><div class="wrap route-nav"><a class="route-link previous" href="sitemap.html"><small>Previous</small><strong><span aria-hidden="true">←</span> Sitemap</strong></a><a class="route-link next" href="index.html"><small>Next</small><strong>Home <span aria-hidden="true">→</span></strong></a></div><div class="wrap footer-base"><div><strong>Ready S.E.T. Co-op</strong><p>A self-sovereign exploration of one local cultural compute node.</p></div><div class="footer-links"><a href="sitemap.html">Sitemap</a><a href="LICENSE">Licence</a><a href="https://github.com/auraofintelligence/ready-set-co-op-cultural-intelligence-node" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div><p class="boundary-note">Working concept by Luke Nathan Hayes. No claimed endorsement, approval, site control or cultural authority.</p></div></footer><button class="to-top" type="button" aria-label="Return to top" data-to-top><span aria-hidden="true">↑</span></button><canvas class="ambient-canvas" data-ambient-canvas aria-hidden="true"></canvas></body></html>`;
fs.writeFileSync(path.join(root, '404.html'), notFound, 'utf8');

const redirect = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Repeatable plan | Ready S.E.T. Co-op</title><meta http-equiv="refresh" content="0; url=process.html"><link rel="canonical" href="${baseUrl}process.html"></head><body><p>The custom model page has become the <a href="process.html">repeatable plan</a>.</p></body></html>`;
fs.writeFileSync(path.join(root, 'model.html'), redirect, 'utf8');

const sitemapFiles = [...routes.map(route => route.file), ...supportFiles];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles.map(file => `  <url><loc>${file === 'index.html' ? baseUrl : `${baseUrl}${file}`}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Built ${routes.length} public pages, 404.html, model.html redirect and sitemap.xml.`);
