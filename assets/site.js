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
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const reveal = document.querySelectorAll('.reveal');
  document.querySelectorAll('.three-grid, .four-grid, .question-grid, .portal-grid, .use-grid, .sitemap-grid, .local-project-grid, .mode-panel').forEach(grid => {
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

  const followPanelLight = (panel, xName, yName) => {
    if (reduced || !matchMedia('(pointer: fine)').matches) return;
    panel.addEventListener('pointermove', event => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty(xName, `${((event.clientX - rect.left) / rect.width) * 100}%`);
      panel.style.setProperty(yName, `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  const boundaryExplorer = document.querySelector('[data-boundary-explorer]');
  if (boundaryExplorer) {
    const buttons = [...boundaryExplorer.querySelectorAll('[data-boundary-mode]')];
    const panels = [...boundaryExplorer.querySelectorAll('[data-boundary-panel]')];
    boundaryExplorer.querySelectorAll('.material-route').forEach(route => {
      [...route.children].forEach((step, index) => step.style.setProperty('--route-index', index));
    });
    const showBoundary = key => {
      buttons.forEach(button => {
        const active = button.dataset.boundaryMode === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.boundaryPanel !== key; });
    };
    boundaryExplorer.classList.add('is-enhanced');
    buttons.forEach(button => button.addEventListener('click', () => showBoundary(button.dataset.boundaryMode)));
    showBoundary(buttons.find(button => button.classList.contains('active'))?.dataset.boundaryMode || 'public');
    followPanelLight(boundaryExplorer, '--explorer-x', '--explorer-y');
  }

  const placeExplorer = document.querySelector('[data-place-explorer]');
  if (placeExplorer) {
    const buttons = [...placeExplorer.querySelectorAll('[data-place-lens]')];
    const panels = [...placeExplorer.querySelectorAll('[data-place-panel]')];
    const showPlaceLens = key => {
      buttons.forEach(button => {
        const active = button.dataset.placeLens === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.placePanel !== key; });
    };
    placeExplorer.classList.add('is-enhanced');
    buttons.forEach(button => button.addEventListener('click', () => showPlaceLens(button.dataset.placeLens)));
    showPlaceLens(buttons.find(button => button.classList.contains('active'))?.dataset.placeLens || 'relationships');
    followPanelLight(placeExplorer, '--place-x', '--place-y');
  }

  const permissionCopy = {
    view: ['Viewing has its own terms.', 'A person may view material for a named activity while storage, transcription, model work and publication remain separate conversations.'],
    store: ['Storage names custody and duration.', 'The record identifies where working files, backups, logs and temporary copies live, who holds them and when review returns.'],
    transcribe: ['Transcription creates a new record.', 'Speech, names, language, context and corrections stay connected to contributors and the purpose of the project.'],
    train: ['Model work names inputs and outputs.', 'The project records source material, local processing, model artefacts, access, evaluation and the outputs selected for release.'],
    publish: ['Publication selects a particular output.', 'A public film, event listing or model view carries its source, contributors, credits, version and reuse terms.'],
    withdraw: ['Review remains part of the relationship.', 'People revisit access, purpose, corrections, retention and withdrawal as material and projects develop over time.']
  };
  const permissionBoard = document.querySelector('[data-permission-board]');
  permissionBoard?.querySelectorAll('[data-layer]').forEach(tab => tab.addEventListener('click', () => {
    permissionBoard.querySelectorAll('[data-layer]').forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const [heading, copy] = permissionCopy[tab.dataset.layer];
    const target = permissionBoard.querySelector('[data-layer-copy]');
    target.innerHTML = `<h3>${heading}</h3><p>${copy}</p>`;
  }));

  const modeExplorer = document.querySelector('[data-mode-explorer]');
  if (modeExplorer) {
    const buttons = [...modeExplorer.querySelectorAll('[data-mode]')];
    const panels = [...modeExplorer.querySelectorAll('[data-mode-panel]')];
    const showMode = key => {
      buttons.forEach(button => {
        const active = button.dataset.mode === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.modePanel !== key; });
    };
    modeExplorer.classList.add('is-enhanced');
    buttons.forEach(button => button.addEventListener('click', () => showMode(button.dataset.mode)));
    showMode(buttons.find(button => button.classList.contains('active'))?.dataset.mode || 'everyday');
  }

  const workbenchExplorer = document.querySelector('[data-workbench-explorer]');
  if (workbenchExplorer) {
    const buttons = [...workbenchExplorer.querySelectorAll('[data-workbench-mode]')];
    const panels = [...workbenchExplorer.querySelectorAll('[data-workbench-panel]')];
    const showWorkload = key => {
      buttons.forEach(button => {
        const active = button.dataset.workbenchMode === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.workbenchPanel !== key; });
    };
    workbenchExplorer.classList.add('is-enhanced');
    buttons.forEach(button => button.addEventListener('click', () => showWorkload(button.dataset.workbenchMode)));
    showWorkload(buttons.find(button => button.classList.contains('active'))?.dataset.workbenchMode || 'gumpi');
    followPanelLight(workbenchExplorer, '--workbench-x', '--workbench-y');
  }

  const planBuilder = document.querySelector('[data-node-plan-builder]');
  if (planBuilder) {
    const fields = [...planBuilder.querySelectorAll('textarea[name]')];
    const preview = planBuilder.querySelector('[data-plan-preview]');
    const message = planBuilder.querySelector('[data-plan-message]');
    const labels = {
      place: 'Place and purpose',
      relationships: 'Relationships and permissions',
      everyday: 'Everyday workloads',
      disruption: 'Disruption roles',
      people: 'Equipment holder and people',
      hardware: 'Hardware and connections',
      evidence: 'Evidence and next review'
    };
    const buildBrief = () => {
      const sections = fields.map(field => `## ${labels[field.name]}\n\n${field.value.trim() || '_Open for exploration_'}`);
      return `# Cultural compute node working brief\n\n${sections.join('\n\n')}\n`;
    };
    const updateBrief = () => { preview.textContent = buildBrief(); };
    fields.forEach(field => field.addEventListener('input', updateBrief));
    updateBrief();
    planBuilder.querySelector('[data-plan-copy]')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(buildBrief());
        message.textContent = 'Markdown copied.';
      } catch {
        message.textContent = 'Copy access was unavailable. The live brief remains ready to select.';
      }
    });
    planBuilder.querySelector('[data-plan-download]')?.addEventListener('click', () => {
      const file = new Blob([buildBrief()], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cultural-compute-node-working-brief.md';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      message.textContent = 'Markdown brief downloaded.';
    });
  }

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

})();
