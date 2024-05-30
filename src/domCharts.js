import Chart from 'chart.js/auto';

function createSleepHoursAverageChart(data) {
  new Chart(document.getElementById('sleepHoursAverageChart'), {
    type: 'doughnut',
    data: {
      labels: [`Average Hours Slept: ${data} hours`],
      datasets: [{
        label: 'Sleep Quality',
        data: [+data, 2],
        backgroundColor: [
          'rgba(213, 184, 255)',
          'rgba(180, 153, 180, 0.3)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        }
      }
    }     
  });
}

function createSleepQualityAverageChart(data) {
  new Chart(document.getElementById('sleepQualityAverageChart'), {
    type: 'doughnut',
    data: {
      labels: [`Average Sleep Quality: ${data}/5`],
      datasets: [{
        label: 'Sleep Quality',
        data: [+data, 2],
        backgroundColor: [
          'rgba(213, 184, 255)',
          'rgba(180, 153, 180, 0.3)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        }
      }
    }     
  });
}

function createSleepQualityDailyChart(data, dates) {
  new Chart(document.getElementById('sleepQualityDailyChart'), {
    type: 'doughnut',
    data: {
      labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Sleep Quality: ${data[0]}/5`],
      datasets: [{
        label: 'Sleep Quality',
        data: [data[0], 2],
        backgroundColor: [
          'rgba(213, 184, 255)',
          'rgba(180, 153, 180, 0.3)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        }
      }
    }     
  });
}

function createSleepHoursDailyChart(data, dates) {
  new Chart(document.getElementById('sleepHoursDailyChart'), {
    type: 'doughnut',
    data: {
      labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Hours Slept: ${data} hours`],
      datasets: [{
        label: 'Hours Slept',
        data: [data, 3],
        backgroundColor: [
          'rgba(213, 184, 255)',
          'rgba(180, 153, 180, 0.3)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        }
      }
    }     
  });
}

function createSleepHoursAndQualityWeekChart(data, dates) {
  new Chart(document.getElementById('sleepHoursandQualityWeekChart'), {
    type: 'bar',
    data: {
      labels: dates.map(date => `${date.getMonth() + 1}/${date.getDate()}`),
      datasets: [{
        data: data.map(hours => hours),
        backgroundColor: 'rgba(213, 184, 255)'
      },
      {
        data: data.map(quality => quality),
        backgroundColor: 'rgb(147,112,219)', 
      }
    ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
                const datasetIndex = context.datasetIndex;
                let label = '';
              if (datasetIndex === 0 && !label) {
                label = context.dataset.label || 'Hours Slept';
              } else if (datasetIndex === 1 && !label) {
                label = context.dataset.label || 'Sleep Quality';
              }
              if (label) {
                label += ': ';
              }
              if (context.parsed.y!== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          display: true,
          title: {
            display: true,
            text: 'Hours Slept and Sleep Quality'
          }
        },
        x: {
          display: true,
          title: {
            display: true,
            text: `Week: ${dates[0].getMonth() + 1}/${dates[0].getDate()} - ${dates[6].getMonth() + 1}/${dates[6].getDate()}`
          }
        },
      }
    }
  });
} 

function createStepCharts(user, friendsSteps) {
  new Chart(document.getElementById('user-step-goal-chart'), {
    type: 'doughnut',
    data: {
      labels: [`Daily Step Goal: ${user.dailyStepGoal}`],
      datasets: [{
        label: 'Step Goal',
        data: [`${user.dailyStepGoal}`,3000],
        backgroundColor: [
          'rgba(0,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      circumference: 180,
      rotation: 270,
      aspectRatio: 1.5,
      cutout: '80%',
      plugins: {
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        },
      }
    },
  });
  new Chart(document.getElementById('user-friends-average-goal-chart'), {
    type: 'doughnut',
    data: {
      labels: [`Average Friend's Step Goal: ${Math.round(friendsSteps)}`],
      datasets: [{
        label: 'Step Goal',
        data: [`${Math.round(friendsSteps)}`,3000],
        backgroundColor: [
          'rgba(0,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      circumference: 180,
      rotation: 270,
      aspectRatio: 1.5,
      cutout: '80%',
      plugins: {
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        },
      }
    },
  });
}

function createHydrationDayChart(data,dates) {
  new Chart(document.getElementById('hydrationDayChart'), {
    type: 'doughnut',
    data: {
      labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Water Consumption: ${data} fl oz`],
      datasets: [{
        label: 'Fluid Ounces',
        data: [data, 30],
        backgroundColor: [
          'rgba(39, 76, 245, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      aspectRatio: 2,
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        }
      }
    }     
  });
}

function createHydrationWeekChart(data, dates) {
  new Chart(document.getElementById('hydrationWeekChart'), {
    type: 'bar',
    data: {
      labels: dates.reverse().map(date => `${date.getMonth() + 1}/${date.getDate()}`),
      datasets: [{
        data: data.map(ounces => ounces),
        backgroundColor: 'rgba(39, 76, 245, 0.8)'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          display: true,
          title: {
            display: true,
            text: 'Fluid Ounces'
          }
        },
        x: {
          display: true,
          title: {
            display: true,
            text: `Week: ${dates[0].getMonth() + 1}/${dates[0].getDate()} - ${dates[6].getMonth() + 1}/${dates[6].getDate()}`
          }
        }
      }
    }
  });
}


function createFriendChart(id, friendIds, friendSteps, i) {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: [`${friendIds[i]}`],
      datasets: [{
        label: 'Step Goal',
        data: [`${friendSteps[i]}`,3000],
        backgroundColor: [
          'rgba(0,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
        ]
      }]
    },
    options: {
      circumference: 180,
      rotation: 270,
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        },
      }
    },
  })
}

export {
    createFriendChart,
    createSleepHoursAverageChart,
    createSleepQualityAverageChart,
    createSleepQualityDailyChart,
    createSleepHoursDailyChart,
    createSleepHoursAndQualityWeekChart,
    createStepCharts,
    createHydrationWeekChart,
    createHydrationDayChart
}