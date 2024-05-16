import users from './data/users.js';
import { getRandomUser, getUserData, getAverageStepGoalAllUsers } from '../src/userFunctions.js'
const allUsers = users.users
const welcomeBanner = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')
const userStepGoalDisplay = document.querySelector('.display-step-goal')
const averageStepDisplay = document.querySelector('.display-average-goal-steps')
const userIdAddressEmail = document.querySelector('.user-id-address-email')
const userStrideLength = document.querySelector('.user-stride-length')
const userDailySteps = document.querySelector('.user-daily-step-goal')

const averageStepGoal = getAverageStepGoalAllUsers(allUsers)

window.addEventListener('load', () => {
  updateRandomUserMessage(allUsers);
});

const displayUserGoal = (user) => {
  userStepGoalDisplay.innerText = `${user.dailyStepGoal}`
}

const displayAverageStepGoal = ( (averageStepGoal) => {
  averageStepDisplay.innerText = `${averageStepGoal}`
})

const updateRandomUserMessage = (user) => {
  const randomUser = getRandomUser(users)
  const user = getUserData(allUsers, randomUser.id)
  updateUserCard(user)
  updateUserMessage(randomUser);
}

const updateUserCard = (user) => {
  userIdAddressEmail.innerText = `ID: ${user.id}, Address: ${user.address}, Email: ${user.email}`
  userStrideLength.innerText = `Stride Length: ${user.strideLength}`
}

const updateUserMessage = (user) => {  
  welcomeBanner.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${user.name}</h1>
  </header>`;
};

export {
  displayUserGoal,
  displayAverageStepGoal,
  updateUserMessage
};