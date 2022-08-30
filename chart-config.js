const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const d = new Date();
let weekDay = week[d.getDay()]

function dynamicBackground() {
  const softRed = 'hsl(10, 79%, 65%)'
  const cyan = 'hsl(186, 34%, 60%)'
  switch (weekDay) {
    case 'mon':
      return [cyan, softRed, softRed, softRed, softRed, softRed, softRed]
      break
    case 'tue':
      return [softRed, cyan, softRed, softRed, softRed, softRed, softRed]
      break
    case 'wed':
      return [softRed, softRed, cyan, softRed, softRed, softRed, softRed]
      break
    case 'thu':
      return [softRed, softRed, softRed, cyan, softRed, softRed, softRed]
      break
    case 'fri':
      return [softRed, softRed, softRed, softRed, cyan, softRed, softRed]
      break
    case 'sat':
      return [softRed, softRed, softRed, softRed, softRed, cyan, softRed]
      break
    case 'sun':
      return [softRed, softRed, softRed, softRed, softRed, softRed, cyan]
      break
  }
}

function dynamicHover() {
  const softRed = 'hsl(10, 79%, 65%, 0.705)'
  const cyan = 'hsla(186, 34%, 60%, 0.705)'
  switch (weekDay) {
    case 'mon':
      return [cyan, softRed, softRed, softRed, softRed, softRed, softRed]
      break
    case 'tue':
      return [softRed, cyan, softRed, softRed, softRed, softRed, softRed]
      break
    case 'wed':
      return [softRed, softRed, cyan, softRed, softRed, softRed, softRed]
      break
    case 'thu':
      return [softRed, softRed, softRed, cyan, softRed, softRed, softRed]
      break
    case 'fri':
      return [softRed, softRed, softRed, softRed, cyan, softRed, softRed]
      break
    case 'sat':
      return [softRed, softRed, softRed, softRed, softRed, cyan, softRed]
      break
    case 'sun':
      return [softRed, softRed, softRed, softRed, softRed, softRed, cyan]
      break
  }
}

function updateChart() {
  async function fetchData() {
    const url = './data.json'
    const response = await fetch(url)
    const values = await response.json()

    return values
  }
  
  fetchData().then(values => {
    const day = values.map((i) => {
      return i.day
    })
    const amount = values.map((i) => {
      return i.amount
    })
   
    myChart.config.data.labels = day
    myChart.config.data.datasets[0].data = amount
    myChart.update()
  })
}

updateChart()


function updateData(array) {
  myChart.config.data.datasets[0].data = array
}

const labelChart = 'Spending'
let data = {
  labels: [],
  datasets: [{
    backgroundColor: dynamicBackground(),
    hoverBackgroundColor: dynamicHover(),
    label: labelChart,
    data: [],
    borderRadius: 5,
  }]
};

// tooltip
const titleTooltip = (tooltipItems) => {
  return ''
}

const labelTooltip = (context) => {
  let label = ''
  if (context.parsed.y !== null) {
      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
  }
  return label
}

let config = {
  type: 'bar',
  data: data,
  options: {
    plugins: {
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        titleMarginBottom: 0,
        callbacks: {
          title: titleTooltip,
          label: labelTooltip
        }
      },
      legend: {
          display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);