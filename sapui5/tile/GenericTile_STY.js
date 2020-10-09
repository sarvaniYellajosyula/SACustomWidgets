(function() {
    let template = document.createElement("template");
    template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Tile Header Text</legend>
				<table>
					<tr>
						<td>Header</td>
						<td><input id="header_text" type="string"></td>
					</tr>
				</table>
			</fieldset>
		</form>
	`;

    class GenericTileAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        headerText: this.headerText
                    }
                }
            }));
        }

        set headerText(newText) {
            this._shadowRoot.getElementById("header_text").value = newText;
        }

        get headerText() {
            return this._shadowRoot.getElementById("header_text").value;
        }
    }

    customElements.define("com-sac-customwidget-generictile-aps", GenericTileAps);
})();