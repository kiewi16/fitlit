import { fetchUser } from './fetchData/userData.js'
import { fetchHydration } from './fetchData/hydrationData.js'
import { fetchSleep } from './fetchData/sleepData.js'
import { getRandomUser, getUserData, getAverageStepGoalAllUsers } from '../src/userFunctions.js'
import { getCurrentDayWaterConsumption, getConsumedWaterForWeek, getConsumedWaterDates } from '../src/hydration.js';
import { getHoursSleptForCurrentDay, getSleepHoursForWeek, getSleepDates } from './sleep.js';
import Chart from 'chart.js/auto';
const welcomeMessage = document.querySelector('.welcome-message');
const userStepGoalDisplay = document.getElementById('display-step-goal');
const averageStepDisplay = document.getElementById('display-average-goal-steps');
const userIdAddressEmail = document.querySelector('.user-id-address-email');
const userStrideLength = document.querySelector('.user-stride-length');
const userDailyHydration = document.getElementById('display-user-hydration-day');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');
const userSleepDay = document.getElementById('display-user-sleep-day');
const userWeeklySleepHours = document.getElementById('display-user-sleep-week');


window.addEventListener('load', () => {
  fetchUserData()
})

const updateUserGoal = (user) => {
  userStepGoalDisplay.innerText = `${user.dailyStepGoal} 👟`
}

const updateAverageSteps = (steps) => {
  averageStepDisplay.innerText = `${steps}`
}

const updateUserDailyHydration = (data,userId) => {
  userDailyHydration.innerText = `${getCurrentDayWaterConsumption(data,userId)} ounces 🥤`
}

const updateWeeklySleepData = (data,userId) => {
  userWeeklySleepHours.innerText = `${getSleepHoursForWeek(data,userId)}`
}

function fetchUserData() {
  Promise.all([fetchUser(), fetchHydration(), fetchSleep()]).then(e => {
    const userList = e[0].users
    const randomUser = getRandomUser(userList)
    const user = getUserData(userList, randomUser.id)
    updateUserCard(user)
    updateUserGoal(user)
    const friendsSteps = updatedUserFriends(user, userList)
    updateUserMessage(randomUser);
    updateAverageSteps(Math.round(friendsSteps))
    const AllHydrationData = e[1].hydrationData;
    updateUserDailyHydration(AllHydrationData,randomUser.id)
    const hydrationWeekWaterData = getConsumedWaterForWeek(AllHydrationData,randomUser.id)
    const hydrationWeekDateData = getConsumedWaterDates(AllHydrationData,randomUser.id)
    console.log("hydrationWeekDateData:", hydrationWeekDateData)
    const hydrationDayData = getCurrentDayWaterConsumption(AllHydrationData,randomUser.id)
    const allSleepData = e[2].sleepData
    const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,randomUser.id)
    console.log("sleepHoursWeekData:", sleepHoursWeekData)
    const sleepWeekDateData = getSleepDates(allSleepData,randomUser.id)
    console.log("sleepWeekDateData:", sleepWeekDateData)
    updateDailySleep(allSleepData, randomUser.id)
    updateWeeklySleepData(allSleepData, randomUser.id)
    
    new Chart(document.getElementById('sleepHoursWeekChart'), {
      type: 'bar',
      data: {
        labels: hydrationWeekDateData.map(date => `${date.getMonth()}/${date.getDate()}`),
        datasets: [{
          data: sleepHoursWeekData.map(hours => hours),
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
              text: 'Hours Slept'
            }
          },
          x: {
            display: true,
            title: {
              display: true,
              text: `Week: ${hydrationWeekDateData[0].getMonth()}/${hydrationWeekDateData[0].getDate()} - ${hydrationWeekDateData[6].getMonth()}/${hydrationWeekDateData[6].getDate()}`
            }
          },
        }
      }
    });

    new Chart(document.getElementById('hydrationWeekChart'), {
      type: 'bar',
      data: {
        labels: hydrationWeekDateData.map(date => `${date.getMonth()}/${date.getDate()}`),
        datasets: [{
          data: hydrationWeekWaterData.map(ounces => ounces),
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
              text: `Week: ${hydrationWeekDateData[0].getMonth()}/${hydrationWeekDateData[0].getDate()} - ${hydrationWeekDateData[6].getMonth()}/${hydrationWeekDateData[6].getDate()}`
            }
          }
        }
      }
    });
    new Chart(document.getElementById('hydrationDayChart'), {
      type: 'doughnut',
      data: {
        labels: [`Day: ${hydrationWeekDateData[0].getMonth()}/${hydrationWeekDateData[0].getDate()}, Water Consumption: ${hydrationDayData} fl oz`],
        datasets: [{
          label: 'Fluid Ounces',
          data: [hydrationDayData, 30],
          backgroundColor: [
            'rgba(39, 76, 245, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
         borderColor: [
            'rgba(39, 76, 245, 0.8)',
            'rgba(0, 0, 0, 0.2)'
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
  })
}

function updatedUserFriends(user, users) {
  let sortedFriends = user.friends.sort((a,b)=> a-b)
  let friendsStepGoals = sortedFriends.map(friend => {
    const singleUser = users.filter(user => user.id === friend)
    return singleUser[0].dailyStepGoal
  })
  let friendsTotal = friendsStepGoals.reduce((total,friend) => {
    total+= friend
    return total;
  },0)
  for (var i = 0; i < user.friends.length; i++) {
    friendsWrapper.innerHTML += `<div class="user-friend"> id: ${sortedFriends[i]}
    <p class="display-user-friend" id="${i}">${friendsStepGoals[i]}</p></div>`
  }
  return friendsTotal / friendsStepGoals.length;
}

function updateUserCard(user) {
  userIdAddressEmail.innerText = `ID: ${user.id}, Address: ${user.address}, Email: ${user.email}`
  userStrideLength.innerText = `Stride Length: ${user.strideLength}`
}

const updateUserMessage = (user) => {  
  welcomeMessage.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${user.name}</h1>
  </header>`;
  userInfo.innerText = `${user.name}'s Info`
};

const updateDailySleep = (user, userId) => {
  userSleepDay.innerText = `${getHoursSleptForCurrentDay(user, userId)}`
}

export {
  updateUserGoal,
  updateAverageSteps,
  updateUserMessage,
  // updateUserDailyHydration, 
  updateDailySleep
};

