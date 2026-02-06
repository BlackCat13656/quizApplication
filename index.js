"use strict";

const url = "quiz.json";
const questions = [];
const cur = 0; // current question

window.addEventListener("DOMContentLoaded", () => {
  console.log("ready");
  loadQuestions();
});

function loadQuestions() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
