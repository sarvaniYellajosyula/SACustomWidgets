(function() {
    let template = document.createElement("template");
    template.innerHTML = `<form id="form"><table style="width: 100%;"><tr><td><div>Data:</div><div><textarea id="bps_data"style="min-height: 150px;width: 100%;">[{"name":"Buenos Aires","size":85084,"color":50,"xvalue":100},{"name":"Córdoba","size":330876,"color":10,"xvalue":20}]</textarea></div><div><button id="bps_data_submit">Set Data</button></div></td></tr><tr><td>X-Axis label:<input id="bps_xAxisLabel"type="text"></td></tr><tr><td>Size-Axis label:<input id="bps_sizeLabel"type="text"></td></tr><tr><td>Color-Axis label:<input id="bps_colorLabel"type="text"></td></tr><tr><td>Decimal place of value on x-axis:<input id="bps_valDecimal"type="number"step=1 min=0 max=5></td></tr><tr><td>Decimal place of value on size-axis:<input id="bps_sizeDecimal"type="number"step=1 min=0 max=5></td></tr><tr><td>Decimal place of value on color-axis:<input id="bps_colorDecimal"type="number"step=1 min=0 max=5></td></tr></table><input type="submit"style="display:none;"></form><style>:host{display:block;padding:1em 1em 1em 1em;} input:out-of-range{background-color:rgba(255,0,0,0.25);}</style>`;
    class FBUBBLE_Bps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._shadowRoot.getElementById("bps_valDecimal").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_sizeDecimal").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_colorDecimal").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_xAxisLabel").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_sizeLabel").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_colorLabel").addEventListener("input", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("bps_data_submit").addEventListener("click", this._formSubmit.bind(this));
        }
        _formSubmit(e) {
            e.preventDefault();
            this._shadowRoot.getElementById("form").dispatchEvent(new Event('submit'));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        xAxisLabel: this.xAxisLabel,
                        sizeLabel: this.sizeLabel,
                        colorLabel: this.colorLabel,
                        valDecimal: this.valDecimal,
                        sizeDecimal: this.sizeDecimal,
                        colorDecimal: this.colorDecimal,
                        data: this.data
                    }
                }
            }));
        }
        set xAxisLabel(newVal) {
            this._shadowRoot.getElementById("bps_xAxisLabel").value = newVal;
        }
        get xAxisLabel() {
            return this._shadowRoot.getElementById("bps_xAxisLabel").value;
        }
        set sizeLabel(newVal) {
            this._shadowRoot.getElementById("bps_sizeLabel").value = newVal;
        }
        get sizeLabel() {
            return this._shadowRoot.getElementById("bps_sizeLabel").value;
        }
        set colorLabel(newVal) {
            this._shadowRoot.getElementById("bps_colorLabel").value = newVal;
        }
        get colorLabel() {
            return this._shadowRoot.getElementById("bps_colorLabel").value;
        }
        set data(newVal) {
            this._shadowRoot.getElementById("bps_data").value = newVal;
        }
        get data() {
            return this._shadowRoot.getElementById("bps_data").value;
        }
        set valDecimal(newVal) {
            this._shadowRoot.getElementById("bps_valDecimal").value = newVal;
        }
        get valDecimal() {
            return this._shadowRoot.getElementById("bps_valDecimal").value;
        }
        set sizeDecimal(newVal) {
            this._shadowRoot.getElementById("bps_sizeDecimal").value = newVal;
        }
        get sizeDecimal() {
            return this._shadowRoot.getElementById("bps_sizeDecimal").value;
        }
        set colorDecimal(newVal) {
            this._shadowRoot.getElementById("bps_colorDecimal").value = newVal;
        }
        get colorDecimal() {
            return this._shadowRoot.getElementById("bps_colorDecimal").value;
        }
    }
    customElements.define("com-gmail-cse-ari007-d3forcebubble-bps", FBUBBLE_Bps);
})();