(function() {
    let template = document.createElement("template");
    template.innerHTML = ` 
        <form id="submitForm">
        <fieldset>
            <legend>Process Partner Generic Tile properties</legend>
            <table>
                <tr>
                    <td>Header Text</td>
                    <td><input id="builder_header" class="abra-input" type="text" size="8"></td>
                </tr>
                <tr>
                    <td>Subheader Text</td>
                    <td><input id="builder_subheader" class="abra-input" type="text" size="8"></td>
                </tr>
                <tr>
                    <td>Unit Value</td>
                    <td><input id="builder_unit" class="abra-input" type="text" size="8"></td>
                </tr>
            </table>
            <input type="submit" style="display:none;">
        </fieldset>           
        </form>
		`;
    class NewTileBuilderPanel extends HTMLElement {
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
                        header: this.header,
                        subheader: this.subheader,
                        unit: this.unit                        
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
        set unit(newUnit) {
            this._shadowRoot.getElementById("builder_unit").value = newUnit;
        }
        get unit() {
            return this._shadowRoot.getElementById("builder_unit").value;
        }
    }
        customElements.define("com-sap-sample-newtile-builder", NewTileBuilderPanel);
    })();