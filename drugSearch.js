const btn = document.querySelector(".drug-query-btn")
const title = document.querySelector(".drug-table-title")
const roasElement = document.querySelector(".roas")
const ddbtn = document.querySelector(".dropdown-btn")

function setUnit(element, value) {
  const selected = document.querySelector(`.${element}-unit`)
  if (value.includes("undefined")) {
    selected.textContent = " "
  } else {
    selected.textContent = value
  }

}


btn.addEventListener("click", () => {
  queryAPI()
})


function queryAPI() {
  const searchTerm = document.querySelector(".drug-search-input").value
  // const searchTerm = "heroin"
  const query = `
  {
    substances(query: "${searchTerm}") {
      name
      roas {
        name
        dose {
          units
          threshold
          heavy
          common {
            min
            max
          }
          light {
            min
            max
          }
          strong {
            min
            max
          }
        }
        duration {
          afterglow {
            min
            max
            units
          }
          comeup {
            min
            max
            units
          }
          duration {
            min
            max
            units
          }
          offset {
            min
            max
            units
          }
          onset {
            min
            max
            units
          }
          peak {
            min
            max
            units
          }
          total {
            min
            max
            units
          }
        }
        bioavailability {
          min
          max
        }
      }
      effects {
        name
        url
      }
    }
  }
`;

  axios({
    url: 'https://api.psychonautwiki.org/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: query,
    },
  })
    .then((response) => {
      const data = response.data.data
      const route = data.substances[0].roas[0]
      const unit = route.dose.units

      title.textContent = data.substances[0].name

      console.log(route)

      setUnit("threshold", `${route.dose.threshold}${unit}`)
      setUnit("light", `${route.dose.light.min}${unit} - ${route.dose.light.max}${unit}`)
      setUnit("common", `${route.dose.common.min}${unit} - ${route.dose.common.max}${unit}`)
      setUnit("strong", `${route.dose.strong.min}${unit} - ${route.dose.strong.max}${unit}`)
      setUnit("heavy", `${route.dose.heavy}${unit}`)
      setUnit("total", `${route.duration.total.min} ${route.duration.total.units} - ${route.duration.total.max} ${route.duration.total.units}`)
      setUnit("onset", `${route.duration.onset.min} ${route.duration.onset.units} - ${route.duration.onset.max} ${route.duration.onset.units}`)
      setUnit("comeup", `${route.duration.comeup.min} ${route.duration.comeup.units} - ${route.duration.comeup.max} ${route.duration.comeup.units}`)
      setUnit("peak", `${route.duration.peak.min} ${route.duration.peak.units} - ${route.duration.peak.max} ${route.duration.peak.units}`)
      setUnit("offset", `${route.duration.offset.min} ${route.duration.offset.units} - ${route.duration.offset.max} ${route.duration.offset.units}`)
      setUnit("after", `${route.duration.afterglow?.min} ${route.duration.afterglow?.units} - ${route.duration.afterglow?.max} ${route.duration.afterglow?.units}`)

      console.log()
      const element = document.querySelector(".roas")

      let index = 0

      const roaElements = data.substances[0].roas.map((roa) => {
        const str = roa.name;
        const name = str.charAt(0).toUpperCase() + str.slice(1);
        const i = index
        index++
        return `<div class="table-row"><div onclick="dropDown(${i})" class="table-header dropdown-btn">${name}</div></div>`
      })

      console.log(roaElements)

      element.innerHTML = roaElements.join(" ")

    })
    .catch((error) => {
      console.error(error);
    });
}