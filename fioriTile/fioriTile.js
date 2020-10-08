(function() {
    let _shadowRoot;
    let _id;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
    <div id="ui5_content" name="ui5_content">
        <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="ui5_content">    
        <mvc:View
                controllerName="sap.m.sample.NumericContentDifColors.Page"
                xmlns="sap.m"
                xmlns:mvc="sap.ui.core.mvc">
            <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout"
                    size="L"
                    header="Country-Specific Profit Margin"
                    subheader="Expenses"
                    press="press">
                <TileContent
                        unit="EUR"
                        footer="Current Quarter">
                    <NumericContent
                            scale="M"
                            value="1.96"
                            valueColor="Error"
                            indicator="Up"
                            withMargin="false" />
                </TileContent>
            </GenericTile>
        </mvc:View>
    </script>        
    `;

    class FioriTile extends HTMLElement {
        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            //this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            loadthis(this);
        }
    }
    customElements.define("com-sap-sample-fioritile", FioriTile);

    function loadthis(that) {
        var that_ = that;

        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function(){
            "use strict";

            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller"
            ], function(jQuery, Controller) {
                "use strict";

                return Controller.extend("myView.Template", {

                });
            });

            var oView  = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById("_oView")).html(),
            });
            oView.placeAt(content);
        });
    }  
})();
