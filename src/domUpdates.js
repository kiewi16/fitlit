import users from './data/users.js';
import {getRandomUser, getUserData} from '../src/userFunctions.js'
const allUsers = users.users
const userMessageInfo = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')
const userIdAddressEmail = document.querySelector('.user-id-address-email')
const userStrideLength = document.querySelector('.user-stride-length')
const userDailySteps = document.querySelector('.user-daily-step-goal')


window.addEventListener('load', () => {
  updateRandomUserMessage(allUsers);
});

const retrieveRandomUser = (users) => {
  const user = getRandomUser(users);
  return user
}

const retrieveRandomUserData = (randomUser) => {
const user = getUserData(allUsers,randomUser.id)
return user
}

const displayUserGoal = (user) => {
  userStepGoalDisplay.innerText = `${user.dailyStepGoal}`
}

const displayAverageSteps = (user) => {
  averageStepDisplay.innerText = `${}`
}

const updateRandomUserMessage = (user) => {
  updateUserCard(user)
  updateUserMessage(randomUser);
}

const updateUserCard = (user) => {
  userIdAddressEmail.innerText = `ID: ${user.id}, Address: ${user.address}, Email: ${user.email}`
  userStrideLength.innerText = `Stride Length: ${user.strideLength}`
}

const updateUserMessage = (user) => {  
  userMessageInfo.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${user.name}</h1>
  </header>`;
};

export {
  displayUserGoal,
  displayAverageSteps,
  updateUserMessage
};