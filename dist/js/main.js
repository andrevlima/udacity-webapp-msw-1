let restaurants,neighborhoods,cuisines;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{registerServiceWorker(),fetchNeighborhoods(),fetchCuisines()}),registerServiceWorker=(()=>{"serviceWorker"in navigator?navigator.serviceWorker.register("/service_worker.js"):console.warn("Oops, seems your browser is not as soo good as Christopher Columbus")}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const s=document.createElement("option");s.innerHTML=e,s.value=e,t.append(s)})}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),google.maps.event.addListener(self.map,"idle",function(){let e=document.getElementsByTagName("iframe").item(0);e.title="Maps",e.setAttribute("aria-hidden","true")}),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),s=e.selectedIndex,r=t.selectedIndex,n=e[s].value,a=t[r].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(n,a,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),createRestaurantHTML=(e=>{const t=document.createElement("li");t.classList.add("restaurant-item");const s=document.createElement("img");s.className="restaurant-img",DBHelper.imageUrlForRestaurant(e,e=>s.src=e);let r=e.photograph_desc?e.photograph_desc:"ilustrative photo of the restaurant";s.alt=`Restaurant ${e.name}, ${r}`,t.append(s);const n=document.createElement("h3");n.innerHTML=e.name,t.append(n);const a=document.createElement("p");a.innerHTML=e.neighborhood,t.append(a);const o=document.createElement("p");o.innerHTML=e.address,t.append(o);const i=document.createElement("a");return i.classList.add("restaurant-more-details"),i.setAttribute("role","button"),i.innerHTML="View Details",i.setAttribute("aria-label","Restaurant "+e.name+", click to view details"),i.href=DBHelper.urlForRestaurant(e),t.append(i),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})});