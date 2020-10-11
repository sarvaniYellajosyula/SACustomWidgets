(function() {
    let template = document.createElement("template");
    template.innerHTML = `<form id="form"><table><tr><td>Title:<input id="sps_title"type="text"value="Custom Force Bubble Widget"></td></tr><tr><td><input id="sps_showTitle"type="checkbox"checked>Show Title</td></tr><tr><td><input id="sps_showAvg"type="checkbox"checked>Show Average Line</td></tr><tr><td><div><b>Define Color Scale</b></div><div>Start color:<input id="sps_startColor"type="color"value="#ffcd00"><br/>End color:<input id="sps_endColor"type="color"value="#b01c02"></div></td></tr></table><input type="submit"style="display:none;"></form><style>input:out-of-range{background-color:rgba(255,0,0,0.25);}</style>`;
    class FBUBBLE_Sps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._shadowRoot.getElementById("sps_showTitle").addEventListener("change", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("sps_showAvg").addEventListener("change", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("sps_startColor").addEventListener("change", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("sps_endColor").addEventListener("change", this._formSubmit.bind(this));
            this._shadowRoot.getElementById("sps_title").addEventListener("change", this._formSubmit.bind(this));
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
                        title: this.title,
                        showTitle: this.showTitle,
                        showAvg: this.showAvg,
                        startColor: this.startColor,
                        endColor: this.endColor
                    }
                }
            }));
        }
        set title(newTitle) {
            this._shadowRoot.getElementById("sps_title").value = newTitle;
        }
        get title() {
            return this._shadowRoot.getElementById("sps_title").value;
        }
        set startColor(newColor) {
            this._shadowRoot.getElementById("sps_startColor").value = newColor;
        }
        get startColor() {
            return this._shadowRoot.getElementById("sps_startColor").value;
        }
        set endColor(newColor) {
            this._shadowRoot.getElementById("sps_endColor").value = newColor;
        }
        get endColor() {
            return this._shadowRoot.getElementById("sps_endColor").value;
        }
        set showTitle(flag) {
            this._shadowRoot.getElementById("sps_showTitle").checked = flag;
        }
        get showTitle() {
            return this._shadowRoot.getElementById("sps_showTitle").checked;
        }
        set showAvg(flag) {
            this._shadowRoot.getElementById("sps_showAvg").checked = flag;
        }
        get showAvg() {
            return this._shadowRoot.getElementById("sps_showAvg").checked;
        }
    }
    customElements.define("com-gmail-cse-ari007-d3forcebubble-sps", FBUBBLE_Sps);
})();