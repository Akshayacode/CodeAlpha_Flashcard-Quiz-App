// =====================
// DEFAULT FLASHCARDS
// =====================

let flashcards =
JSON.parse(localStorage.getItem("flashcards")) || [

{
question:"What is HTML?",
answer:"HyperText Markup Language",
category:"Programming"
},

{
question:"What is CSS?",
answer:"Cascading Style Sheets",
category:"Programming"
},

{
question:"What is Machine Learning?",
answer:"A subset of AI that learns from data",
category:"AI/ML"
},

{
question:"What is Binary Search?",
answer:"A searching algorithm with O(log n)",
category:"DSA"
},

{
question:"Capital of India?",
answer:"New Delhi",
category:"General Knowledge"
}

];

// =====================
// DATA
// =====================

let currentIndex = 0;

let filteredCards = [...flashcards];

let cardsStudied =
Number(localStorage.getItem("cardsStudied")) || 0;

let correctAnswers =
Number(localStorage.getItem("correctAnswers")) || 0;

let wrongAnswers =
Number(localStorage.getItem("wrongAnswers")) || 0;

let quizScore =
Number(localStorage.getItem("quizScore")) || 0;

let recentActivity =
JSON.parse(
localStorage.getItem("recentActivity")
) || [];

// =====================
// SAVE
// =====================

function saveData(){

localStorage.setItem(
"flashcards",
JSON.stringify(flashcards)
);

localStorage.setItem(
"cardsStudied",
cardsStudied
);

localStorage.setItem(
"correctAnswers",
correctAnswers
);

localStorage.setItem(
"wrongAnswers",
wrongAnswers
);

localStorage.setItem(
"quizScore",
quizScore
);

localStorage.setItem(
"recentActivity",
JSON.stringify(recentActivity)
);

}

// =====================
// NAVIGATION
// =====================

function showSection(id){

document
.querySelectorAll(".section")
.forEach(section=>{

section.classList.remove(
"active-section"
);

});

document
.getElementById(id)
.classList.add(
"active-section"
);

document
.querySelectorAll(".nav-menu li")
.forEach(item=>{
item.classList.remove("active");
});

if(id==="overview")
document.querySelectorAll(".nav-menu li")[0]
.classList.add("active");

if(id==="study")
document.querySelectorAll(".nav-menu li")[1]
.classList.add("active");

if(id==="quiz")
document.querySelectorAll(".nav-menu li")[2]
.classList.add("active");

if(id==="manage")
document.querySelectorAll(".nav-menu li")[3]
.classList.add("active");

}

// =====================
// FILTER
// =====================

function filterCards(category){

if(category==="All"){

filteredCards=[...flashcards];

}else{

filteredCards=
flashcards.filter(card=>
card.category===category
);

}

currentIndex=0;

loadCard();

}

// =====================
// LOAD CARD
// =====================

function loadCard(){

if(filteredCards.length===0){

document.getElementById(
"cardQuestion"
).innerText="No Cards";

document.getElementById(
"cardAnswer"
).innerText="";

return;

}

const card =
filteredCards[currentIndex];

document.getElementById(
"cardQuestion"
).innerText =
card.question;

document.getElementById(
"cardAnswer"
).innerText = "";

document.getElementById(
"categoryBadge"
).innerText =
card.category;

document.getElementById(
"cardNumber"
).innerText =
currentIndex + 1;

document.getElementById(
"cardTotal"
).innerText =
filteredCards.length;

updateDots();

}

// =====================
// SHOW ANSWER
// =====================

function showAnswer(){

if(filteredCards.length===0)
return;

document.getElementById(
"cardAnswer"
).innerText =
filteredCards[currentIndex].answer;

cardsStudied++;

recentActivity.unshift(
"Studied: " +
filteredCards[currentIndex].question
);

if(recentActivity.length>6){

recentActivity.pop();

}

saveData();

updateDashboard();

}

// =====================
// NEXT
// =====================

function nextCard(){

if(filteredCards.length===0)
return;

currentIndex++;

if(
currentIndex >=
filteredCards.length
){

currentIndex=0;

}

loadCard();

loadQuizQuestion();

}

// =====================
// PREVIOUS
// =====================

function previousCard(){

if(filteredCards.length===0)
return;

currentIndex--;

if(currentIndex<0){

currentIndex=
filteredCards.length-1;

}

loadCard();

loadQuizQuestion();

}

// =====================
// DOTS
// =====================

function updateDots(){

const dots =
document.getElementById(
"dots"
);

if(!dots) return;

dots.innerHTML="";

filteredCards.forEach(
(_,index)=>{

const dot =
document.createElement("div");

dot.classList.add("dot");

if(index===currentIndex){

dot.classList.add(
"active"
);

}

dots.appendChild(dot);

});

}

// =====================
// QUIZ
// =====================

