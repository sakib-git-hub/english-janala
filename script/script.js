const loadLessons = () => {
fetch("https://openapi.programming-hero.com/api/levels/all")
.then((res) => res.json())
.then((json) => lessonDisplay(json.data))
}

const removeActive = () =>{
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  lessonButtons.forEach((btn)=> btn.classList.remove("active"))
}

const lessonWord = (id) =>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActive()
     const lessonbaton = document.getElementById(`lesson-btn-${id}`);
     lessonbaton.classList.add("active");
    lessonWordDisplay(data.data)
  });
 
  
}

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
 const res = await fetch(url);
 const details = await res.json();
 displayWordDetail(details)
}


const displayWordDetail = (word) => {
 const btnparent = document.getElementById("modal-container")
 btnparent.innerHTML = ` <h1>Press ESC key or click the button below to close </h1>
 `
document.getElementById("my_modal_5").showModal()

  
}
const lessonWordDisplay = (words) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML="";
     if(words.length == 0){
       cardContainer.innerHTML =`<div class="text-center col-span-3 p-22">
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-3xl my-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-5xl py-8"নেক্সট Lesson এ যান</h1>

        </div> `
    }
    for(let word of words){
        const card = document.createElement("div");
    card.innerHTML =`    
    <div class="p-8">
    <div class="w-[400px] rounded-lg bg-white p-8 text-center">
   <div> 
   <h2 class="text-4xl font-bold">${word.word}</h2>
    <p class="mt-5 text-[20px] font-[500]">Meaning /Pronounciation</p> 
    <p class="text-2xl font-semibold font-bangla">${word.meaning? word.meaning : "“অর্থ পাওয়া যায়নি”"}/${word.pronunciation? word.pronunciation :"pronunciation “পাওয়া যায়নি”"}</p>

     <div class="flex mt-10 h-[50px] text-3xl justify-between items-center">
    <button id="info" onclick="loadWordDetail(${word.id})" class="cursor-pointer bg-[#E8F4FF] p-2 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
    <button class="cursor-pointer bg-[#E8F4FF] p-2 rounded-lg"><i class="fa-brands fa-soundcloud"></i> </button>  
    </div>
     </div>
    </div>
    </div> 
`
cardContainer.appendChild(card);

    }
}

const lessonDisplay = (lessons) => {
const lessonContainer = document.getElementById("lesson-container");
lessonContainer.innerHTML = "";
for (let lesson of lessons){
const btnDiv = document.createElement("div")
btnDiv.innerHTML= `
<button id="lesson-btn-${lesson.level_no}" onclick="lessonWord(${lesson.level_no})" class="btn btn-outline btn-primary rounded-4 my-2 mx-auto lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson- ${lesson.level_no} </button>
`
lessonContainer.appendChild(btnDiv);
}
};
loadLessons() 