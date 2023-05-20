const btn = document.querySelector(".drug-query-btn")

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
      console.log(`SUBSTANCE NAME: ${data.substances[0].name}`);
      console.log(`ADMINISTRATE: ${data.substances[0].roas[0].name}`);
      console.log(`THRESHHOLD: ${data.substances[0].roas[0].dose}`);
      console.log(data.substances[0].roas[0].dose)
      createTable(data)
    })
    .catch((error) => {
      console.error(error);
    });
}

function createTable(data) {
  var table = $('<table>');
  var headerRow = $('<tr>');

  // Create table headers
  headerRow.append('<th>Name</th>');
  headerRow.append('<th>Effects</th>');
  table.append(headerRow);

  // Create table rows
  data.substances.forEach(function (substance) {
    var row = $('<tr>');
    row.append('<td>' + substance.name + '</td>');

    var effectsCell = $('<td>');
    substance.effects.forEach(function (effect) {
      effectsCell.append('<a href="' + effect.url + '">' + effect.name + '</a><br>');
    });
    row.append(effectsCell);

    table.append(row);
  });

  // Append the table to the container element
  $('#dataContainer').append(table);
}