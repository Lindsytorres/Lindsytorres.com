/**
 * THE PRIVATE ROOM — Application form logic
 *
 * TODO: Connect application form to final CRM or form endpoint before
 * production launch (Tally, Fillout, Supabase, Formspree, HubSpot, etc).
 * Until FORM_ENDPOINT is configured in assets/js/config.js, submissions are
 * stored in localStorage only, purely to demo the full visual flow.
 */
(function () {
  "use strict";

  const form = document.getElementById("application-form");
  if (!form) return;

  const cfg = (window.siteConfig && window.siteConfig.integrations) || {};
  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const REQUIRED_TEXT_FIELDS = [
    "fullName",
    "email",
    "whatsapp",
    "location",
    "webOrInstagram",
    "companyName",
    "whatYouSell",
    "timeOperating",
    "revenueRange",
    "whatDependsOnYou",
    "threeYearVision",
    "whatWouldChange",
    "whyNow",
    "whatHaveYouTried",
  ];
  const REQUIRED_RADIO_GROUPS = [
    "investmentModality",
    "finalDecisionMaker",
    "readyToStart",
  ];

  let hasStartedApplication = false;
  form.addEventListener(
    "focusin",
    () => {
      if (!hasStartedApplication) {
        hasStartedApplication = true;
        if (window.trackEvent) window.trackEvent("start_private_room_application");
      }
    },
    { once: true }
  );

  function showError(name, message) {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errorEl) {
      if (message) errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
    const control = form.querySelector(`#${name}`);
    if (control) control.classList.add("has-error");
    const group = form.querySelector(`[data-error-group="${name}"]`);
    if (group) group.classList.add("has-error");
  }

  function clearError(name) {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errorEl) errorEl.classList.remove("is-visible");
    const control = form.querySelector(`#${name}`);
    if (control) control.classList.remove("has-error");
    const group = form.querySelector(`[data-error-group="${name}"]`);
    if (group) group.classList.remove("has-error");
  }

  function clearAllErrors() {
    form.querySelectorAll(".form-error").forEach((el) => el.classList.remove("is-visible"));
    form.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
  }

  function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate(formData) {
    let firstInvalid = null;
    clearAllErrors();

    REQUIRED_TEXT_FIELDS.forEach((name) => {
      const value = (formData.get(name) || "").toString().trim();
      if (!value) {
        showError(name);
        firstInvalid = firstInvalid || form.querySelector(`#${name}`);
      }
    });

    const email = (formData.get("email") || "").toString().trim();
    if (email && !isEmailValid(email)) {
      showError("email", "Ingresa un correo electrónico válido.");
      firstInvalid = firstInvalid || form.querySelector("#email");
    }

    const businessSituation = formData.getAll("businessSituation");
    if (businessSituation.length === 0) {
      showError("businessSituation");
      firstInvalid =
        firstInvalid || form.querySelector('[data-error-group="businessSituation"]');
    }

    REQUIRED_RADIO_GROUPS.forEach((name) => {
      if (!formData.get(name)) {
        showError(name);
        firstInvalid =
          firstInvalid || form.querySelector(`[data-error-group="${name}"]`);
      }
    });

    if (!formData.get("investmentConsent")) {
      showError("investmentConsent");
      firstInvalid = firstInvalid || form.querySelector("#investmentConsent");
    }

    return firstInvalid;
  }

  function buildPayload(formData) {
    const utms = JSON.parse(sessionStorage.getItem("tpr_utms") || "{}");
    return {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      location: formData.get("location"),
      webOrInstagram: formData.get("webOrInstagram"),
      companyName: formData.get("companyName"),
      whatYouSell: formData.get("whatYouSell"),
      timeOperating: formData.get("timeOperating"),
      revenueRange: formData.get("revenueRange"),
      businessSituation: formData.getAll("businessSituation"),
      whatDependsOnYou: formData.get("whatDependsOnYou"),
      threeYearVision: formData.get("threeYearVision"),
      whatWouldChange: formData.get("whatWouldChange"),
      whyNow: formData.get("whyNow"),
      whatHaveYouTried: formData.get("whatHaveYouTried"),
      investmentModality: formData.get("investmentModality"),
      finalDecisionMaker: formData.get("finalDecisionMaker"),
      readyToStart: formData.get("readyToStart"),
      anythingElse: formData.get("anythingElse") || "",
      investmentConsent: Boolean(formData.get("investmentConsent")),
      utms,
      submittedAt: new Date().toISOString(),
    };
  }

  /**
   * submitApplication(payload)
   * Swap the body of this function for a real integration
   * (Tally / Fillout / Supabase / Formspree / HubSpot / webhook) when
   * FORM_ENDPOINT is configured. Until then it only persists locally so the
   * full flow (received page, dev status) can be reviewed end to end.
   */
  async function submitApplication(payload) {
    if (cfg.FORM_ENDPOINT) {
      // Formspree (and most form backends) require an explicit
      // "Accept: application/json" header to respond via AJAX instead of
      // attempting a server-side redirect meant for plain HTML form posts.
      const response = await fetch(cfg.FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("FORM_ENDPOINT request failed");
      return { delivered: true };
    }

    // Demo mode — no endpoint configured yet.
    const stored = JSON.parse(localStorage.getItem("tpr_applications") || "[]");
    stored.push(payload);
    localStorage.setItem("tpr_applications", JSON.stringify(stored));
    localStorage.setItem("tpr_last_application", JSON.stringify(payload));
    return { delivered: false };
  }

  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  const submitLabel = submitBtn ? submitBtn.querySelector("[data-btn-label]") : null;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const firstInvalid = validate(formData);
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = buildPayload(formData);

    submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = "Enviando solicitud...";

    try {
      const result = await submitApplication(payload);

      if (window.trackEvent) window.trackEvent("complete_private_room_application");

      if (!result.delivered && isLocal) {
        // Development-only notice — never shown to real visitors in production
        // once FORM_ENDPOINT is configured.
        if (statusEl) {
          statusEl.style.display = "block";
          statusEl.textContent =
            "Modo de desarrollo: la solicitud se guardó únicamente en este navegador (localStorage). Conecta FORM_ENDPOINT en assets/js/config.js antes de lanzar a producción.";
        }
      }

      window.location.href = "../application-received/";
    } catch (err) {
      submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = "Enviar mi solicitud";
      if (statusEl) {
        statusEl.style.display = "block";
        statusEl.textContent =
          "No pudimos enviar tu solicitud en este momento. Por favor intenta nuevamente o escríbenos directamente.";
      }
      if (isLocal) console.error("[submitApplication] failed", err);
    }
  });

  // Clear a field's error state as soon as the visitor corrects it.
  form.addEventListener("input", (event) => {
    const name = event.target.name;
    if (name) clearError(name);
  });
  form.addEventListener("change", (event) => {
    const name = event.target.name;
    if (name) clearError(name);
  });
})();
