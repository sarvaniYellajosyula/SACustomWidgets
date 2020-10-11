//d3-forcebubble SAC custom widget Version 1.0.0. Copyright 2020 Arijit Das.
(function() {
    let template = document.createElement("template");
	template.innerHTML = `<div>
			<svg width=100%height=100%id=d3forcebubble></svg></div><style>.circleDefault{stroke:#444;stroke-width:0.5px;stroke-opacity:0.5;}.circleUnselecetd{fill-opacity:0.5!important;stroke:#444;stroke-width:0.5px;stroke-opacity:0.5;}.circleDefaultHover{stroke:#444;stroke-width:1px;stroke-opacity:1;cursor:pointer;}.circleUnselecetdHover{stroke:#444;fill-opacity:0.5!important;stroke-width:1px;stroke-opacity:1;cursor:pointer;}.title{font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;}.average{font-family:Arial,Helvetica,sans-serif;font-size:10px;}.topBar{margin:5px;padding:0 5px 0 0px;}.topBar>table{width:100%;height:30px;}.topBar>table>tr>td:nth-child(2){text-align:right;}.chartContainer{height:100%;}.noData{text-align:center;width:100%;}.rootTable{height:100%;border-spacing:0px;}.rootTable>tbody>tr>td{width:100%;height:100%;}#button{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;outline:0;}#button:focus{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;outline:0;}#button:hover{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.8);font-family:verdana;min-width:8px;cursor:pointer;}#button:active{font-size:10px;padding:0px;margin:0px;height:100%;float:right;border-radius:0px;border:0px;background-color:rgba(255,255,255,0.5);font-family:verdana;min-width:8px;cursor:pointer;}.legendContainer{float:right;background-color:rgba(255,255,255,0.9);height:100%;width:150px!important;}.legendContainerHidden{display:none;}.legendName{font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;}</style>`;
    class FBUBBLE extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this._props = this.d3ForceBubbleDefaultSettings();
            this._init = true;
            this._firstUpdate = true;
            this._firstResize = true;
            this._selectionEvent = false;
        }
        onCustomWidgetBeforeUpdate(changedProperties) {}
        onCustomWidgetAfterUpdate(changedProperties) {
            var shadow = this.shadowRoot;
            if ("startColor" in changedProperties) {
                this._props.startColor = changedProperties["startColor"];
                this._selectionEvent = false;
            }
            if ("endColor" in changedProperties) {
                this._props.endColor = changedProperties["endColor"];
                this._selectionEvent = false;
            }
            if ("title" in changedProperties) {
                this._props.title = changedProperties["title"];
                this._selectionEvent = false;
            }
            if ("showTitle" in changedProperties) {
                this._props.showTitle = changedProperties["showTitle"];
                this._selectionEvent = false;
            }
            if ("showAvg" in changedProperties) {
                this._props.showAvg = changedProperties["showAvg"];
                this._selectionEvent = false;
            }
            if ("valDecimal" in changedProperties) {
                this._props.valDecimal = changedProperties["valDecimal"];
                this._selectionEvent = false;
            }
            if ("sizeDecimal" in changedProperties) {
                this._props.sizeDecimal = changedProperties["sizeDecimal"];
                this._selectionEvent = false;
            }
            if ("colorDecimal" in changedProperties) {
                this._props.colorDecimal = changedProperties["colorDecimal"];
                this._selectionEvent = false;
            }
            if ("xAxisLabel" in changedProperties) {
                this._props.xAxisLabel = changedProperties["xAxisLabel"];
                this._selectionEvent = false;
            }
            if ("sizeLabel" in changedProperties) {
                this._props.sizeLabel = changedProperties["sizeLabel"];
                this._selectionEvent = false;
            }
            if ("colorLabel" in changedProperties) {
                this._props.colorLabel = changedProperties["colorLabel"];
                this._selectionEvent = false;
            }
            if ("selectedLabel" in changedProperties) {
                if (changedProperties["selectedLabel"] == '') {
                    this._props.selectedLabel = undefined;
                } else {
                    this._props.selectedLabel = changedProperties["selectedLabel"];
                }
                this._selectionEvent = true;
            }
            if ("selectedXValue" in changedProperties) {
                this._props.selectedXValue = changedProperties["selectedXValue"];
                this._selectionEvent = true;
            }
            if ("selectedSizeValue" in changedProperties) {
                this._props.selectedSizeValue = changedProperties["selectedSizeValue"];
                this._selectionEvent = true;
            }
            if ("selectedColorValue" in changedProperties) {
                this._props.selectedColorValue = changedProperties["selectedColorValue"];
                this._selectionEvent = true;
            }
            if ("data" in changedProperties) {
                this.$data = changedProperties["data"];
                this._selectionEvent = false;
            }
            let LoadLibsAfterUpdate = async function(host, data, props) {
                try {
                    await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
                    await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js", shadow);
                } catch (e) {
                    console.log(JSON.stringify(e));
                } finally {
                    host.drawChart(data, props);
                }
            };
            if (!(this._init || this._selectionEvent)) {
                if (this._firstUpdate) {
                    LoadLibsAfterUpdate(this, this.$data, this._props);
                    this._firstUpdate = false;
                } else {
                    this.drawChart(this.$data, this._props);
                }
            }
        }
        onCustomWidgetResize(width, height) {
            var shadow = this.shadowRoot;
            this.$width = width + 'px';
            this.$height = height + 'px';
            let LoadLibsAfterResize = async function(host, data, props) {
                try {
                    await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
                    await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js", shadow);
                } catch (e) {
                    console.log(JSON.stringify(e));
                } finally {
                    host.drawChart(data, props);
                }
            };
            if (this._firstResize) {
                LoadLibsAfterResize(this, this.$data, this._props);
                this._firstResize = false;
            } else {
                this.drawChart(this.$data, this._props);
            }
        }
        connectedCallback() {
            var shadow = this.shadowRoot;
            var custelem = shadow.host;
            this.$width = custelem.parentNode.parentNode.parentNode.style.width;
            this.$height = custelem.parentNode.parentNode.parentNode.style.height;
            let LoadLibs = async function(host, data, props) {
                try {
                    await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-force.v1.min.js", shadow);
                    await host.loadScript("https://d3js.org/d3-scale.v1.min.js", shadow);
                    await host.loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js", shadow);
                } catch (e) {
                    console.log(JSON.stringify(e));
                } finally {
                    host.drawChart(data, props);
                }
            };
            LoadLibs(this, this.$data, this._props);
            this._init = false;
        }
        disconnectedCallback() {}
        updateSelectedLabel(label) {
            if (label == '') this._props.selectedLabel = undefined;
            else this._props.selectedLabel = label;
        }
        drawChart(value, config) {
            config.valDecimal = config.valDecimal + "";
            var r = this.shadowRoot;
            var _div = r.querySelector('div');
            _div.style.width = this.$width - 10;
            _div.style.height = this.$height;
            _div.innerHTML = '';
            let table = _div.appendChild(document.createElement("table"));
            table.setAttribute("class", "rootTable");
            table.setAttribute("cellspacing", "0");
            table.setAttribute("cellpadding", "0");
            table.setAttribute("border", "0");
            let tbody = table.appendChild(document.createElement("tbody"));
            let tabrow = tbody.appendChild(document.createElement("tr"));
            let chartRoot = tabrow.appendChild(document.createElement("td"));
            let buttonRoot = tabrow.appendChild(document.createElement("td"));
            let legendRoot = tabrow.appendChild(document.createElement("td"));
            var container = chartRoot.appendChild(document.createElement("div"));
            container.setAttribute("id", "chartContainer");
            container.setAttribute("class", "chartContainer");
            var button = buttonRoot.appendChild(document.createElement("button"));
            button.setAttribute("id", "button");
            button.setAttribute("class", "button");
            button.innerHTML = '«';
            var legend = legendRoot.appendChild(document.createElement("div"));
            legendRoot.setAttribute("id", "legendContainer");
            legendRoot.setAttribute("class", "legendContainerHidden");
            var fbchart = this.drawForceBubble(value, config, this.shadowRoot, this);
        }
        loadScript(src, shadowRoot) {
            return new Promise(function(resolve, reject) {
                let script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    console.log("Load: " + src);
                    resolve(script);
                };
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                shadowRoot.appendChild(script);
            });
        }
        d3ForceBubbleDefaultSettings() {
            return {
                leftMargin: 10,
                topMargin: 10,
                rightMargin: 10,
                bottomMargin: 10,
                legendMargin: 50,
                title: 'Custom Force Bubble Widget',
                showTitle: true,
                showAvg: true,
                showSearch: true,
                startColor: "#ffcd00",
                endColor: "#b01c02",
                sizeDecimal: 2,
                colorDecimal: 2,
                valDecimal: 2,
                xAxisLabel: "Value",
                sizeLabel: "Size",
                colorLabel: "Color",
                selectedLabel: undefined,
                selectedXValue: undefined,
                selectedSizeValue: undefined,
                selectedColorValue: undefined,
                data: []
            };
        }
        drawForceBubble(dataJSON, config, root, eventDispatcher) {
            var container = d3.select(root.querySelector('#chartContainer'));
            if (config == null) config = d3ForceBubbleDefaultSettings();
            try {
                config.data = JSON.parse(dataJSON);
            } catch (e) {
                container.append('div').attr('class', 'noData').append('p').text('No data to display.');
                d3.select(root.querySelector('#button')).style('display', 'none');
                d3.select(root.querySelector('#legendContainer')).style('display', 'none');
                return this;
            }
            if (dataJSON == '' || dataJSON == '""' || dataJSON == "''" || dataJSON == '[]' || dataJSON == '{}' || dataJSON == null || dataJSON == undefined) {
                container.append('div').attr('class', 'noData').append('p').text('No data to display.');
                d3.select(root.querySelector('#button')).style('display', 'none');
                d3.select(root.querySelector('#legendContainer')).style('display', 'none');
                return this;
            }
            config.data = _.filter(config.data, function(d) {
                return d.color != null && d.size != null && d.xvalue != null && d.color != undefined && d.size != undefined && d.xvalue != undefined;
            });
            if (config.data.length == 0) {
                container.append('div').attr('class', 'noData').append('p').text('No data to display.');
                d3.select(root.querySelector('#button')).style('display', 'none');
                d3.select(root.querySelector('#legendContainer')).style('display', 'none');
                return this;
            }
            d3.select(root.querySelector('#button')).on('click', function(d) {
                var arrow = root.querySelector('#button').innerHTML;
                if (arrow == '«') {
                    root.querySelector('#button').innerHTML = '»';
                    d3.select(root.querySelector('#legendContainer')).attr('class', 'legendContainer');
                } else {
                    root.querySelector('#button').innerHTML = '«';
                    d3.select(root.querySelector('#legendContainer')).attr('class', 'legendContainerHidden');
                }
            });
            var topBar = undefined;
            if (config.showTitle || config.showSearch) {
                topBar = container.append('div').attr('class', 'topBar').append('table').append('tr');
                topBar.append('td').append('div').attr('id', 'titleContainer');
                topBar.append('td').append('div').attr('id', 'searchContainer');
            }
            if (config.showSearch) {
                var searchcontainer = root.querySelector('#searchContainer');
                d3.select(searchcontainer).append('input').attr('id', 'searchfield').attr('type', 'search').attr("class", 'searchBar').attr("placeholder", "Search").on("keyup", function() {
                    var f = root.querySelector('#searchfield');
                    var q = f.value;
                    highlightBubbles(q.toUpperCase());
                }).on("search", function() {
                    var f = root.querySelector('#searchfield');
                    var q = f.value;
                    highlightBubbles(q.toUpperCase());
                });
            }
            if (config.showTitle) {
                var vis_t = root.querySelector('#titleContainer');
                d3.select(vis_t).append('text').text(config.title).attr('x', 0).attr('y', 0).attr("dy", "12px").attr("class", 'title');
            }
            var vis = container.append('div').attr('class', 'chartBody').style('height', (config.showTitle || config.showSearch) ? Math.max((container.style('height').replace("px", "") - 30), 125) + 'px' : container.style('height')).append("svg:svg").attr("id", 'svgContent').attr("width", "100%").attr("height", "100%");
            var width = vis.style("width").replace("px", "");
            var height = vis.style("height").replace("px", "");
            var w = width - config.leftMargin - config.rightMargin - 50,
                h = height - config.topMargin - config.bottomMargin;
            var formatSizeValue = d3.format(",." + config.sizeDecimal + "f"),
                formatColorValue = d3.format(",." + config.colorDecimal + "f"),
                formatValue = d3.format(",." + config.valDecimal + "f");
            var colorScale = [];
            colorScale.push(config.startColor);
            colorScale.push(config.endColor);
            var vis_g = vis.append('g').attr('transform', "translate(" + (config.leftMargin + 25) + ',' + (height / 2) + ")");
            vis_g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', w).attr('y2', 0).attr("stroke-width", 1).attr("stroke", "#444").attr("stroke-dasharray", "4 1");
            var nodes = config.data;
            var min_x = _.minBy(nodes, function(d) {
                return d.xvalue;
            }).xvalue;
            var max_x = _.maxBy(nodes, function(d) {
                return d.xvalue;
            }).xvalue;
            var mean_x = _.meanBy(nodes, function(d) {
                return d.xvalue;
            });
            var min_c = _.minBy(nodes, function(d) {
                return d.color;
            }).color;
            var max_c = _.maxBy(nodes, function(d) {
                return d.color;
            }).color;
            var min_s = _.minBy(nodes, function(d) {
                return d.size;
            }).size;
            var max_s = _.maxBy(nodes, function(d) {
                return d.size;
            }).size;
            var xScale = d3.scaleLinear().domain([min_x, max_x]).range([25, w - 25]);
            var cScale = d3.scaleLinear().domain([min_c, max_c]).range(colorScale);
            var zScale = d3.scaleLinear().domain([min_s, max_s]).range([5, 25]);
            var legendContainer = d3.select(root.querySelector('#legendContainer')).select('div').style('height', '100%').style('width', '100%').style('padding', '5px');
            legendContainer.append('div').attr('class', 'legendName').append('span').text(config.sizeLabel);
            let sizeLegend = legendContainer.append('div').attr('id', 'sizeLegend');
            legendContainer.append('div').attr('class', 'separator').style('height', '10px');
            legendContainer.append('div').attr('class', 'legendName').append('span').text(config.colorLabel);
            let colorLegend = legendContainer.append('div').attr('id', 'colorLegend');
            let sizeSVG = sizeLegend.append('svg').attr("width", 140).attr("height", 60);
            sizeSVG.append('circle').attr('cx', 30).attr('cy', 30).attr('r', 25).attr('stroke', '#999').style("fill", "rgba(255,255,255,0.0)");
            sizeSVG.append('circle').attr('cx', 30).attr('cy', 50).attr('r', 5).attr('stroke', '#999').style("fill", "rgba(255,255,255,0.0)");
            sizeSVG.append('line').attr('x1', 30).attr('y1', 5).attr('x2', 60).attr('y2', 5).attr('stroke', '#999').attr('stroke-width', 1).attr("stroke-dasharray", "2 1");
            sizeSVG.append('line').attr('x1', 30).attr('y1', 45).attr('x2', 60).attr('y2', 45).attr('stroke', '#999').attr('stroke-width', 1).attr("stroke-dasharray", "2 1");
            sizeSVG.append('text').attr('x', 65).attr('y', 8).text(formatSizeValue(max_s)).attr("font-family", "Arial, Helvetica, sans-serif").attr("font-size", "10px").attr("fill", "#999");
            sizeSVG.append('text').attr('x', 65).attr('y', 48).text(formatSizeValue(min_s)).attr("font-family", "Arial, Helvetica, sans-serif").attr("font-size", "10px").attr("fill", "#999");
            let colorSVG = colorLegend.append('svg').attr("width", 140).attr("height", 60);
            var linearGradient = colorSVG.append("defs").append("linearGradient").attr("id", "linear-gradient");
            linearGradient.append("stop").attr("offset", "0%").attr("stop-color", config.startColor);
            linearGradient.append("stop").attr("offset", "100%").attr("stop-color", config.endColor);
            colorSVG.append('rect').attr("x", 30).attr("y", 5).attr("width", 80).attr("height", 10).style("fill", "url(#linear-gradient)");
            colorSVG.append('text').attr('x', 30).attr('y', 30).text(formatColorValue(min_c)).attr("font-family", "Arial, Helvetica, sans-serif").attr("font-size", "10px").attr("fill", "#999").style('text-anchor', 'middle');
            colorSVG.append('text').attr('x', 110).attr('y', 30).text(formatColorValue(max_c)).attr("font-family", "Arial, Helvetica, sans-serif").attr("font-size", "10px").attr("fill", "#999").style('text-anchor', 'middle');
            var simulation = d3.forceSimulation(nodes).force('charge', d3.forceManyBody().strength(5)).force('x', d3.forceX().x(function(d) {
                return xScale(d.xvalue);
            })).force('y', d3.forceY().y(function(d) {
                return 0;
            })).force('collision', d3.forceCollide().radius(function(d) {
                return zScale(d.size);
            })).on('tick', ticked).on('end', addTooltip);

            function addTooltip() {
                for (var it = 0; it < nodes.length; it++) {
                    var b = root.querySelector("#bubble_" + it);
                    var tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title");
                    tooltip.innerHTML = nodes[it].name + '\n' + config.xAxisLabel + ': ' + formatValue(nodes[it].xvalue) + '\n' + config.sizeLabel + ': ' + formatSizeValue(nodes[it].size) + '\n' + config.colorLabel + ': ' + formatColorValue(nodes[it].color);
                    if (b.firstChild != null) b.removeChild(b.firstChild);
                    b.appendChild(tooltip);
                }
            }

            function ticked() {
                var u = vis_g.selectAll('circle').data(nodes);
                u.enter().append('circle').attr('r', function(d) {
                    return zScale(d.size);
                }).attr('class', 'circleDefault').attr('id', function(d, i) {
                    return 'bubble_' + i;
                }).style('fill', function(d) {
                    return cScale(d.color);
                }).on("mouseout", function(d, i) {
                    var c = root.querySelector('#bubble_' + i).getAttribute('class');
                    if (c == 'circleDefaultHover') {
                        root.querySelector('#bubble_' + i).setAttribute("class", 'circleDefault');
                    } else if (c == 'circleUnselecetdHover') {
                        root.querySelector('#bubble_' + i).setAttribute("class", 'circleUnselecetd');
                    }
                }).on("mouseover", function(d, i) {
                    var c = root.querySelector('#bubble_' + i).getAttribute('class');
                    if (c == 'circleDefault') {
                        root.querySelector('#bubble_' + i).setAttribute("class", 'circleDefaultHover');
                    } else if (c == 'circleUnselecetd') {
                        root.querySelector('#bubble_' + i).setAttribute("class", 'circleUnselecetdHover');
                    }
                }).on("click", function(d, i) {
                    if (config.selectedLabel == d.name) {
                        config.selectedLabel = undefined;
                        config.selectedXValue = undefined;
                        config.selectedSizeValue = undefined;
                        config.selectedColorValue = undefined;
                    } else {
                        config.selectedLabel = d.name;
                        config.selectedXValue = d.xvalue;
                        config.selectedSizeValue = d.size;
                        config.selectedColorValue = d.color;
                    }
                    eventDispatcher.dispatchEvent(new CustomEvent("propertiesChanged", {
                        detail: {
                            properties: {
                                selectedLabel: config.selectedLabel,
                                selectedXValue: config.selectedXValue,
                                selectedSizeValue: config.selectedSizeValue,
                                selectedColorValue: config.selectedColorValue
                            }
                        }
                    }));
                    var event = new Event("onSelect");
                    eventDispatcher.dispatchEvent(event);
                }).merge(u).attr('cx', function(d) {
                    return d.x;
                }).attr('cy', function(d) {
                    return d.y;
                });
                u.exit().remove();
            }
            if (config.showAvg) {
                vis_g.append('line').attr('x1', 0 + xScale(mean_x)).attr('y1', -50).attr('x2', 0 + xScale(mean_x)).attr('y2', 50).attr("stroke-width", 1).attr("stroke", "#888").style("stroke-dasharray", ("4, 4"));
                vis_g.append('text').text('Average: ' + formatValue(mean_x)).attr('x', 0 + xScale(mean_x)).attr('y', -65).attr("dy", "10px").attr("class", 'average').attr("text-anchor", "middle");
            }

            function highlightBubbles(_query) {
                if (_query.length == 0) {
                    nodes.forEach(function(d, i) {
                        root.querySelector('#bubble_' + i).setAttribute('class', 'circleDefault');
                    });
                } else {
                    nodes.forEach(function(d, i) {
                        var content = _.toUpper(d.name);
                        if (content.indexOf(_query) > -1) {
                            root.querySelector('#bubble_' + i).setAttribute('class', 'circleDefault');
                        } else {
                            root.querySelector('#bubble_' + i).setAttribute('class', 'circleUnselecetd');
                        }
                    });
                }
            }
            return this;
        }
    }
    customElements.define("com-gmail-cse-ari007-d3forcebubble", FBUBBLE);
})();