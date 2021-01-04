(this.webpackJsonpstrategybuilder=this.webpackJsonpstrategybuilder||[]).push([[0],[,,,function(e,t,a){e.exports={CalculatedStints:"calculatedStints_CalculatedStints__2pRRF",Compound:"calculatedStints_Compound__3uBrb",Details:"calculatedStints_Details__3TSge",row:"calculatedStints_row__rfLct",warning:"calculatedStints_warning__HaADc",safe:"calculatedStints_safe__94Jst"}},,,,function(e,t,a){e.exports={Compound:"Compound_Compound___92da",formRow:"Compound_formRow__yDRrC"}},function(e,t,a){e.exports={RaceData:"raceData_RaceData__2LpJn",formRow:"raceData_formRow__1kpYl"}},,function(e,t,a){e.exports={CalculatedStrategy:"calculatedStrategies_CalculatedStrategy__37J7R",stintrow:"calculatedStrategies_stintrow__1zeTd"}},,function(e,t,a){e.exports={CompoundRow:"FormSetup_CompoundRow__1OeAi"}},function(e,t,a){e.exports={Layout:"Layout_Layout__9siPd"}},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a(1),r=a.n(s),i=a(11),o=a.n(i),c=(a(19),a(20),a(2)),u=a(4),d=a(6),l=a(5),p=function e(t,a,n,s,r,i){Object(c.a)(this,e),this.TyreName=t,this.BoxLap=a,this.Weight=n,this.Fuel=s,this.Compound=r,this.StintLength=i},h=function e(){var t=this;Object(c.a)(this,e),this.Stints=[],this.WeightFactor=1,this.strategyWeight=function(){var e=0;return t.Stints.forEach((function(t){e+=t.weight})),e*t.WeightFactor}},m=a(3),f=a.n(m),j=function(e){var t=[];return t.push(f.a.row),0===parseInt(e.stint.Compound.minLaps-e.stint.StintLength)?t.push(f.a.warning):t.push(f.a.safe),Object(n.jsxs)("div",{className:f.a.CalculatedStints,children:[Object(n.jsx)("div",{className:f.a.Compound,children:e.stint.TyreName}),Object(n.jsxs)("div",{className:f.a.Details,children:[Object(n.jsxs)("div",{className:f.a.row,children:[Object(n.jsx)("p",{children:"Box Lap:"}),Object(n.jsx)("span",{children:e.stint.BoxLap})]}),Object(n.jsxs)("div",{className:f.a.row,children:[Object(n.jsx)("p",{children:"Fuel: "}),Object(n.jsx)("span",{children:e.stint.Fuel})]}),Object(n.jsxs)("div",{className:t.join(" "),children:[Object(n.jsx)("p",{children:"Diff. Tyre Laps: "}),Object(n.jsx)("span",{children:e.stint.Compound.minLaps-e.stint.StintLength})]}),Object(n.jsxs)("div",{className:f.a.row,children:[Object(n.jsx)("p",{children:"Stint Laps:"}),Object(n.jsx)("span",{children:e.stint.StintLength})]})]})]})},C=a(10),b=a.n(C),S=function(e){var t=e.strategy.Stints.map((function(e){return Object(n.jsx)(j,{stint:e},Date.now())}));return Object(n.jsxs)("div",{className:b.a.CalculatedStrategy,children:[Object(n.jsx)("h2",{children:"Calculated Strategy: "}),Object(n.jsx)("div",{className:b.a.stintrow,children:t})]})},v=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).definedCompounds=e.props.definedCompounds,e.raceStats=parseInt(e.props.raceStats),e.state={raceStrategies:[]},e.usedCompounds=[],e.currentStrategy=null,e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.definedCompounds!==e.definedCompounds&&(this.definedCompounds=this.props.definedCompounds,this.raceStats=this.props.raceStats,this.calculateRaceStrategies())}},{key:"calculateRaceStrategies",value:function(){if(this.definedCompounds.length>0){var e=this.calculateStrategyStints(new h),t=this.state.raceStrategies;t.push(e),this.setState({raceStrategies:t})}}},{key:"calculateStrategyStints",value:function(e){for(var t=0;t<this.raceStats.raceLaps;){var a=parseInt(this.raceStats.raceLaps)-t,n=Math.ceil(a/this.raceStats.fuelLaps),s=(a/n).toFixed(2);console.log("remainingLaps: "+a),console.log("remainingStints: "+n),console.log("optimalStintLaps: "+s);var r=this.findOptimalCompound(s,this.raceStats.fuelLaps);r?(console.log("compound determined: "+r.tyreType.name),e.Stints.push(new p(r.tyreType.name,t,r.speedFactor,10,r,this.getStintLaps(t,r))),t+=r.minLaps>this.raceStats.fuelLaps?this.raceStats.fuelLaps:r.minLaps,this.updateCompoundUsage(r),console.log("used compounds"),console.log(this.usedCompounds)):t=this.raceStats.raceLaps}return e}},{key:"getStintLaps",value:function(e,t){return this.raceStats.raceLaps-e>t.minLaps?t.minLaps>this.raceStats.fuelLaps?this.raceStats.fuelLaps:t.minLaps:this.raceStats.raceLaps-e}},{key:"findOptimalCompound",value:function(e,t){var a=this,n=[],s=e>t?t:e;return console.log("compoundMinLaps:"+s),this.definedCompounds.forEach((function(e){a.canCompoundBeUsed(e)&&e.minLaps>=s&&n.push(e)})),0===n.length&&this.definedCompounds.forEach((function(e){a.canCompoundBeUsed(e)&&n.push(e)})),n.sort((function(e,t){return e.tyreType.speedFactor-t.tyreType.speedFactor}))[0]}},{key:"compoundsAvailable",value:function(){var e=this;return this.definedCompounds.some((function(t){return e.canCompoundBeUsed(t)}))}},{key:"updateCompoundUsage",value:function(e){if(0===this.usedCompounds.length)this.usedCompounds.push({compoundId:e.id,used:1});else{var t=this.usedCompounds.find((function(t){return parseInt(t.compoundId)===parseInt(e.id)}));t?(t.used+=1,this.usedCompounds.slice(this.usedCompounds.findIndex((function(t){return parseInt(t.compoundId)===parseInt(e.id)})),1,t)):this.usedCompounds.push({compoundId:e.id,used:1})}}},{key:"canCompoundBeUsed",value:function(e){if(0===this.usedCompounds.length)return!0;var t=this.usedCompounds.find((function(t){return parseInt(t.compoundId)===parseInt(e.id)}));return!t||t.used<e.available}},{key:"renderCalculatedStints",value:function(){return this.state.raceStrategies.length>0?this.state.raceStrategies.map((function(e){return Object(n.jsx)(S,{strategy:e},Date.now)})):Object(n.jsx)("p",{children:"provide data"})}},{key:"render",value:function(){return this.renderCalculatedStints()}}]),a}(s.Component),x=function e(t,a){Object(c.a)(this,e),this.name=t,this.speedFactor=a},y=a(7),O=a.n(y),g=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).tyreNames=["Ultra-Soft","Super-Soft","Soft","Medium","Hard","Inter","Full-Wet"],s.state={tyreTypes:[],setCompound:{id:s.props.id,tyreType:"",maxLaps:0,minLaps:0,available:0},isSet:!1},s.initializeTyreTypes=function(){for(var e=[],t=0;t<s.tyreNames.length;t++)e.push(new x(s.tyreNames[t],t));return e},s.getTyreOptions=function(){return s.state.tyreTypes.map((function(e){return Object(n.jsx)("option",{value:e.name,children:e.name},e.name)}))},s.setMaxLapsHandler=function(e){e.preventDefault();var t=s.state.setCompound;t.maxLaps=parseInt(e.target.value),s.setState({setCompound:t}),s.setState({isSet:!0})},s.setMinLapsHandler=function(e){e.preventDefault();var t=s.state.setCompound;t.minLaps=parseInt(e.target.value),s.setState({setCompound:t}),s.setState({isSet:!0})},s.setTyreTypeHandler=function(e){e.preventDefault();var t=s.state.setCompound;t.tyreType=s.state.tyreTypes.find((function(t){return t.name===e.target.value})),s.setState({setCompound:t}),s.setState({isSet:!0})},s.setAvailableCompoundsHandler=function(e){e.preventDefault();var t=s.state.setCompound;t.available=parseInt(e.target.value),s.setState({setCompound:t}),s.setState({isSet:!0})},s.state.tyreTypes=s.initializeTyreTypes(),s}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:O.a.Compound,children:[Object(n.jsx)("select",{name:"compounds",onChange:function(t){return e.setTyreTypeHandler(t)},children:this.getTyreOptions()}),Object(n.jsxs)("div",{className:O.a.formRow,children:[Object(n.jsx)("label",{children:"Max Laps:"}),Object(n.jsx)("input",{type:"text",placeholder:"MaxLaps",onChange:function(t){return e.setMaxLapsHandler(t)}})]}),Object(n.jsxs)("div",{className:O.a.formRow,children:[Object(n.jsx)("label",{children:"Min Laps:"}),Object(n.jsx)("input",{type:"text",placeholder:"MinLaps",onChange:function(t){return e.setMinLapsHandler(t)}})]}),Object(n.jsxs)("div",{className:O.a.formRow,children:[Object(n.jsx)("label",{children:"Available:"}),Object(n.jsx)("input",{type:"text",placeholder:"Available",onChange:function(t){return e.setAvailableCompoundsHandler(t)}})]}),this.state.isSet?Object(n.jsx)("button",{onClick:function(){e.setState({isSet:!1}),e.props.setCompound(e.state.setCompound)},children:"Set"}):Object(n.jsx)("button",{disabled:!0,children:"Set"}),Object(n.jsx)("button",{children:"Remove"})]})}}]),a}(s.Component),L=a(8),_=a.n(L),w=function(e){return Object(n.jsxs)("div",{className:_.a.RaceData,children:[Object(n.jsxs)("div",{className:_.a.formRow,children:[Object(n.jsx)("label",{children:"Max Fuel Laps:"}),Object(n.jsx)("input",{type:"text",placeholder:"Max Fuel Laps",onChange:function(t){return e.fuelLaps(t)}})]}),Object(n.jsxs)("div",{className:_.a.formRow,children:[Object(n.jsx)("label",{children:"Race Laps:"}),Object(n.jsx)("input",{type:"text",placeholder:"Race Laps",onChange:function(t){return e.raceLaps(t)}})]})]})},T=a(12),R=a.n(T),k=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(c.a)(this,a);for(var s=arguments.length,r=new Array(s),i=0;i<s;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={raceStats:{fuelLaps:0,raceLaps:0},definedCompounds:[]},e.fuelLapsHandler=function(t){t.preventDefault();var a=e.state.raceStats;a.fuelLaps=parseInt(t.target.value),e.setState({raceStats:a})},e.raceLapsHandler=function(t){t.preventDefault();var a=e.state.raceStats;a.raceLaps=parseInt(t.target.value),e.setState({raceStats:a})},e.addCompoundHandler=function(t){var a=e.state.definedCompounds,n=a.find((function(e){return e.id===t.id}));if(n){var s=a.indexOf(n);a.splice(s,1,t),e.setState({definedCompounds:a})}else console.log("element not found: "+t)},e.createCompoundHandler=function(){var t=e.state.definedCompounds;t.push({id:Date.now(),tyreType:"",maxLaps:0,minLaps:0}),e.setState({definedCompounds:t})},e.renderCompounds=function(){return e.state.definedCompounds.map((function(t){return Object(n.jsx)(g,{id:t.id,setCompound:e.addCompoundHandler},t.id)}))},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{children:[Object(n.jsx)(w,{fuelLaps:this.fuelLapsHandler,raceLaps:this.raceLapsHandler}),Object(n.jsx)("button",{onClick:this.createCompoundHandler,children:"Add Compound"}),Object(n.jsx)("div",{className:R.a.CompoundRow,children:this.renderCompounds()}),Object(n.jsx)("button",{onClick:function(t){return e.props.calculateClick(t,e.state)},children:"Calculate"})]})}}]),a}(s.Component),N=a(13),D=a.n(N),I=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={raceStats:{},definedCompounds:[]},e.calculateClickHandler=function(t,a){t.preventDefault(),e.setState({raceStats:a.raceStats,definedCompounds:a.definedCompounds})},e}return Object(u.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:D.a.Layout,children:[Object(n.jsx)("h1",{children:"Strategy Builder"}),Object(n.jsx)(k,{calculateClick:this.calculateClickHandler}),Object(n.jsx)(v,{raceStats:this.state.raceStats,definedCompounds:this.state.definedCompounds})]})}}]),a}(s.Component);var H=function(){return Object(n.jsx)(I,{})};o.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(H,{})}),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.4f686ce9.chunk.js.map