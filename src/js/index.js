import '@georapbox/web-share-element/dist/web-share-defined.js';
import '@georapbox/files-dropzone-element/dist/files-dropzone-defined.js';
import { isWebShareSupported }                              from '@georapbox/web-share-element/dist/is-web-share-supported.js';
import '@georapbox/resize-observer-element/dist/resize-observer-defined.js';
import { CapturePhoto }                                     from '@georapbox/capture-photo-element/dist/capture-photo.js';
import { getHistory, setHistory, getSettings, setSettings } from './services/storage.js';
import { appendActivity, kindFromScanErrorMessage, tyrePositionToShort, updateHomeDashboard } from './services/activity-log.js';
import { toastAlert }                                       from './toast-alert.js';
import { debounce }                                         from './utils/debounce.js';
import { modeToNavId, navIdToPanelId }                      from './utils/navigation.js';
import { hasMeaningfulTyreSerial, isCarQrPayload, parseCarQrData } from './utils/tyre-parse.js';
import './custom-clipboard-copy.js';

const HINT_HOME_IDLE = 'Enter start #, pick a wheel, then open Scan.';

(async function () {
  const NO_BARCODE_DETECTED = 'No barcode detected';
  /** Live camera loop: empty frame — do not toast or log (fires often until a code is seen). */
  const NO_BARCODE_IN_FRAME = 'Could not detect barcode from provided source.';
  const panelHome             = document.getElementById('panel-home');
  const panelWork             = document.getElementById('panel-work');
  const panelVerify           = document.getElementById('panel-verify');
  const panelScan             = document.getElementById('panel-scan');
  const panelMore             = document.getElementById('panel-more');
  const bottomNav             = document.getElementById('bottomNav');
  const appMain               = document.getElementById('appMain');
  const cameraPanel           = document.getElementById('cameraPanel');
  const capturePhotoEl        = document.querySelector('capture-photo');
  const cameraResultsEl       = document.getElementById('cameraResults');
  const scanInstructionsEl    = document.getElementById('scanInstructions');
  const scanBtn               = document.getElementById('scanBtn');
  const resizeObserverEl      = document.querySelector('resize-observer');
  const scanFrameEl           = document.getElementById('scanFrame');
  const scanStatusHint        = document.getElementById('scanStatusHint');
  const historyDialog         = document.getElementById('historyDialog');
  const historyList           = document.getElementById('historyList');
  const deleteHistoryBtn      = document.getElementById('deleteHistoryBtn');
  const moreHistoryBtn        = document.getElementById('moreHistoryBtn');
  const moreSettingsBtn       = document.getElementById('moreSettingsBtn');
  const settingsDialog        = document.getElementById('settingsDialog');
  const settingsForm          = document.forms['settings-form'];
  const homeDashboard         = document.getElementById('homeDashboard');
  const dashboardOpenHistory  = document.getElementById('dashboardOpenHistory');
  const nextBtn               = document.getElementById('nextBtn');
  const carContainer          = document.querySelector('.car-container');
  const wheels                = document.querySelectorAll('.wheel-input');
  const startNumber           = document.querySelector('#startnumber');
  const apiBase               = location.origin.replace('1234', '4010') + '/api';
  const SERIES_NAME           = 'V8 Thunder Cars';
  const MAX_BATCH_TYRES       = 10;
  const MAX_SEASON_TYRES      = 24;

  const mainContainer         = document.getElementById('mainContainer');
  const sessionDateEl         = document.getElementById('sessionDate');
  const sessionStartNumber      = document.getElementById('sessionStartNumber');
  const sessionStatsEl        = document.getElementById('sessionStats');
  const sessionBatchStatEl    = document.getElementById('sessionBatchStat');
  const sessionSeasonStatEl   = document.getElementById('sessionSeasonStat');
  const registerBackBtn       = document.getElementById('registerBackBtn');
  const registerInfoBtn       = document.getElementById('registerInfoBtn');
  const registerReceiptBtn    = document.getElementById('registerReceiptBtn');
  const registerBatchMeter    = document.getElementById('registerBatchMeter');
  const registerBatchCount    = document.getElementById('registerBatchCount');
  const registerBatchFill     = document.getElementById('registerBatchFill');
  const registerBatchBar      = registerBatchMeter?.querySelector('[role="progressbar"]');
  const registerSeasonMeter   = document.getElementById('registerSeasonMeter');
  const registerSeasonCount   = document.getElementById('registerSeasonCount');
  const registerSeasonFill    = document.getElementById('registerSeasonFill');
  const registerSeasonBar     = registerSeasonMeter?.querySelector('[role="progressbar"]');
  const registerScanBtn       = document.getElementById('registerScanBtn');
  const registerPoolGrid      = document.getElementById('registerPoolGrid');
  const registerPoolSubtitle  = document.getElementById('registerPoolSubtitle');
  const registerBatchList     = document.getElementById('registerBatchList');
  const registerBatchSubtitle = document.getElementById('registerBatchSubtitle');
  const navRegister           = document.getElementById('navRegister');
  const navVerify             = document.getElementById('navVerify');
  const carInstructionsEl     = document.getElementById('carInstructions');

  const verifyStartNumber     = document.getElementById('verifyStartNumber');
  const verifyBadges          = panelVerify?.querySelectorAll('.verify-badge') || [];
  const verifySummarySubtitle = document.getElementById('verifySummarySubtitle');
  const verifyMismatchAlert   = document.getElementById('verifyMismatchAlert');
  const verifyMismatchLine    = document.getElementById('verifyMismatchLine');
  const verifyMismatchPrev    = document.getElementById('verifyMismatchPrev');
  const verifyCtaBtn          = document.getElementById('verifyCtaBtn');
  const verifyBackBtn         = document.getElementById('verifyBackBtn');
  const verifyInfoBtn         = document.getElementById('verifyInfoBtn');
  const verifyTyreRects       = panelVerify?.querySelectorAll('[data-tyre]') || [];

  const WHEEL_ID_TO_SHORT = {
    frontLeft:  'FL',
    frontRight: 'FR',
    rearLeft:   'RL',
    rearRight:  'RR'
  };

  /** @type {Record<string, {status: 'idle'|'verified'|'mismatch', scanned?: string, expected?: string}>} */
  const verifyState = {
    frontLeft:  { status: 'idle' },
    frontRight: { status: 'idle' },
    rearLeft:   { status: 'idle' },
    rearRight:  { status: 'idle' }
  };
  /** @type {string} */
  let lastMismatchWheel = '';

  let scanTimeout = null;
  let appMode                 = 'register';
  let batchTyreCount          = 0;

  /**
   * Tyre serials scanned in the *current* Register batch (cleared by "Next car").
   * Entries are ordered newest-first for the on-screen list.
   * @type {Array<{serial: string, at: Date, state: 'registered' | 'duplicate'}>}
   */
  const batchScans            = [];

  /**
   * Tyre serials currently present in the team's season pool (Redis set),
   * deduplicated. Used to hydrate the 24-slot grid and drive the season meter.
   * @type {string[]}
   */
  let seasonPoolSerials       = [];
  /** @type {string} */
  let activeNavId             = 'home';

  let teamData = {
    startNumber: 0,
    driverName: '',
    nat: '',
    teamName: '',
    vehicle: '',
    side: '',
    location: ''
  };

  let activeWheel = '';

  let shouldRepeatScan = false;

  function setActiveNav(navId) {
    activeNavId = navId;
    bottomNav.querySelectorAll('.bottom-nav__btn').forEach(btn => {
      const n = btn.dataset.nav;
      const isActive = n === navId;
      btn.classList.toggle('is-active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'page');
      }
      else {
        btn.removeAttribute('aria-current');
      }
    });
  }

  function focusPanel(el) {
    if (!el) {
      return;
    }

    requestAnimationFrame(() => {
      if (typeof el.focus === 'function') {
        el.focus({ preventScroll: true });
      }
    });
  }

  function onScanPanelHidden() {
    shouldRepeatScan = false;

    if (capturePhotoEl != null && typeof capturePhotoEl.stopVideoStream === 'function') {
      capturePhotoEl.stopVideoStream();
    }

    clearTimeout(scanTimeout);
  }

  const debouncedActivateScanPanel = debounce(() => {
    const capturePhoto = document.querySelector('capture-photo');

    if (appMode === 'register' && teamData.startNumber > 0 && !activeWheel) {
      scanStatusHint.textContent = `Scan each tyre for start #${ teamData.startNumber } \u2014 ${ batchTyreCount }/${ MAX_BATCH_TYRES } this pass.`;
    }
    else if (activeWheel) {
      scanStatusHint.textContent = 'Scan wheel barcode';
    }
    else {
      scanStatusHint.textContent = 'Point the camera at a barcode (car QR or tyre code).';
    }

    if (
      capturePhoto
      && !capturePhoto.loading
      && !cameraResultsEl.querySelector('.results__item')
    ) {
      if (typeof capturePhoto.startVideoStream === 'function') {
        capturePhoto.startVideoStream();
      }

      console.log('Waiting to scan', activeWheel);
      clearTimeout(scanTimeout);
      scanTimeout = setTimeout(() => {
        resetView(HINT_HOME_IDLE, true);
      }, 6000);
    }

    scan();
  }, 250);

  function showPanel(panel, { leavingScan = false } = {}) {
    const isHome   = panel === 'home';
    const isWork   = panel === 'work';
    const isVerify = panel === 'verify';
    const isScan   = panel === 'scan';
    const isMore   = panel === 'more';

    panelHome.hidden = !isHome;
    panelHome.classList.toggle('is-active', isHome);
    panelHome.setAttribute('aria-hidden', isHome ? 'false' : 'true');

    if (panelWork) {
      panelWork.hidden = !isWork;
      panelWork.classList.toggle('is-active', isWork);
      panelWork.setAttribute('aria-hidden', isWork ? 'false' : 'true');
    }

    if (panelVerify) {
      panelVerify.hidden = !isVerify;
      panelVerify.classList.toggle('is-active', isVerify);
      panelVerify.setAttribute('aria-hidden', isVerify ? 'false' : 'true');
    }

    panelScan.hidden = !isScan;
    panelScan.classList.toggle('is-active', isScan);
    panelScan.setAttribute('aria-hidden', isScan ? 'false' : 'true');

    panelMore.hidden = !isMore;
    panelMore.classList.toggle('is-active', isMore);
    panelMore.setAttribute('aria-hidden', isMore ? 'false' : 'true');

    if (isScan) {
      shouldRepeatScan = true;
      debouncedActivateScanPanel();
      focusPanel(panelScan);
    }
    else {
      if (leavingScan) {
        onScanPanelHidden();
      }

      if (isHome) {
        focusPanel(panelHome);
      }
      else if (isWork) {
        focusPanel(panelWork);
      }
      else if (isVerify) {
        focusPanel(panelVerify);
        renderVerifyPanel();
      }
      else {
        focusPanel(panelMore);
      }
    }
  }

  async function logActivityAndRefresh(partial) {
    await appendActivity(partial);
    await updateHomeDashboard(homeDashboard);
  }

  /**
   * @param {string} [preferredNav] — bottom-nav id: home | register | verify (default home)
   */
  function showMainFromNav(preferredNav) {
    const nav = preferredNav ?? 'home';
    const leavingScan = !panelScan.hidden;
    setActiveNav(nav);
    const panelId = navIdToPanelId(nav);
    showPanel(panelId, { leavingScan });

    if (panelId === 'home') {
      void updateHomeDashboard(homeDashboard);
    }
  }

  function showScanPanel() {
    setActiveNav('scan');
    showPanel('scan');
  }

  function showMorePanel() {
    const leavingScan = !panelScan.hidden;
    setActiveNav('more');
    showPanel('more', { leavingScan });
  }

  function renderVerifyPanel() {
    if (!panelVerify) {
      return;
    }

    const sn = getStartNumberFromUi();

    if (verifyStartNumber && document.activeElement !== verifyStartNumber) {
      verifyStartNumber.value = sn > 0 ? String(sn) : '';
    }

    let verifiedCount = 0;
    let mismatchCount = 0;
    let pendingFirst  = '';

    for (const badge of verifyBadges) {
      const pos   = badge.dataset.verifyWheel;
      const state = verifyState[pos]?.status || 'idle';
      const stateLabel = badge.querySelector('[data-verify-state]');

      badge.classList.toggle('is-verified', state === 'verified');
      badge.classList.toggle('is-mismatch', state === 'mismatch');
      badge.classList.remove('is-active');

      if (state === 'verified') {
        verifiedCount += 1;
        if (stateLabel) {
          stateLabel.textContent = '(Verified)';
        }
      }
      else if (state === 'mismatch') {
        mismatchCount += 1;
        if (stateLabel) {
          stateLabel.textContent = '(Mismatch)';
        }
      }
      else {
        if (stateLabel) {
          stateLabel.textContent = '(Scan required)';
        }

        if (!pendingFirst) {
          pendingFirst = pos;
        }
      }
    }

    for (const rect of verifyTyreRects) {
      const corner = rect.dataset.tyre;
      const pos    = Object.entries(WHEEL_ID_TO_SHORT)
        .find(([, short]) => short === corner)?.[0];
      const state  = pos ? verifyState[pos]?.status : 'idle';

      rect.classList.toggle('is-verified', state === 'verified');
      rect.classList.toggle('is-mismatch', state === 'mismatch');
    }

    const total       = verifyBadges.length || 4;
    const mismatchPos = lastMismatchWheel;

    if (!sn) {
      verifySummarySubtitle.textContent = 'Enter the start # above and tap a tyre to begin verification.';
    }
    else if (mismatchCount === 0 && verifiedCount === 0) {
      verifySummarySubtitle.textContent = `Start #${ sn }. Tap a tyre to scan and verify.`;
    }
    else {
      const missing = total - verifiedCount - mismatchCount;
      const suffix  = mismatchCount > 0
        ? ` ${ WHEEL_ID_TO_SHORT[mismatchPos] || 'RR' } Tyre requires re-scan.`
        : (missing > 0 ? ` ${ missing } tyre${ missing === 1 ? '' : 's' } left to scan.` : ' All tyres verified.');

      verifySummarySubtitle.textContent = `${ verifiedCount } / ${ total } Tyres Verified.${ suffix }`;
    }

    if (mismatchCount > 0 && mismatchPos) {
      const mm = verifyState[mismatchPos];
      const corner = WHEEL_ID_TO_SHORT[mismatchPos] || mismatchPos;

      verifyMismatchAlert.hidden = false;
      verifyMismatchLine.textContent = `Tyre: ${ mm?.scanned || '—' } at ${ corner }.`;

      if (mm?.expected) {
        verifyMismatchPrev.hidden      = false;
        verifyMismatchPrev.textContent = `Previous: ${ mm.expected }.`;
      }
      else {
        verifyMismatchPrev.hidden = true;
      }

      verifyCtaBtn.hidden       = false;
      verifyCtaBtn.textContent  = `Retry Scan ${ corner }`;
      verifyCtaBtn.dataset.target = mismatchPos;
    }
    else {
      verifyMismatchAlert.hidden = true;

      if (pendingFirst && sn) {
        verifyCtaBtn.hidden        = false;
        verifyCtaBtn.textContent   = `Scan ${ WHEEL_ID_TO_SHORT[pendingFirst] }`;
        verifyCtaBtn.dataset.target = pendingFirst;
      }
      else {
        verifyCtaBtn.hidden = true;
        delete verifyCtaBtn.dataset.target;
      }
    }
  }

  function resetVerifyState() {
    for (const key of Object.keys(verifyState)) {
      verifyState[key] = { status: 'idle' };
    }

    lastMismatchWheel = '';

    if (verifyStartNumber) {
      verifyStartNumber.value = '';
    }

    renderVerifyPanel();
  }

  function activateVerifyTarget(position) {
    if (!position) {
      return;
    }

    const wheelId = `wheelNumber_${ position }`;
    const wheelEl = document.getElementById(wheelId);

    if (wheelEl) {
      wheels.forEach(item => item.classList.remove('is-active'));
      wheelEl.classList.add('is-active');
      activeWheel = wheelId;

      teamData.location = wheelEl.dataset.location;
      teamData.side     = wheelEl.dataset.side;
    }

    const sn = getStartNumberFromUi();

    if (appMode !== 'verify') {
      appMode = 'verify';
      void persistAppMode('verify');
      applyModeToDom();
    }

    if (sn) {
      teamData.startNumber = sn;
    }

    showScanPanel();
    scanBtn.click();
  }

  if (!('BarcodeDetector' in window)) {
    try {
      await import('barcode-detector');
      log('Using BarcodeDetector polyfill.');
    }
    catch (err) {
      appMain.hidden   = true;
      bottomNav.hidden = true;
      return toastAlert('BarcodeDetector API is not supported by your browser.', 'danger');
    }
  } else {
    log('Using the native BarcodeDetector API.');
  }

  if (!isWebShareSupported()) {
    document.querySelectorAll('web-share').forEach(el => {
      el.hidden   = true;
      el.disabled = true;
    });
  }

  const { value: history = [] } = await getHistory();

  renderHistoryList(history);

  capturePhotoEl.addEventListener('capture-photo:video-play', evt => {
    scanFrameEl.hidden = false;
    resizeScanFrame(evt.detail.video);

    const trackSettings     = capturePhotoEl.getTrackSettings();
    const trackCapabilities = capturePhotoEl.getTrackCapabilities();
    const zoomLevelEl       = document.getElementById('zoomLevel');

    if (trackSettings?.zoom && trackCapabilities?.zoom) {
      const zoomControls = document.getElementById('zoomControls');
      const minZoom      = trackCapabilities?.zoom?.min || 0;
      const maxZoom      = trackCapabilities?.zoom?.max || 10;
      let currentZoom    = trackSettings?.zoom || 1;

      zoomControls.hidden     = false;
      zoomLevelEl.textContent = currentZoom;

      zoomControls.addEventListener('click', evt => {
        const zoomInBtn  = evt.target.closest('[data-action="zoom-in"]');
        const zoomOutBtn = evt.target.closest('[data-action="zoom-out"]');

        if (zoomInBtn && currentZoom < maxZoom) {
          currentZoom += 0.5;
        }

        if (zoomOutBtn && currentZoom > minZoom) {
          currentZoom -= 0.5;
        }

        zoomLevelEl.textContent = currentZoom;

        capturePhotoEl.zoom = currentZoom;
      });
    }
  }, {
    once: true
  });

  capturePhotoEl.addEventListener('capture-photo:error', evt => {
    const error = evt.detail.error;

    if (error.name === 'NotFoundError') {
      return;
    }

    const errorMessage = error.name === 'NotAllowedError'
      ? 'Permission to use webcam was denied or video Autoplay is disabled. Reload the page to give appropriate permissions to webcam.'
      : error.message;

    cameraPanel.innerHTML = /* html */`<div class="alert alert-danger" role="alert" style="margin: 0;">${ errorMessage }</div>`;
  }, {
    once: true
  });

  CapturePhoto.defineCustomElement();

  const capturePhotoVideoEl      = capturePhotoEl.shadowRoot.querySelector('video');
  const formats                  = await window.BarcodeDetector.getSupportedFormats();
  const barcodeDetector          = new window.BarcodeDetector({ formats });
  const { value: settings = {} } = await getSettings();

  Object.entries(settings).forEach(([key, value]) => {
    const settingInput = settingsForm.querySelector(`[name="${ key }"]`);

    if (!settingInput) {
      return;
    }

    if (settingInput.type === 'checkbox') {
      settingInput.checked = Boolean(value);
    }
    else if (settingInput.type === 'text') {
      settingInput.value = value != null ? String(value) : '';
    }
  });

  if (settings.workMode === 'verify' || settings.workMode === 'register') {
    appMode = settings.workMode;
  }

  function focusSessionStartNumber() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sessionStartNumber.focus({ preventScroll: false });
      });
    });
  }

  tickSessionClock();
  setInterval(tickSessionClock, 30_000);
  applyModeToDom();
  renderVerifyPanel();
  renderRegisterMeters();
  renderSeasonPool();
  renderBatchList();
  updateRegisterScanBtnState();
  showMainFromNav('home');

  async function persistAppMode(mode) {
    const { value: prev = {} } = await getSettings();
    await setSettings({ ...prev, workMode: mode });
  }

  navRegister.addEventListener('click', () => {
    appMode = 'register';
    void persistAppMode('register');
    applyModeToDom();
    showMainFromNav('register');
    focusSessionStartNumber();
  });

  navVerify.addEventListener('click', () => {
    appMode = 'verify';
    void persistAppMode('verify');
    applyModeToDom();
    showMainFromNav('verify');
    renderVerifyPanel();
  });

  if (verifyStartNumber) {
    verifyStartNumber.addEventListener('input', () => {
      const digits = verifyStartNumber.value.replace(/\D/gu, '').slice(0, 3);

      if (digits !== verifyStartNumber.value) {
        verifyStartNumber.value = digits;
      }

      sessionStartNumber.value = digits;
      const n = getStartNumberFromUi();
      syncStartNumberDisplay(n || 0);

      if (n) {
        teamData.startNumber = n;
      }

      renderVerifyPanel();
    });
  }

  for (const badge of verifyBadges) {
    badge.addEventListener('click', () => {
      const pos = badge.dataset.verifyWheel;
      const sn  = getStartNumberFromUi();

      if (!sn) {
        verifyStartNumber?.focus();
        toastAlert('Enter start # first.', 'warning');
        return;
      }

      activateVerifyTarget(pos);
    });
  }

  verifyCtaBtn?.addEventListener('click', () => {
    const target = verifyCtaBtn.dataset.target;
    const sn     = getStartNumberFromUi();

    if (!sn) {
      verifyStartNumber?.focus();
      toastAlert('Enter start # first.', 'warning');
      return;
    }

    if (target) {
      activateVerifyTarget(target);
    }
  });

  verifyBackBtn?.addEventListener('click', () => {
    showMainFromNav('home');
  });

  verifyInfoBtn?.addEventListener('click', () => {
    toastAlert('Verify checks tyre barcodes against the car\u2019s registered set. Green = match, red = mismatch.', 'info');
  });

  registerBackBtn?.addEventListener('click', () => {
    showMainFromNav('home');
  });

  registerInfoBtn?.addEventListener('click', () => {
    toastAlert('Register scans new tyres onto a car. Max 10 per batch, 24 per car per season (BPD \u00a73.2).', 'info');
  });

  registerReceiptBtn?.addEventListener('click', () => {
    const sn = teamData.startNumber > 0 ? teamData.startNumber : getStartNumberFromUi();

    if (!sn) {
      toastAlert('Enter start # before sending a receipt.', 'warning');
      return;
    }

    toastAlert(`Receipt e-mail for #${ sn } is not yet wired to the trackside API.`, 'info');
  });

  document.getElementById('navHome').addEventListener('click', () => {
    showMainFromNav('home');
  });

  document.getElementById('navScan').addEventListener('click', () => {
    showScanPanel();
  });

  document.getElementById('navMore').addEventListener('click', () => {
    showMorePanel();
  });

  sessionStartNumber.addEventListener('input', () => {
    const raw    = sessionStartNumber.value;
    const digits = raw.replace(/\D/gu, '').slice(0, 3);

    if (digits !== raw) {
      sessionStartNumber.value = digits;
    }

    if (verifyStartNumber && document.activeElement !== verifyStartNumber) {
      verifyStartNumber.value = digits;
    }

    const n = getStartNumberFromUi();

    if (n) {
      teamData.startNumber = n;
      syncStartNumberDisplay(n);
      wheels.forEach(item => item.classList.add('is-ready'));
    }
    else {
      teamData.startNumber = 0;
      syncStartNumberDisplay(0);
      wheels.forEach(item => item.classList.remove('is-ready'));
    }

    refreshSessionStats();
    renderVerifyPanel();
  });

  if (Array.isArray(formats) && formats.length > 0) {
    log(`Supported formats: ${ formats.join(', ') }`);
  }

  const resetView = (text, failure = true) => {
    showMainFromNav(modeToNavId(appMode));

    emptyResults(cameraResultsEl);
    cameraResultsEl.close();

    wheels.forEach(item => { item.classList.remove('is-active'); });

    if (typeof text === 'string' && text.length > 0) {
      scanStatusHint.textContent = text;
    }
    else if (appMode === 'register' && teamData.startNumber > 0) {
      scanStatusHint.textContent = `Scan the next tyre for start #${ teamData.startNumber }.`;
    }
    else if (activeWheel) {
      scanStatusHint.textContent = 'Scan the next wheel from the Scan tab, or tap another wheel.';
    }
    else if (startNumber.textContent !== 'X') {
      scanStatusHint.textContent = 'Tap a wheel, then open Scan.';
    }
    else {
      scanStatusHint.textContent = HINT_HOME_IDLE;
    }

    if (!failure) {
      clearTimeout(scanTimeout);
    }
  };

  const beep = (type) => {
    return new Promise((resolve) => {
      const audioContext = new AudioContext();

      const oscillator = audioContext.createOscillator();

      oscillator.type = 'sine';

      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
          break;
        case 'failure':
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          break;
        case 'waiting':
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          break;
        default:
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      }

      oscillator.connect(audioContext.destination);

      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        audioContext.close();
        resolve();
      }, 100);
    });
  };

  function renderHistoryList(data) {
    historyList.innerHTML = '';

    if (!Array.isArray(data) || !data.length) {
      historyList.innerHTML          = '<li class="history-empty">There are no saved items in history.</li>';
      deleteHistoryBtn.style.display = 'none';
    } else {
      deleteHistoryBtn.style.display = 'block';
      console.log('render history', data);
      data.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-value', item);

        let historyItem;

        try {
          new URL(item);
          historyItem      = document.createElement('a');
          historyItem.href = item;
          historyItem.setAttribute('target', '_blank');
          historyItem.setAttribute('rel', 'noreferrer noopener');
        }
        catch (err) {
          historyItem = document.createElement('span');
        }

        historyItem.textContent = item;
        historyItem.setAttribute('title', item);

        const actionsEl     = document.createElement('div');
        actionsEl.className = 'history-modal__actions';

        const copyBtn = document.createElement('custom-clipboard-copy');
        copyBtn.title = 'Copy to clipboard';
        copyBtn.setAttribute('only-icon', '');
        copyBtn.setAttribute('value', item);
        actionsEl.appendChild(copyBtn);

        const removeBtn     = document.createElement('button');
        removeBtn.type      = 'button';
        removeBtn.className = 'history-modal__delete-action';
        removeBtn.title     = 'Remove from history';
        removeBtn.setAttribute('data-action', 'delete');
        removeBtn.innerHTML = /* html */`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg>
        `;
        actionsEl.appendChild(removeBtn);

        li.appendChild(historyItem);
        li.appendChild(actionsEl);
        historyList.appendChild(li);
      });
    }
  }

  async function addToHistory(item) {
    const { value: settings } = await getSettings();
    console.log('addToHistory', item, settings);
    if (!item || !settings?.addToHistory) {
      return;
    }

    const { value: history = [], error: getHistoryError } = await getHistory();

    if (!getHistoryError && !history.find(h => h === item)) {
      const data = [...history, item];

      const { error: setHistoryError } = await setHistory(data);

      if (!setHistoryError) {
        renderHistoryList(data);
      }
    }
  }

  async function removeFromHistory(value) {
    if (!value) {
      return;
    }

    const { value: history = [], error: getHistoryError } = await getHistory();

    if (!getHistoryError) {
      const data = history.filter(item => item !== value);

      const { error: setHistoryError } = await setHistory(data);

      if (!setHistoryError) {
        renderHistoryList(data);
      }
    }
  }

  async function emptyHistory() {
    const { error: setHistoryError } = await setHistory([]);

    if (!setHistoryError) {
      renderHistoryList([]);
    }
  }

  const vibrate = (duration) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    } else {
      console.log('Vibration API is not supported.');
    }
  };

  function resizeScanFrame(videoEl) {
    if (!videoEl) {
      return;
    }

    const rect = videoEl.getBoundingClientRect();

    scanFrameEl.style.cssText = `width: ${ rect.width }px; height: ${ rect.height }px`;
  }

  function emptyResults(resultDialog) {
    resultDialog?.querySelector('.results__item')?.remove();
  }

  async function createResult(value, resultDialog) {
    if (!value || !resultDialog) {
      return;
    }

    emptyResults(resultDialog);

    let resultItem;

    try {
      const { value: settings } = await getSettings();

      new URL(value);
      resultItem      = document.createElement('a');
      resultItem.href = value;

      if (!settings?.openWebPageSameTab) {
        resultItem.setAttribute('target', '_blank');
        resultItem.setAttribute('rel', 'noreferrer noopener');
      }

      if (settings?.openWebPage) {
        resultItem.click();
      }
    }
    catch (err) {
      resultItem = document.createElement('span');
    }

    resultItem.className = 'results__item';
    resultItem.classList.toggle('results__item--no-barcode', value === NO_BARCODE_DETECTED);
    resultItem.textContent = value;

    resultDialog.insertBefore(resultItem, resultDialog.querySelector('.results__actions'));

    const clipboarCopyEl = resultDialog.querySelector('custom-clipboard-copy');
    const webShareEl     = resultDialog.querySelector('web-share');
    const isValidValue   = value !== NO_BARCODE_DETECTED;

    if (clipboarCopyEl) {
      clipboarCopyEl.disabled = !isValidValue;
      clipboarCopyEl.hidden   = !isValidValue;
    }

    if (webShareEl && isWebShareSupported()) {
      webShareEl.disabled = !isValidValue;
      webShareEl.hidden   = !isValidValue;

      if (isValidValue) {
        webShareEl.setAttribute('share-text', value);
      } else {
        webShareEl.removeAttribute('share-text');
      }
    }

    resultDialog.show();
  }

  async function detectBarcode(source) {
    const results = await barcodeDetector.detect(source);

    if (!Array.isArray(results) || results.length === 0) {
      throw {
        message: NO_BARCODE_IN_FRAME
      };
    }

    const codes    = results;
    let wheel      = document.getElementById(activeWheel);
    const tyreType = 'slick';

    /**
     * Linear barcodes and tyre QR (serial-only payload) share this path.
     * @param {string} rawValue
     */
    async function handleTyreSerialScan(rawValue) {
      wheel = document.getElementById(activeWheel);

      if (appMode === 'verify') {
        if (!wheel) {
          await beep('failure');
          resetView('Choose a wheel position on the car first.', true);
          throw {
            message: 'Choose a wheel position on the car before scanning a tyre barcode.'
          };
        }

        const sn = getStartNumberFromUi();

        if (!sn) {
          await beep('failure');
          throw {
            message: 'Enter a start number (1–999) before scanning.'
          };
        }

        teamData.startNumber = sn;
        const { ok, expected, actual, position } = await verifyWheelSerial(sn, wheel, rawValue);

        wheel.innerHTML = rawValue;
        wheel.classList.remove('is-valid', 'is-invalid');
        wheel.classList.add(ok ? 'is-valid' : 'is-invalid');
        wheel.classList.remove('is-active');

        if (verifyState[position]) {
          verifyState[position] = {
            status:   ok ? 'verified' : 'mismatch',
            scanned:  actual,
            expected
          };

          if (!ok) {
            lastMismatchWheel = position;
          }
          else if (lastMismatchWheel === position) {
            lastMismatchWheel = '';
          }
        }

        renderVerifyPanel();

        await logActivityAndRefresh({
          kind: ok ? 'verify_ok' : 'verify_fail',
          startNumber: sn,
          wheel: tyrePositionToShort(wheelIdToTyrePosition(wheel.id)),
          detail: ok ? undefined : String(rawValue).slice(0, 48)
        });
        resetView(ok ? 'Tyre matches the record for this car.' : 'Mismatch — tap Retry Scan to re-capture.', false);
        await beep(ok ? 'success' : 'failure');
        vibrate(1000);
        return;
      }

      // ————— Register (läge A) —————
      // BPD: operator enters a start # and scans each loose tyre from
      // the pile. No wheel position at this stage; the backend appends
      // every serial to the team's season pool set.

      const serial = String(rawValue || '').trim();

      if (!hasMeaningfulTyreSerial(serial)) {
        await beep('failure');
        throw {
          message: 'Scanned code does not look like a tyre serial.'
        };
      }

      const snReg = teamData.startNumber > 0 ? teamData.startNumber : getStartNumberFromUi();

      if (!snReg) {
        await beep('failure');
        throw {
          message: 'Enter a start # (1–999) before scanning tyres.'
        };
      }

      if (seasonPoolSerials.length >= MAX_SEASON_TYRES) {
        await beep('failure');
        throw {
          message: `Season cap reached: this car already has ${ MAX_SEASON_TYRES } tyres on record.`
        };
      }

      if (batchTyreCount >= MAX_BATCH_TYRES) {
        await beep('failure');
        throw {
          message: `Batch cap reached: ${ MAX_BATCH_TYRES } tyres per pass. Tap "Next car" to start a new batch.`
        };
      }

      teamData.startNumber = snReg;

      let response;

      try {
        response = await addWheel({
          startNumber: snReg,
          tyreSerial:  serial,
          type:        tyreType,
        });
      }
      catch {
        await beep('failure');
        throw {
          message: 'Server rejected this scan. Check the connection and try again.'
        };
      }

      const duplicate = response?.pool?.alreadyMember === true
        || (response?.pool && response.pool.added === false);

      batchScans.unshift({
        serial,
        at:    new Date(),
        state: duplicate ? 'duplicate' : 'registered',
      });

      if (batchScans.length > MAX_BATCH_TYRES) {
        batchScans.length = MAX_BATCH_TYRES;
      }

      if (!duplicate) {
        batchTyreCount += 1;

        if (!seasonPoolSerials.includes(serial)) {
          seasonPoolSerials = seasonPoolSerials.concat(serial);
        }
      }

      await logActivityAndRefresh({
        kind:        duplicate ? 'register_dup' : 'register_ok',
        startNumber: snReg,
        detail:      duplicate ? `Already on record: ${ serial.slice(0, 24) }` : undefined,
      });

      renderRegisterMeters(seasonPoolSerials.length);
      renderSeasonPool({ freshSerial: duplicate ? '' : serial });
      renderBatchList();
      updateRegisterScanBtnState();

      if (sessionStatsEl && !sessionStatsEl.hidden) {
        sessionBatchStatEl.textContent  = `This pass: ${ batchTyreCount } / ${ MAX_BATCH_TYRES } tyres`;
        sessionSeasonStatEl.textContent = `On record: ${ seasonPoolSerials.length } / ${ MAX_SEASON_TYRES }`;
      }

      if (duplicate) {
        toastAlert('This tyre is already on record for this car — skipped.', 'warning');
        resetView(`Already on record (${ seasonPoolSerials.length } / ${ MAX_SEASON_TYRES }). Scan next tyre.`, false);
        await beep('waiting');
        vibrate(400);
      }
      else {
        resetView(`Registered ${ batchTyreCount } / ${ MAX_BATCH_TYRES } this pass — scan next tyre.`, false);
        await beep('success');
        vibrate(800);
      }
    }

    for (const code of codes) {
      switch (code.format) {
        case 'qr_code': {
          const parsed = parseCarQrData(code.rawValue);

          if (appMode === 'verify' && isCarQrPayload(parsed)) {
            if (typeof parsed === 'object' && parsed.startNumber > 0) {
              sessionStartNumber.value = String(parsed.startNumber);
              syncStartNumberDisplay(parsed.startNumber);
            }

            await beep('failure');
            vibrate(400);
            throw {
              message: 'Verify mode: enter the start # above and scan each tyre barcode (not the car QR).'
            };
          }

          if (!isCarQrPayload(parsed)) {
            log('QR payload is tyre serial (not car QR).');
            await handleTyreSerialScan(code.rawValue);
            break;
          }

          teamData = parsed;

          sessionStartNumber.value = String(teamData.startNumber);
          syncStartNumberDisplay(teamData.startNumber);
          wheels.forEach(item => item.classList.add('is-ready'));
          await refreshSessionStats();

          if (teamData.side) {
            activeWheel = `wheelNumber_${ teamData.location.toLowerCase() }${ teamData.side.charAt(0).toUpperCase() + teamData.side.slice(1) }`;
            wheel         = document.getElementById(activeWheel);
            wheels.forEach(item => item.classList.remove('is-active'));
            wheel.classList.add('is-active');

            await beep('waiting');
            vibrate(1000);
            setTimeout(() => scanBtn.click(), 2000);
          }
          else {
            try {
              const response = await createTeam(teamData);

              if (response.tyres) {
                Object.keys(response.tyres).forEach((position) => {
                  const w = document.getElementById(`wheelNumber_${ position }`);

                  if (w && response.tyres[position].tyreSerial) {
                    w.innerHTML = `${ response.tyres[position].tyreSerial }`;
                    w.classList.add('is-valid');
                  }
                });
              }
            }
            catch {
              await beep('failure');
              vibrate(1000);
              throw {
                message: 'Could not load or register this car on the server.'
              };
            }

            await beep('success');
            vibrate(1000);
          }

          break;
        }

        default: {
          await handleTyreSerialScan(code.rawValue);
          break;
        }
      }
    }

    if (teamData.startNumber > 0) {
      syncStartNumberDisplay(teamData.startNumber);
    }

    // The Register/Verify persistence paths are now handled inside
    // handleTyreSerialScan (which also talks to the backend). The old
    // post-loop addWheel() call is retired to avoid double-posts and to
    // let the new pool-based flow own the batch-state updates.

    return codes[0];
  }

  async function scan() {
    log('Scanning...');

    scanInstructionsEl.hidden = false;

    try {
      let barcode = {};
      barcode     = await detectBarcode(capturePhotoVideoEl);
      clearTimeout(scanTimeout);
      emptyResults(cameraResultsEl);
      await createResult(barcode.rawValue, cameraResultsEl);
      await addToHistory(barcode.rawValue);
      scanInstructionsEl.hidden = true;
      scanBtn.hidden            = false;
      scanFrameEl.hidden        = true;
      return;
    }
    catch (err) {
      const message = err?.message || String(err || 'Scan did not finish.');
      const isEmptyCameraFrame = message === NO_BARCODE_IN_FRAME;

      if (!isEmptyCameraFrame) {
        toastAlert(message, 'warning');
      }

      if (!isEmptyCameraFrame
        && !/wheel position first|Enter a start number before scanning|Verify mode: enter the start #/iu.test(message)) {
        await logActivityAndRefresh({
          kind: kindFromScanErrorMessage(message),
          startNumber: getStartNumberFromUi() || undefined,
          detail: message.slice(0, 160)
        });
      }
    }

    if (shouldRepeatScan && window.BarcodeDetector) {
      scanTimeout = setTimeout(scan, 200);
    }
  }

  function log(...args) {
    process.env.NODE_ENV === 'development' && console.log(...args);
  }

  function wheelIdToTyrePosition(wheelId) {
    return wheelId?.replace(/^wheelNumber_/u, '') || '';
  }

  function getStartNumberFromUi() {
    const n = Number.parseInt(String(sessionStartNumber.value).trim(), 10);
    if (!Number.isFinite(n) || n < 1 || n > 999) {
      return 0;
    }

    return n;
  }

  function syncStartNumberDisplay(n) {
    startNumber.textContent = n > 0 ? String(n) : 'X';
  }

  async function fetchTeamTyres(startNumber) {
    if (!startNumber) {
      return null;
    }

    try {
      const response = await fetch(`${ apiBase }/wheels/${ encodeURIComponent(SERIES_NAME) }/${ startNumber }`);

      if (response.status === 404) {
        return { tyres: {} };
      }

      if (!response.ok) {
        return null;
      }

      return response.json();
    }
    catch {
      return null;
    }
  }

  function countRegisteredTyres(team) {
    if (!team?.tyres) {
      return 0;
    }

    return Object.values(team.tyres).filter(
      t => hasMeaningfulTyreSerial(String(t?.tyreSerial ?? ''))
    ).length;
  }

  /**
   * @returns {Promise<{ok: boolean, expected: string, actual: string, position: string}>}
   */
  async function verifyWheelSerial(startNumber, wheelEl, rawSerial) {
    const position   = wheelIdToTyrePosition(wheelEl?.id);
    const normalized = String(rawSerial).trim();
    const team       = await fetchTeamTyres(startNumber);

    if (!team) {
      toastAlert('Could not verify: server did not return tyre data for this start number.', 'warning');
      return { ok: false, expected: '', actual: normalized, position };
    }

    const rawExpected = team.tyres?.[position]?.tyreSerial;
    const expected    = rawExpected == null ? '' : String(rawExpected).trim();

    return {
      ok: Boolean(expected) && expected === normalized,
      expected,
      actual: normalized,
      position
    };
  }

  /**
   * @param {HTMLElement | null} meter
   * @param {HTMLElement | null} fill
   * @param {HTMLElement | null} bar
   * @param {number} count
   * @param {number} max
   */
  function renderMeter(meter, fill, bar, count, max) {
    if (!meter || !fill) {
      return;
    }

    const ratio = Math.max(0, Math.min(1, count / max));

    fill.style.width = `${ (ratio * 100).toFixed(1) }%`;

    let state = 'idle';

    if (count >= max) {
      state = 'full';
    }
    else if (ratio >= 0.8) {
      state = 'warn';
    }
    else if (count > 0) {
      state = 'active';
    }

    meter.dataset.state = state;

    if (bar) {
      bar.setAttribute('aria-valuenow', String(Math.min(count, max)));
    }
  }

  function renderRegisterMeters(seasonCount) {
    renderMeter(registerBatchMeter, registerBatchFill, registerBatchBar,
      batchTyreCount, MAX_BATCH_TYRES);

    if (registerBatchCount) {
      registerBatchCount.textContent = String(batchTyreCount);
    }

    if (typeof seasonCount === 'number') {
      renderMeter(registerSeasonMeter, registerSeasonFill, registerSeasonBar,
        seasonCount, MAX_SEASON_TYRES);

      if (registerSeasonCount) {
        registerSeasonCount.textContent = String(seasonCount);
      }
    }
    else {
      renderMeter(registerSeasonMeter, registerSeasonFill, registerSeasonBar,
        0, MAX_SEASON_TYRES);

      if (registerSeasonCount) {
        registerSeasonCount.textContent = '—';
      }
    }

    if (registerReceiptBtn) {
      registerReceiptBtn.hidden = batchTyreCount <= 0;
    }
  }

  /**
   * Fetch the team's season pool (the Redis set appended to on each scan).
   * Returns an array of serial strings (deduplicated by the server).
   * @returns {Promise<string[]>}
   */
  async function fetchSeasonPool(startNumber) {
    if (!startNumber) {
      return [];
    }

    try {
      const response = await fetch(
        `${ apiBase }/wheels/${ encodeURIComponent(SERIES_NAME) }/${ startNumber }/tyres`,
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        return [];
      }

      return data
        .map(entry => (entry && typeof entry === 'object' ? entry.tyreSerial : entry))
        .filter(serial => hasMeaningfulTyreSerial(String(serial ?? '')))
        .map(String);
    }
    catch {
      return [];
    }
  }

  /**
   * Render the 24-slot pool grid. `freshSerial`, when supplied, marks the
   * slot holding that serial with a short "is-fresh" animation (used after
   * a successful new scan).
   */
  function renderSeasonPool({ freshSerial = '' } = {}) {
    if (!registerPoolGrid) {
      return;
    }

    const slots = seasonPoolSerials.slice(0, MAX_SEASON_TYRES);
    const html = [];

    for (let i = 0; i < MAX_SEASON_TYRES; i += 1) {
      const serial  = slots[i] || '';
      const filled  = Boolean(serial);
      const tail    = serial ? serial.slice(-4) : '';
      const isFresh = freshSerial && serial === freshSerial;
      const klass   = `register-pool__slot${ isFresh ? ' is-fresh' : '' }`;
      const label   = filled
        ? `Slot ${ i + 1 }, tyre …${ tail }`
        : `Slot ${ i + 1 }, empty`;

      html.push(
        `<li class="${ klass }" data-filled="${ filled ? 'true' : 'false' }" aria-label="${ label }">`
        + `<span class="register-pool__slot-index">${ i + 1 }</span>`
        + `<span class="register-pool__slot-code">${ filled ? `…${ tail }` : '—' }</span>`
        + '</li>',
      );
    }

    registerPoolGrid.innerHTML = html.join('');

    if (registerPoolSubtitle) {
      const startNumberForSubtitle = teamData.startNumber > 0
        ? teamData.startNumber
        : getStartNumberFromUi();

      if (!startNumberForSubtitle) {
        registerPoolSubtitle.textContent = 'Enter a start # to load this car\u2019s pool.';
      }
      else if (seasonPoolSerials.length === 0) {
        registerPoolSubtitle.textContent = `Start #${ startNumberForSubtitle } has no tyres on record yet.`;
      }
      else {
        registerPoolSubtitle.textContent = `${ seasonPoolSerials.length } of ${ MAX_SEASON_TYRES } tyres on record for start #${ startNumberForSubtitle }.`;
      }
    }
  }

  function formatBatchTime(at) {
    return at.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function renderBatchList() {
    if (!registerBatchList) {
      return;
    }

    if (batchScans.length === 0) {
      registerBatchList.innerHTML = '<li class="register-batch__empty">No tyres scanned yet in this batch.</li>';
    }
    else {
      registerBatchList.innerHTML = batchScans.slice(0, MAX_BATCH_TYRES).map((entry, index) => {
        const n       = batchScans.length - index;
        const tagHtml = entry.state === 'duplicate'
          ? '<span class="register-batch__item-tag">Already on record \u2014 skipped</span>'
          : '';

        return `
          <li class="register-batch__item" data-state="${ entry.state }">
            <span class="register-batch__item-index">${ n }</span>
            <span class="register-batch__item-serial">${ entry.serial }</span>
            <span class="register-batch__item-time">${ formatBatchTime(entry.at) }</span>
            ${ tagHtml }
          </li>
        `;
      }).join('');
    }

    if (registerBatchSubtitle) {
      if (batchTyreCount === 0) {
        registerBatchSubtitle.textContent = 'Scans this pass will appear here.';
      }
      else {
        registerBatchSubtitle.textContent = `${ batchTyreCount } of ${ MAX_BATCH_TYRES } tyres scanned this pass.`;
      }
    }
  }

  function updateRegisterScanBtnState() {
    if (!registerScanBtn) {
      return;
    }

    const sn         = getStartNumberFromUi();
    const reachedCap = batchTyreCount >= MAX_BATCH_TYRES
      || seasonPoolSerials.length >= MAX_SEASON_TYRES;

    registerScanBtn.disabled = !sn || reachedCap;

    const labelEl = registerScanBtn.querySelector('.register-scan-cta__label');
    const hintEl  = registerScanBtn.querySelector('.register-scan-cta__hint');

    if (labelEl && hintEl) {
      if (!sn) {
        labelEl.textContent = 'Enter start # first';
        hintEl.textContent  = 'Then tap to scan';
      }
      else if (batchTyreCount >= MAX_BATCH_TYRES) {
        labelEl.textContent = 'Batch full';
        hintEl.textContent  = `Limit ${ MAX_BATCH_TYRES } per pass \u2014 tap "Next car"`;
      }
      else if (seasonPoolSerials.length >= MAX_SEASON_TYRES) {
        labelEl.textContent = 'Season full';
        hintEl.textContent  = `${ MAX_SEASON_TYRES } / ${ MAX_SEASON_TYRES } on record for this car`;
      }
      else {
        labelEl.textContent = 'Scan tyre';
        hintEl.textContent  = 'Opens the camera \u2014 no position needed';
      }
    }
  }

  async function refreshSessionStats() {
    const sn = teamData.startNumber > 0 ? teamData.startNumber : getStartNumberFromUi();

    if (!sn || appMode !== 'register') {
      sessionStatsEl.hidden = true;
      renderRegisterMeters();
      renderSeasonPool();
      renderBatchList();
      updateRegisterScanBtnState();
      return;
    }

    sessionStatsEl.hidden          = false;
    sessionBatchStatEl.textContent = `This pass: ${ batchTyreCount } / ${ MAX_BATCH_TYRES } tyres`;

    // Source of truth for the season count is the pool set
    // (POST /api/wheels/:c/:sn appends every scan there), not the
    // 4-slot live layout which is only used for race telemetry.
    seasonPoolSerials               = await fetchSeasonPool(sn);
    sessionSeasonStatEl.textContent = `On record: ${ seasonPoolSerials.length } / ${ MAX_SEASON_TYRES }`;

    renderRegisterMeters(seasonPoolSerials.length);
    renderSeasonPool();
    renderBatchList();
    updateRegisterScanBtnState();
  }

  function applyModeToDom() {
    mainContainer.classList.toggle('mode-verify', appMode === 'verify');

    if (appMode === 'verify') {
      carInstructionsEl.innerHTML = '1. Enter start # above.<br>2. Tap a wheel, open Scan, and capture each barcode — green if on record, red if not.';
      sessionStatsEl.hidden       = true;
    }
    else {
      carInstructionsEl.innerHTML = '1. Set start # above (or scan the car QR from the Scan tab).<br>2. Tap a wheel, open Scan, and capture barcodes.';
      refreshSessionStats();
    }
  }

  function tickSessionClock() {
    const now = new Date();
    sessionDateEl.dateTime = now.toISOString();
    sessionDateEl.textContent = now.toLocaleString('sv-SE', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  const addWheel = async (data) => {
    console.log('Posting wheel data', data);
    try {
      const response = await fetch(`${ apiBase }/wheels/${ encodeURIComponent(SERIES_NAME) }/${ data.startNumber }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to post data to API');
      }

      const responseData = await response.json();
      return responseData;
    }
    catch (error) {
      console.error('Error posting data to API:', error.message);
      throw error;
    }
  };

  const createTeam = async (data) => {
    try {
      const response = await fetch(`${ apiBase }/wheels/${ encodeURIComponent(SERIES_NAME) }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to post data to API');
      }

      const responseData = await response.json();
      return responseData;
    }
    catch (error) {
      console.error('Error posting data to API:', error.message);
      throw error;
    }
  };

  scanBtn.addEventListener('click', () => {
    scanBtn.hidden     = true;
    scanFrameEl.hidden = false;
    emptyResults(cameraResultsEl);
    cameraResultsEl.close();

    clearTimeout(scanTimeout);
  });

  resizeObserverEl.addEventListener('resize-observer:resize', () => {
    resizeScanFrame(capturePhotoEl.shadowRoot.querySelector('video'));
  });

  moreSettingsBtn.addEventListener('click', () => {
    settingsDialog.showModal();
  });

  dashboardOpenHistory?.addEventListener('click', () => {
    historyDialog.showModal();
  });

  nextBtn.addEventListener('click', () => {
    activeWheel          = '';
    batchTyreCount       = 0;
    batchScans.length    = 0;
    seasonPoolSerials    = [];
    teamData.startNumber = 0;
    teamData.side        = '';
    teamData.location    = '';

    wheels.forEach(item => {
      item.innerHTML = 'Click & Scan';
      item.classList.remove('is-valid');
      item.classList.remove('is-ready');
      item.classList.remove('is-invalid');
      item.classList.remove('is-active');
    });

    startNumber.textContent   = 'X';
    sessionStartNumber.value  = '';
    resetView(HINT_HOME_IDLE, false);
    resetVerifyState();
    refreshSessionStats();
    void updateHomeDashboard(homeDashboard);
  });

  moreHistoryBtn.addEventListener('click', () => {
    historyDialog.showModal();
  });

  if (carContainer) {
    carContainer.addEventListener('click', evt => {
      if (!evt.target.classList.contains('wheel-input')) {
        return;
      }

      wheels.forEach(item => item.classList.remove('is-active'));
      activeWheel = evt.target.id;
      evt.target.classList.add('is-active');

      teamData.location = evt.target.dataset.location;
      teamData.side     = evt.target.dataset.side;

      const n = getStartNumberFromUi();

      if (appMode === 'verify' && n) {
        teamData.startNumber = n;
      }

      showScanPanel();
      scanBtn.click();
    });
  }

  registerScanBtn?.addEventListener('click', () => {
    const sn = getStartNumberFromUi();

    if (!sn) {
      toastAlert('Enter a start # (1\u2013999) before scanning.', 'warning');
      return;
    }

    if (seasonPoolSerials.length >= MAX_SEASON_TYRES) {
      toastAlert(
        `Season cap reached: ${ MAX_SEASON_TYRES } tyres already on record for this car.`,
        'warning',
      );
      return;
    }

    if (batchTyreCount >= MAX_BATCH_TYRES) {
      toastAlert(
        `Batch cap reached: ${ MAX_BATCH_TYRES } tyres per pass. Tap "Next car" before scanning more.`,
        'warning',
      );
      return;
    }

    // BPD läge A: scan loose tyres against this start #. No position
    // needs to be picked \u2014 the server appends to the season pool.
    activeWheel          = '';
    teamData.startNumber = sn;
    teamData.side        = '';
    teamData.location    = '';

    wheels.forEach(item => item.classList.remove('is-active'));

    setActiveNav('scan');
    showPanel('scan');
    showScanPanel();
    scanBtn.click();
  });

  historyDialog.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      historyDialog.close();
    }
  });

  settingsDialog.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      settingsDialog.close();
    }
  });

  async function persistSettingsFromForm() {
    const next       = {};
    const checkboxes = settingsForm.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(item => {
      next[item.name] = item.checked;
    });

    const op = settingsForm.querySelector('[name="operatorLabel"]');

    if (op) {
      next.operatorLabel = op.value.trim();
    }

    const { value: prev = {} } = await getSettings();
    await setSettings({ ...prev, ...next });
  }

  settingsForm.addEventListener('change', () => {
    void persistSettingsFromForm();
  });

  historyList.addEventListener('click', evt => {
    const target = evt.target;

    if (target.closest('[data-action="delete"]')) {
      if (window.confirm('Delete item from history?')) {
        removeFromHistory(target.closest('li').dataset.value);
      }
    }
  });

  deleteHistoryBtn.addEventListener('click', () => {
    if (window.confirm('Are you sure you want to empty history?')) {
      emptyHistory();
    }
  });
}());

