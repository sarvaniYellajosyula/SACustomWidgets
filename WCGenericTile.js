(function()  {
    let _shadowRoot; 

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
 
     class GenericTile extends HTMLElement {
         constructor() {
             super(); 
             _shadowRoot = this.attachShadow({ mode: "open" });
             _shadowRoot.appendChild(tmpl.content.cloneNode(true));
             this.addEventListener("click", event => {
                 console.log('On Click of Tile Event');
				 var event = new Event("onClick");
                 this.dispatchEvent(event);
             });
         }
 
         //Fired when the widget is added to the html DOM of the page
         connectedCallback() {
			this._firstConnection = true;
            loadthis(this);   
         }
 
          //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
         disconnectedCallback() {         
         }
 
          //When the custom widget is updated, the Custom Widget SDK framework executes this function first
         onCustomWidgetBeforeUpdate(oChangedProperties) { 
         }
 
         //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
         onCustomWidgetAfterUpdate(oChangedProperties) {
			if (this._firstConnection){
                loadthis(this); 
            }              
         }        
     }
    customElements.define("com-sac-customwidget-generictile", GenericTile);

    // UTILS
    function loadthis(that) {
       
	   var that_ = that;
        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function () {
            "use strict";

            //### Controller ###
            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller"
            ], function (jQuery, Controller) {				
                "use strict";
                return Controller.extend("sap.m.sample.GenericTileAsLaunchTile.Page", {
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
            });
            oView.placeAt(content);
           
            if (that_._designMode) {
                oView.byId("GrossMargin").setEnabled(false);
            }
        });
    }

})();
