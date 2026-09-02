(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-site-nav]');
  const toTop = document.querySelector('[data-to-top]');

  const setScrollState = () => {
    const moved = window.scrollY > 32;
    header?.classList.toggle('scrolled', moved);
    toTop?.classList.toggle('visible', window.scrollY > window.innerHeight * .7);
  };
  setScrollState();
  window.addEventListener('scroll', setScrollState, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menuButton?.setAttribute('aria-expanded', 'false');
      menu?.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behaviour: reduced ? 'auto' : 'smooth', behavior: reduced ? 'auto' : 'smooth' }));

  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const reveal = document.querySelectorAll('.reveal');
  document.querySelectorAll('.three-grid, .four-grid, .question-grid, .portal-grid, .use-grid, .sitemap-grid').forEach(grid => {
    [...grid.children].forEach((card, index) => card.style.setProperty('--card-index', index));
  });
  if (reduced || !('IntersectionObserver' in window)) {
    reveal.forEach(item => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveal.forEach(item => observer.observe(item));
  }

  if (!reduced && matchMedia('(pointer: fine)').matches) {
    const hero = document.querySelector('[data-hero]');
    hero?.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      const image = hero.querySelector('.hero-image');
      if (image) {
        const x = ((event.clientX - rect.left) / rect.width - .5) * -10;
        const y = ((event.clientY - rect.top) / rect.height - .5) * -7;
        image.style.translate = `${x}px ${y}px`;
      }
    });
    hero?.addEventListener('pointerleave', () => {
      const image = hero.querySelector('.hero-image');
      if (image) image.style.translate = '0 0';
    });

    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty('--px', `${(event.clientX - rect.left - rect.width / 2) * .13}px`);
        button.style.setProperty('--py', `${(event.clientY - rect.top - rect.height / 2) * .18}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--px', '0px');
        button.style.setProperty('--py', '0px');
      });
    });
  }

  const permissionCopy = {
    public: ['Public material', 'Material intentionally released for broad access, with provenance, attribution and reuse terms still attached.'],
    purpose: ['Purpose-shared material', 'Material shared for a stated activity, people and period. A new use returns to a new conversation.'],
    group: ['Group-held material', 'Access remains with a family, organisation or cultural group under its own protocols and responsibilities.'],
    human: ['Human-only knowledge', 'Knowledge or relationship kept outside digital systems. Its value does not depend on machine access.'],
    unknown: ['Unresolved material', 'Material whose rights, provenance or appropriate use are unclear stays separate until people with standing resolve it.']
  };
  const permissionBoard = document.querySelector('[data-permission-board]');
  permissionBoard?.querySelectorAll('[data-layer]').forEach(tab => tab.addEventListener('click', () => {
    permissionBoard.querySelectorAll('[data-layer]').forEach(item => item.classList.toggle('active', item === tab));
    const [heading, copy] = permissionCopy[tab.dataset.layer];
    const target = permissionBoard.querySelector('[data-layer-copy]');
    target.innerHTML = `<h3>${heading}</h3><p>${copy}</p>`;
  }));

  const roleCopy = {
    operator: ['Node operations', 'Monitoring, access, backups, incident records, service priorities and recovery practice.'],
    media: ['Media production', 'Editing, colour, sound, rendering, animation and immersive work around local stories and projects.'],
    data: ['Data stewardship', 'Provenance, storage, access records, retention, exports and recovery across distinct permission layers.'],
    culture: ['Cultural review', 'Review by people who hold the relevant relationships and authority for the particular material or activity.'],
    learning: ['Learning support', 'Supported practice, peer exchange, technical explanation and pathways into useful project work.'],
    field: ['Field observation', 'Collection and interpretation of suitable environmental, infrastructure and community observations.'],
    care: ['Maintenance and care', 'Cleaning, spares, cooling, energy, safety, vendor relationships and long-term equipment attention.']
  };
  const roleWheel = document.querySelector('[data-role-wheel]');
  roleWheel?.querySelectorAll('[data-role]').forEach(button => button.addEventListener('click', () => {
    roleWheel.querySelectorAll('[data-role]').forEach(item => item.classList.toggle('active', item === button));
    const [heading, copy] = roleCopy[button.dataset.role];
    roleWheel.querySelector('[data-role-copy]').innerHTML = `<h3>${heading}</h3><p>${copy}</p>`;
  }));

  const fitCanvas = canvas => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    return { width, height, ratio };
  };

  const ambient = document.querySelector('[data-ambient-canvas]');
  if (ambient && !reduced) {
    const context = ambient.getContext('2d');
    const motes = Array.from({ length: 22 }, (_, index) => ({
      x: (index * 73 % 100) / 100,
      y: (index * 41 % 100) / 100,
      r: 1 + (index % 4) * .6,
      speed: .0007 + (index % 5) * .00015
    }));
    const draw = time => {
      const { width, height } = fitCanvas(ambient);
      context.clearRect(0, 0, width, height);
      motes.forEach((mote, index) => {
        const y = (mote.y + time * mote.speed * .001) % 1;
        const x = mote.x + Math.sin(time * .0003 + index) * .015;
        context.beginPath();
        context.fillStyle = index % 3 === 0 ? 'rgba(255,112,220,.65)' : index % 3 === 1 ? 'rgba(85,228,226,.65)' : 'rgba(255,201,79,.55)';
        context.arc(x * width, y * height, mote.r * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        context.fill();
      });
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  const twinCanvas = document.querySelector('[data-twin-canvas]');
  if (twinCanvas) {
    const context = twinCanvas.getContext('2d');
    const colours = { coast: '#6fffd2', water: '#61a8ff', movement: '#ffcf63', infrastructure: '#ff76c9', culture: '#ae86ff' };
    const drawTwin = time => {
      const { width, height } = fitCanvas(twinCanvas);
      context.clearRect(0, 0, width, height);
      const active = [...document.querySelectorAll('[data-twin-layer]:checked')].map(input => input.dataset.twinLayer);
      active.forEach((layer, layerIndex) => {
        context.strokeStyle = colours[layer];
        context.globalAlpha = .45;
        context.lineWidth = 1.4 * (window.devicePixelRatio || 1);
        for (let line = 0; line < 5; line++) {
          context.beginPath();
          for (let x = 0; x <= width; x += 12) {
            const base = height * (.22 + layerIndex * .13) + line * 9;
            const y = base + Math.sin(x * .018 + time * .0007 + line + layerIndex) * (10 + layerIndex * 2);
            x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
          }
          context.stroke();
        }
      });
      context.globalAlpha = 1;
      if (!reduced) requestAnimationFrame(drawTwin);
    };
    drawTwin(0);
    document.querySelectorAll('[data-twin-layer]').forEach(input => input.addEventListener('change', () => reduced && drawTwin(0)));
  }

  const networkCanvas = document.querySelector('[data-network-canvas]');
  if (networkCanvas) {
    const context = networkCanvas.getContext('2d');
    const nodes = Array.from({ length: 17 }, (_, index) => ({
      x: .08 + ((index * 47) % 84) / 100,
      y: .1 + ((index * 31) % 80) / 100,
      radius: 5 + index % 5,
      phase: index * .7
    }));
    const drawNetwork = time => {
      const { width, height } = fitCanvas(networkCanvas);
      context.clearRect(0, 0, width, height);
      const points = nodes.map(node => ({ x: (node.x + Math.sin(time * .0002 + node.phase) * .01) * width, y: (node.y + Math.cos(time * .00023 + node.phase) * .012) * height, radius: node.radius }));
      context.lineWidth = 1;
      points.forEach((point, index) => points.slice(index + 1).forEach(other => {
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < width * .23) {
          context.strokeStyle = `rgba(104,225,224,${Math.max(0, .32 - distance / width)})`;
          context.beginPath();context.moveTo(point.x, point.y);context.lineTo(other.x, other.y);context.stroke();
        }
      }));
      points.forEach((point, index) => {
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * 5);
        const colour = index % 3 === 0 ? '255,112,220' : index % 3 === 1 ? '85,228,226' : '255,201,79';
        gradient.addColorStop(0, `rgba(${colour},1)`);gradient.addColorStop(1, `rgba(${colour},0)`);
        context.fillStyle = gradient;context.beginPath();context.arc(point.x, point.y, point.radius * 5, 0, Math.PI * 2);context.fill();
        context.fillStyle = '#fff';context.beginPath();context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);context.fill();
      });
      if (!reduced) requestAnimationFrame(drawNetwork);
    };
    drawNetwork(0);
  }
})();
