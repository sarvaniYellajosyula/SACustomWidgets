(function() {
    let template = document.createElement("template");
    template.innerHTML = ` 
        <form id="submitForm">
                <legend class="no">Process Partner Generic Tile properties</legend>
                    <div class="abra-prop">
                        <div class="abra-title">Header text</div>
                        <div><input id="builder_header" class="abra-input" type="text" size="8"></div>				
                    </div>
                    <div class="abra-prop">
                        <div class="abra-title">Subheader text</div>
                        <div><input id="builder_subheader" class="abra-input" type="text" size="8"></div>				
                    </div>                    
        </form>
		`;
    class NewBulletMicroChartPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._shadowRoot.getElementById("submitForm").addEventListener("submit", 
            this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault(), this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        header: this.header
                    }
                }
            }));
        }
        set header(newHeader) {
            this._shadowRoot.getElementById("builder_header").value = newHeader;
        }
        get header() {
            return this._shadowRoot.getElementById("builder_header").value;
        }
        set subheader(newSubheader) {
            this._shadowRoot.getElementById("builder_subheader").value = newSubheader;
        }
        get subheader() {
            return this._shadowRoot.getElementById("builder_subheader").value;
        }
    }
        customElements.define("ch-processpartner-sample-bulletmicrochart-builder", NewBulletMicroChartPanel);
    })();