globalThis.ModalConfirmation = class ModalConfirmation extends HTMLElement {
  connectedCallback() {
    // Render modal HTML and bind buttons
    this.innerHTML = `
      <div class="modal-content">
        <div class="modal-header"></div>
        <div class="modal-body">
          <div class="modal-message"></div>
          <div class="modal-actions" style="margin-top:1em;display:flex;gap:1em;justify-content:flex-end;">
            <button class="modal-btn cancel">Cancel</button>
            <button class="modal-btn confirm">OK</button>
          </div>
        </div>
      </div>`;
    this.messageEl = this.querySelector('.modal-message');
    this.confirmBtn = this.querySelector('.modal-btn.confirm');
    this.cancelBtn = this.querySelector('.modal-btn.cancel');
    this.confirmBtn.onclick = () => this.hide(true);
    this.cancelBtn.onclick = () => this.hide(false);
  }

  // Shows modal with message, returns promise resolving to result
  static show(message) {
    return new Promise(resolve => {
      const modal = new ModalConfirmation();
      document.body.appendChild(modal);
      modal.messageEl.innerHTML = message;
      modal.classList.add('show');
      modal.confirmBtn.focus();
      modal.hide = result => {
        modal.classList.remove('show');
        modal.remove();
        resolve(result ? modal.value : null);
        if (result) modal.dispatchEvent(new CustomEvent('confirm'));
      };
    });
  }

  // Gets values from elements with propname attributes
  get value() {
    const values = {};
    this.querySelectorAll('.propvalue').forEach(el => {
      values[el.getAttribute('propname')] = el.value || el.textContent;
    });
    return values;
  }
}

globalThis.Modal = class Modal extends HTMLElement {
  constructor() {
    super();
    // Initialize modal with high z-index and basic structure
    this.style.zIndex = 20000;
    this.innerHTML = `
      <div class="modal-content">
        <div class="modal-header"></div>
        <div class="close-btn ok">×</div>
        <div class="modal-body"></div>
      </div>`;
  }

  // Shows modal with message and optional data/header, returns promise with values
  static show(message, data = {}, header = '') {
    return new Promise(resolve => {
      const modal = new Modal();
      modal.querySelector('.modal-header').innerHTML = header;
      modal.querySelector('.modal-body').innerHTML = message;
      document.body.appendChild(modal);
      Object.entries(data).forEach(([key, value]) => {
        const el = modal.querySelector(`[propname="${key}"]`);
        if (el) el.value = value;
      });
      modal.querySelector('.ok').onclick = () => {
        resolve(Object.fromEntries([...modal.querySelectorAll('.propvalue')]
          .map(el => [el.getAttribute('propname'), el.value || el.textContent])));
        modal.remove();
      };
    });
  }
}

customElements.define('modal-gen', Modal);
customElements.define('modal-confirmation', ModalConfirmation);