import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i as a}from"./assets/vendor-ceb9b81e.js";const i=document.querySelector("#datetime-picker"),t=document.querySelector("#start-btn"),o=document.querySelector(".timer");let r;const w={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(e[0]<Date.now()){u(),t.disabled=!0;return}r=e[0],t.disabled=!1}};y(i,w);t.addEventListener("click",()=>{if(Date.now()>=r){u(),t.disabled=!0;return}const e=setInterval(()=>{r-Date.now()<1e3&&S(e),T()},1e3);g(),t.disabled=!0,i.disabled=!0});function S(e){clearInterval(e),t.disabled=!1,i.disabled=!1,b()}function u(){a.show({message:"Please choose a date in the future",color:"red",timeout:5e3,displayMode:"replace",position:"topRight"})}function g(){a.show({message:"Timer is on. Please note: you cannot change timer while it is working",color:"yellow",timeout:5e3,displayMode:"replace",position:"topRight"})}function b(){a.show({message:"Time is up! Set a new timer!",color:"green",timeout:5e3,displayMode:"replace",position:"topRight"})}function M(e){const m=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),p=Math.floor(e%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:h,seconds:p}}function T(){const e=M(r-Date.now()),{days:s,hours:c,minutes:d,seconds:l}=e;o.querySelector("[data-days]").textContent=n(s),o.querySelector("[data-hours]").textContent=n(c),o.querySelector("[data-minutes]").textContent=n(d),o.querySelector("[data-seconds]").textContent=n(l)}function n(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map