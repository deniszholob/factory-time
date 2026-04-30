function getData() {
  return window.FactoryTimeData;
}

function getRequiredElement(id) {
  const element = document.getElementById(id);

  if (element === null) {
    throw new Error(`Missing required element: ${id}`);
  }

  return element;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items, renderItem) {
  let html = "";

  for (const item of items) {
    html += renderItem(item);
  }

  return html;
}

function renderNavItem(item) {
  const escapedItem = escapeHtml(item);

  return `
    <a
      href="#${escapedItem}"
      class="rounded-sm px-3 py-2 font-heading text-md font-semibold text-sand-300 transition-colors hover:bg-sand-900/20 hover:text-gold-400"
    >
      ${escapedItem.toUpperCase()}
    </a>
  `;
}

function getActionClass(action, location) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-sm border font-heading font-bold transition-colors focus:outline-none focus:ring-2";
  const sizeClass =
    location === "hero"
      ? "px-8 py-4 text-base lg:text-2xl"
      : "px-4 py-2 text-sm";

  if (action.variant === "primary") {
    return `${baseClass} ${sizeClass} border-gold-500/50 bg-sand-700/70 text-sand-50 hover:border-gold-400 hover:bg-sand-600/80 focus:ring-gold-500/70`;
  }

  return `${baseClass} ${sizeClass} border-sand-700/50 bg-sand-900/40 text-sand-100 hover:border-gold-600/50 hover:bg-sand-800/60 hover:text-gold-300 focus:ring-gold-500/50`;
}

function renderAction(action, location) {
  const label =
    location === "hero"
      ? action.heroLabel || action.label
      : action.shortLabel || action.label;
  const textClass = location === "header" ? "hidden sm:inline" : "";
  const iconClass =
    location === "hero"
      ? "h-5 w-5 transition-transform group-hover:scale-110"
      : "h-4 w-4";

  return `
    <a
      href="${escapeHtml(action.href)}"
      target="_blank"
      rel="noopener noreferrer"
      class="group ${getActionClass(action, location)}"
    >
      <img src="${escapeHtml(action.icon)}" alt="${escapeHtml(action.alt)}" class="${iconClass}" />
      <span class="${textClass}">${escapeHtml(label)}</span>
    </a>
  `;
}

function renderAboutPoint(point) {
  return `
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <img src="${escapeHtml(point.icon)}" alt="${escapeHtml(point.alt)}" class="h-6 w-6" loading="lazy" />
      </div>
      <div>
        <h3 class="mb-1 font-heading font-bold text-sand-100">${escapeHtml(point.title)}</h3>
        <p class="text-sm text-sand-400">${escapeHtml(point.description)}</p>
      </div>
    </div>
  `;
}

function getFeatureAccentClass(feature) {
  if (feature.accent === "energy") {
    return "border-energy-600/30 hover:border-energy-500/50";
  }

  if (feature.accent === "tech") {
    return "border-tech-500/30 hover:border-tech-400/50";
  }

  if (feature.accent === "emerald") {
    return "border-emerald-700/30 hover:border-emerald-500/50";
  }

  return "border-amber-600/30 hover:border-amber-400/50";
}

function getFeatureIconClass(feature) {
  if (feature.accent === "energy") {
    return "border-energy-500/30 bg-energy-500/15";
  }

  if (feature.accent === "tech") {
    return "border-tech-400/30 bg-tech-500/15";
  }

  if (feature.accent === "emerald") {
    return "border-emerald-500/30 bg-emerald-600/15";
  }

  return "border-amber-500/30 bg-amber-500/15";
}

function renderFeatureTag(tag) {
  return `
    <span class="rounded-sm border border-amber-500/30 bg-amber-500/15 px-2 py-1 text-amber-200">
      ${escapeHtml(tag)}
    </span>
  `;
}

function renderFeature(feature) {
  return `
    <div class="flex h-full flex-col overflow-hidden rounded-md  ${getFeatureAccentClass(feature)} p-6 transition-colors duration-200">
      <div class="flex items-center gap-4">
        <div class="inline-flex h-12 w-12 items-center justify-center rounded-md border ${getFeatureIconClass(feature)}">
          <img src="${escapeHtml(feature.icon)}" alt="${escapeHtml(feature.alt)}" class="h-6 w-6" loading="lazy" />
        </div>
          <h3 class="font-heading text-2xl font-bold text-sand-100">${escapeHtml(feature.title)}</h3>
      </div>

      <div class="flex h-full flex-col gap-5">
        <p class="leading-relaxed text-sand-400">${escapeHtml(feature.description)}</p>
          <img src="${escapeHtml(feature.image)}" alt="${escapeHtml(feature.imageAlt)}" class="w-auto object-contain" loading="lazy" />
      </div>
    </div>
  `;
}

function renderGalleryImage(item, index) {
  return `
    <button
      type="button"
      class="gallery-card group rounded-md border border-sand-700/30 bg-black/20 p-2 text-left shadow-solid transition-colors hover:border-gold-600/50"
      data-lightbox
      data-lightbox-index="${index}"
      data-title="${escapeHtml(item.title)}"
      aria-label="Open fullscreen image of the ${escapeHtml(item.title)} screen"
    >
      <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" class="rounded-sm" loading="lazy" />
      <span class="mt-3 flex items-center justify-between gap-3 px-1 pb-1 font-heading text-sm uppercase tracking-[0.18em] text-sand-300">
        ${escapeHtml(item.title)}
      </span>
    </button>
  `;
}

function renderGalleryImages(items) {
  let html = "";

  for (let index = 0; index < items.length; index += 1) {
    html += renderGalleryImage(items[index], index);
  }

  return html;
}

