"use strict";

import PromptSync from "prompt-sync";
import { data } from "./mockData.js";

// Initialize the prompt function
const prompt = PromptSync();

const datingProfile = {};
const welcomeMessage =
  "Welcome to the Winc dating app! Please answer yes if you want to create a profile ";
let isNumber;
let isAdult;

const profileQuestions = [
  "What is your first name? ",
  "What is your last name? ",
  "What is your age? ",
  "What is you gender? (Choose from M, F or X) ",
  "What gender are you interested in? (Choose from M, F or X) ",
  "What is your location? (Choose from rural or city) ",
  "What is your minimum age interest? ",
  "What is your maximum age interest? ",
];

function addKeyToQuestions() {
  const questionKeys = Object.keys(data[0]);
  const profileQuestionsWithKeys = {};
  if (profileQuestions.length === questionKeys.length) {
    for (let i = 0; i < profileQuestions.length; i++) {
      profileQuestionsWithKeys[questionKeys[i]] = profileQuestions[i];
    }
    return profileQuestionsWithKeys;
  }
  console.log("The amount of questions and properties should be equal");
  return;
}

function isValidAnswer(answer, questionKey) {
  if (answer === "") {
    console.log("Enter a value, it cannot be empty");
  } else if (
    questionKey === "age" ||
    questionKey === "min_age_interest" ||
    questionKey === "max_age_interest"
  ) {
    if (isValidNumber(answer, questionKey)) {
      isNumber = true;
      return true;
    }
  } else if (!isNaN(Number(answer))) {
    console.log("Numbers are not allowed");
  } else if (questionKey === "gender" || questionKey === "gender_interest") {
    if (isValidGender(answer)) {
      return true;
    }
  } else if (questionKey === "location") {
    if (isValidLocation(answer)) {
      return true;
    }
  } else {
    return true;
  }
}

function isValidNumber(answer, questionKey) {
  const answerAsNumber = Number(answer);
  if (!isNaN(answerAsNumber)) {
    if (answerAsNumber >= 18) {
      if (
        questionKey === "max_age_interest" &&
        answerAsNumber <= datingProfile["min_age_interest"]
      ) {
        console.log(
          "The maximum interested age should be higher than the minimum interested age"
        );
      } else {
        return true;
      }
    } else {
      console.log("We have an age limit of 18 years and older");
      isAdult = false;
    }
  } else {
    console.log("Please enter a valid number");
  }
}

function isValidGender(answer) {
  if (answer === "M" || answer === "F" || answer == "X") {
    return true;
  } else {
    console.log("Gender (interest) can only be M, F or X");
  }
}

function isValidLocation(answer) {
  if (answer === "rural" || answer === "city") {
    return true;
  } else {
    console.log("Location can only be rural or city");
  }
}

export function createProfile() {
  const questions = addKeyToQuestions();
  const questionKey = Object.keys(questions);
  const questionValue = Object.values(questions);
  const createProfile = prompt(welcomeMessage);
  if (createProfile.toLowerCase().trim() === "yes") {
    for (let i = 0; i < questionKey.length; i++) {
      if (!isAdult && isAdult !== undefined) {
        break;
      }
      let answer = prompt(questionValue[i]);
      if (isValidAnswer(answer, questionKey[i])) {
        datingProfile[questionKey[i]] = isNumber ? Number(answer) : answer;
        isNumber = false;
      } else {
        i--;
      }
    }
  } else {
    console.log("No worries, feel free to create it anytime!");
  }
  return datingProfile;
}
