(function() {
    let _shadowRoot;
    let _id;
    let _genericTile;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
     <style>
     </style>
     <div id="ui5_content" name="ui5_content">
       <slot name="content"></slot>
     </div>

    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
	    controllerName="sap.m.sample.GenericTileAsLaunchTile.Page"
	    xmlns:mvc="sap.ui.core.mvc"
	    xmlns="sap.m"
	   >
		<GenericTile 
			id ="GrossMargin"
			class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" 
			header="Gross Margin"
			subheader="in Thousands USD" 
			press="press"
			>
			<TileContent unit="EUR" footer="Current Quarter" />
		</GenericTile>	
	   
    </mvc:View>

   </script>   
     `;

    customElements.define("com-sac-customwidget-generictile", class GenericTile extends HTMLElement {
        constructor() {
            super();
            _shadowRoot = this.attachShadow({ mode: "open" });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            _id = createGuid();
            _shadowRoot.querySelector("#oView").id = _id + "_oView";
            this._export_settings = {};
            this.addEventListener("click", event => {
                console.log('click');
            });
        }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback() {
            try {
                if (window.commonApp) {
                    let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

                    if (outlineContainer && outlineContainer.getReactProps) {
                        let parseReactState = state => {
                            let components = {};

                            let globalState = state.globalState;
                            let instances = globalState.instances;
                            let app = instances.app["[{\"app\":\"MAIN_APPLICATION\"}]"];
                            let names = app.names;

                            for (let key in names) {
                                let name = names[key];

                                let obj = JSON.parse(key).pop();
                                let type = Object.keys(obj)[0];
                                let id = obj[type];

                                components[id] = {
                                    type: type,
                                    name: name
                                };
                            }

                            for (let componentId in components) {
                                let component = components[componentId];
                            }

                            let metadata = JSON.stringify({
                                components: components,
                                vars: app.globalVars
                            });

                            if (metadata != this.metadata) {
                                this.metadata = metadata;

                                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                                    detail: {
                                        properties: {
                                            metadata: metadata
                                        }
                                    }
                                }));
                            }
                        };

                        let subscribeReactStore = store => {
                            this._subscription = store.subscribe({
                                effect: state => {
                                    parseReactState(state);
                                    return {
                                        result: 1
                                    };
                                }
                            });
                        };

                        let props = outlineContainer.getReactProps();
                        if (props) {
                            subscribeReactStore(props.store);
                        } else {
                            let oldRenderReactComponent = outlineContainer.renderReactComponent;
                            outlineContainer.renderReactComponent = e => {
                                let props = outlineContainer.getReactProps();
                                subscribeReactStore(props.store);

                                oldRenderReactComponent.call(outlineContainer, e);
                            }
                        }
                    }
                }
            } catch (e) {}
			this.redraw();
        }

        //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback() {
        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(oChangedProperties) {
			 if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(oChangedProperties) {
             if (this._firstConnection){
                this.redraw();
            }
		}
        // SETTINGS

 		redraw(){
        /*    if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
            }

            var shadow = window.getSelection(this._shadowRoot);
            this._tagContainer = document.createElement(this._tagType);
            var theText = document.createTextNode(this._tagText);    
            this._tagContainer.appendChild(theText); 
            this._shadowRoot.appendChild(this._tagContainer);
			*/
		
        let content = document.createElement('div');
        content.slot = "content";
        this.appendChild(content);

        sap.ui.getCore().attachInit(function() {
            "use strict";

            //### Controller ###
            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller"
            ], function(jQuery, Controller) {
                "use strict";
                return Controller.extend("sap.m.sample.GenericTileAsLaunchTile.Page", {
                    press: function(oEvent) {
                        console.log("The GenericTile is pressed.");
                        this.settings = {};
                        //  this.settings.password = "";

                        this.dispatchEvent(new CustomEvent("onClick", {
                            detail: {
                                settings: this.settings
                            }
                        }));
                    }
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
				viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
            });
            oView.placeAt(content);
            if (this._designMode) {
                oView.byId("GrossMargin").setEnabled(true);
            }
        });
		
        }
    });
    
    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0,
                v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})();