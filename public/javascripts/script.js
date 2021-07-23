document.addEventListener("DOMContentLoaded", async function() {
  const provinces = await fetch("/api/provinces").then(res => res.json())
  
  const nav = document.getElementById("region-select")
  const detailsHeader = document.querySelector("#region-details h2")
  const detailsInfo = document.querySelector("#region-details p")
  const cityList = document.querySelector("#region-details ul")
  
  provinces.forEach(province => {
    const button = document.createElement("button")
    button.innerText = province.short
    button.classList.add("region-option")
    
    button.addEventListener("click", function() {
      [...nav.children].forEach(child => child.classList.remove("selected"))
      this.classList.add("selected")
      detailsHeader.innerText = province.name
      detailsInfo.innerHTML = `<h3>Capital</h3> ${province.capital}`;
      cityList.innerHTML = "";
      fetch(`api/cities/${province.name.toLowerCase()}`).then(res => {
        return res.json()
      }).then(cities => {
        cities.forEach(city => {
          let li = document.createElement('li')
          li.innerText = city.Municipality
           cityList.appendChild(li);
        })
      })
    })
    nav.appendChild(button)
  })
})