function loadQuizQuestion(){

if(flashcards.length===0)
return;

document.getElementById(
"quizQuestion"
).innerText =
flashcards[currentIndex].question;

}

function checkQuizAnswer(){

if(flashcards.length===0)
return;

const userAnswer =
document
.getElementById(
"quizAnswer"
)
.value
.trim()
.toLowerCase();

const correctAnswer =
flashcards[currentIndex]
.answer
.toLowerCase();

if(
userAnswer===correctAnswer
){

alert("Correct Answer!");

quizScore++;
correctAnswers++;

}else{

alert(
"Wrong!\nCorrect Answer: " +
flashcards[currentIndex]
.answer
);

wrongAnswers++;

}

document.getElementById(
"quizAnswer"
).value="";

document.getElementById(
"quizScore"
).innerText=
quizScore;

saveData();

updateDashboard();

nextCard();

}

// =====================
// ADD CARD
// =====================

function addFlashcard(){

const question =
document
.getElementById(
"newQuestion"
)
.value
.trim();

const answer =
document
.getElementById(
"newAnswer"
)
.value
.trim();

const category =
document
.getElementById(
"newCategory"
)
.value;

if(
question==="" ||
answer===""
){

alert(
"Please fill all fields"
);

return;

}

flashcards.push({

question,
answer,
category

});

filteredCards=
[...flashcards];

document.getElementById(
"newQuestion"
).value="";

document.getElementById(
"newAnswer"
).value="";

saveData();

renderFlashcards();

updateDashboard();

loadCard();

}

// =====================
// DELETE
// =====================

function deleteFlashcard(index){

if(
!confirm(
"Delete this flashcard?"
)
){
return;
}

flashcards.splice(
index,
1
);

filteredCards=
[...flashcards];

saveData();

renderFlashcards();

updateDashboard();

loadCard();

}

// =====================
// EDIT
// =====================

function editFlashcard(index){

let q =
prompt(
"Edit Question",
flashcards[index].question
);

let a =
prompt(
"Edit Answer",
flashcards[index].answer
);

if(q && a){

flashcards[index].question=q;
flashcards[index].answer=a;

saveData();

renderFlashcards();

loadCard();

}

}

// =====================
// RENDER CARDS
// =====================

function renderFlashcards(){

const container =
document.getElementById(
"flashcardList"
);

container.innerHTML="";

flashcards.forEach(
(card,index)=>{

container.innerHTML += `

<div class="flashcard-item">

<h3>${card.question}</h3>

<p>${card.answer}</p>

<small>
${card.category}
</small>

<div class="flashcard-actions">

<button
class="edit-btn"
onclick="editFlashcard(${index})">

Edit

</button>

<button
class="delete-btn"
onclick="deleteFlashcard(${index})">

Delete

</button>

</div>

</div>

`;

});

}

// =====================
// ANALYTICS
// =====================

function updateDashboard(){

document.getElementById(
"totalCards"
).innerText=
flashcards.length;

document.getElementById(
"cardsStudied"
).innerText=
cardsStudied;

document.getElementById(
"correctAnswers"
).innerText=
correctAnswers;

document.getElementById(
"wrongAnswers"
).innerText=
wrongAnswers;

let accuracy = 0;

if(
(correctAnswers +
wrongAnswers) > 0
){

accuracy = Math.round(

(correctAnswers /

(correctAnswers +
wrongAnswers))

*100

);

}

document.getElementById(
"accuracy"
).innerText=
accuracy + "%";

renderCategoryAnalytics();

renderRecentActivity();

}

// =====================
// CATEGORY ANALYTICS
// =====================

function renderCategoryAnalytics(){

const container =
document.getElementById(
"categoryContainer"
);

container.innerHTML="";

const categories={};

flashcards.forEach(card=>{

if(!categories[
card.category
]){

categories[
card.category
]=0;

}

categories[
card.category
]++;

});

for(
let category
in categories
){

const count =
categories[
category
];

const percentage =
Math.round(

(count /
flashcards.length)

*100

);

container.innerHTML += `

<div class="category-card">

<h3>${category}</h3>

<p>${count} flashcards</p>

<div class="progress">

<div
class="progress-fill"
style="
width:${percentage}%">
</div>

</div>

</div>

`;

}

}

// =====================
// RECENT ACTIVITY
// =====================

function renderRecentActivity(){

const box =
document.getElementById(
"recentActivity"
);

if(
recentActivity.length===0
){

box.innerHTML=
"No activity yet.";

return;

}

box.innerHTML =
recentActivity
.map(item=>
`<p>${item}</p>`
)
.join("");

}

// =====================
// RESET
// =====================

function resetDeck(){

if(
!confirm(
"Reset entire deck?"
)
){

return;

}

localStorage.clear();

location.reload();

}

// =====================
// INITIALIZE
// =====================

renderFlashcards();

loadCard();

loadQuizQuestion();

updateDashboard();

document.getElementById(
"quizScore"
).innerText=
quizScore;