function renderVideo(video) {
  return `
    <div class="overflow-hidden rounded-lg border border-sand-700/30 transition-colors hover:border-gold-600/50">
      <iframe
        src="${escapeHtml(video.embedUrl)}"
        title="${escapeHtml(video.title)}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        loading="lazy"
        class="aspect-video w-full"
      ></iframe>
    </div>
  `;
}

function renderPresskitItem(item) {
  return `
    <a
      href="${escapeHtml(item.href)}"
      download
      class="group relative flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-sand-700/30 bg-sand-900/20 p-4 transition-colors hover:border-gold-600/50"
    >
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" class="max-h-full max-w-full object-contain" loading="lazy" />
      <span class="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1 text-center font-heading text-xs uppercase tracking-[0.14em] text-sand-300 opacity-0 transition-opacity group-hover:opacity-100">Download</span>
    </a>
  `;
}

function renderFooterSocialLink(action) {
  return `
    <a href="${escapeHtml(action.href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sand-500 transition-colors hover:text-gold-400">
      <img src="${escapeHtml(action.icon)}" alt="${escapeHtml(action.alt)}" class="h-6 w-6" loading="lazy" />
    </a>
  `;
}

function renderStaticSections() {
  const data = getData();

  getRequiredElement("site-nav").innerHTML = renderList(
    data.navItems,
    renderNavItem,
  );
  getRequiredElement("header-actions").innerHTML = renderList(
    data.actions,
    renderHeaderAction,
  );
  getRequiredElement("hero-actions").innerHTML = renderList(
    data.actions,
    renderHeroAction,
  );
  getRequiredElement("about-points").innerHTML = renderList(
    data.aboutPoints,
    renderAboutPoint,
  );
  // getRequiredElement("features-grid").innerHTML = renderList(
  //   data.features,
  //   renderFeature,
  // );
  getRequiredElement("gallery-grid").innerHTML = renderGalleryImages(
    data.galleryImages,
  );
  getRequiredElement("media-grid").innerHTML = renderList(
    data.videos,
    renderVideo,
  );
  getRequiredElement("presskit-grid").innerHTML = renderList(
    data.presskitItems,
    renderPresskitItem,
  );
  getRequiredElement("footer-social-links").innerHTML = renderList(
    data.socialLinks,
    renderFooterSocialLink,
  );
}

function renderHeaderAction(action) {
  return renderAction(action, "header");
}

function renderHeroAction(action) {
  return renderAction(action, "hero");
}

function showLightbox(lightbox) {
  lightbox.hidden = false;
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
  document.body.classList.add("lightbox-open");
}

function hideLightbox(lightbox) {
  lightbox.hidden = true;
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  document.body.classList.remove("lightbox-open");
}

function renderLightbox(index, state) {
  const item = state.galleryItems[index];
  const image = item.querySelector("img");

  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  state.activeGalleryIndex = index;
  state.image.src = image.src;
  state.image.alt = image.alt;
  state.caption.textContent = item.dataset.title || image.alt;
}

function openLightbox(index, state) {
  state.previousFocusedElement = document.activeElement;
  renderLightbox(index, state);
  showLightbox(state.lightbox);
  state.closeButton.focus();
}

function closeLightbox(state) {
  hideLightbox(state.lightbox);

  if (state.previousFocusedElement instanceof HTMLElement) {
    state.previousFocusedElement.focus();
  }
}

function stepLightbox(direction, state) {
  const nextIndex =
    (state.activeGalleryIndex + direction + state.galleryItems.length) %
    state.galleryItems.length;
  renderLightbox(nextIndex, state);
}

function handleLightboxButtonClick(event, state) {
  const target = event.currentTarget;
  const index = Number(target.dataset.lightboxIndex || 0);
  openLightbox(index, state);
}

function handleLightboxBackdropClick(event, state) {
  if (
    event.target instanceof HTMLElement &&
    event.target.hasAttribute("data-lightbox-backdrop")
  ) {
    closeLightbox(state);
  }
}

function handleDocumentKeydown(event, state) {
  if (state.lightbox.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox(state);
    return;
  }

  if (event.key === "ArrowLeft") {
    stepLightbox(-1, state);
    return;
  }

  if (event.key === "ArrowRight") {
    stepLightbox(1, state);
  }
}

function createLightboxState() {
  return {
    lightbox: getRequiredElement("lightbox"),
    image: getRequiredElement("lightbox-image"),
    caption: getRequiredElement("lightbox-caption"),
    closeButton: getRequiredElement("lightbox-close"),
    previousButton: getRequiredElement("lightbox-prev"),
    nextButton: getRequiredElement("lightbox-next"),
    galleryItems: Array.from(document.querySelectorAll("[data-lightbox]")),
    activeGalleryIndex: 0,
    previousFocusedElement: null,
  };
}

function bindGalleryItem(item, state) {
  item.addEventListener("click", function handleClick(event) {
    handleLightboxButtonClick(event, state);
  });
}

function bindGalleryItems(state) {
  for (const item of state.galleryItems) {
    bindGalleryItem(item, state);
  }
}

function bindLightbox(state) {
  bindGalleryItems(state);

  state.closeButton.addEventListener("click", function handleClick() {
    closeLightbox(state);
  });

  state.previousButton.addEventListener("click", function handleClick() {
    stepLightbox(-1, state);
  });

  state.nextButton.addEventListener("click", function handleClick() {
    stepLightbox(1, state);
  });

  state.lightbox.addEventListener("click", function handleClick(event) {
    handleLightboxBackdropClick(event, state);
  });

  document.addEventListener("keydown", function handleKeydown(event) {
    handleDocumentKeydown(event, state);
  });
}

function initializePage() {
  renderStaticSections();
  bindLightbox(createLightboxState());
}

initializePage();
