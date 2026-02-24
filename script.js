// faka array
let rejectedList = [];
let interviewList = [];
let currentStatus = 'all'


// dom element
let total = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
let countJobs = document.getElementById('count-jobs');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');
const filteredSection = document.getElementById('filtered-section');

const allCardSection = document.getElementById('all-cards');

const mainContainer = document.querySelector('main');

// count calculate machine
function calculateCount() {
  const currentTotal = allCardSection.children.length;
  total.innerText = currentTotal;

  if (currentStatus === 'interview-filter-btn') {
    countJobs.innerText = `${interviewList.length} of ${currentTotal}`;
  }
  else if (currentStatus === 'rejected-filter-btn') {
    countJobs.innerText = `${rejectedList.length} of ${currentTotal}`;
  }
  else {
    countJobs.innerText = currentTotal;
  }

  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

// machine call
calculateCount();


function toggleStyle(id) {
  // class remove
  allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
  interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
  rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')

  // class added
  allFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]')

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove('bg-white', 'text-[#64748B]')
  selected.classList.add('bg-[#3B82F6]', 'text-white')
  
  // sorto anujai section show hide
  if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filteredSection.classList.add('hidden');
  } else if (id === 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderRejected();
  }
  // machine call
  calculateCount();

}

mainContainer.addEventListener('click', function (event) {

  if (event.target.classList.contains('interview-btn')) {
    const parentNode = event.target.parentNode.parentNode;
    const cardH = parentNode.querySelector('.card-h').innerText;
    const cardP = parentNode.querySelector('.card-p').innerText;
    const jobType = parentNode.querySelector('.job-type').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerText = 'INTERVIEW'
    const cardInfo = {
      cardH,
      cardP,
      jobType,
      status: 'INTERVIEW',
      notes
    }


    const interviewExist = interviewList.find(item => item.cardH === cardInfo.cardH);
    if (!interviewExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(item => item.cardH != cardInfo.cardH)

    if (currentStatus === 'rejected-filter-btn') {
      renderRejected();
    }
    // mahine cll
    calculateCount();

  } else if (event.target.classList.contains('rejected-btn')) {
    const parentNode = event.target.parentNode.parentNode;
    const cardH = parentNode.querySelector('.card-h').innerText;
    const cardP = parentNode.querySelector('.card-p').innerText;
    const jobType = parentNode.querySelector('.job-type').innerText;
    const notes = parentNode.querySelector('.notes').innerText;
    parentNode.querySelector('.status').innerText = 'REJECTED'
    const cardInfo = {
      cardH,
      cardP,
      jobType,
      status: 'REJECTED',
      notes
    }


    const rejectedExist = rejectedList.find(item => item.cardH === cardInfo.cardH);
    if (!rejectedExist) {
      rejectedList.push(cardInfo);
    }


    interviewList = interviewList.filter(item => item.cardH != cardInfo.cardH)

    if (currentStatus === 'interview-filter-btn') {
      renderInterview();
    }
    // machine call
    calculateCount();

  }
  else if (event.target.closest('#delete-btn')) {
    const card = event.target.closest('.full-card');
    if (!card) {
      return;
    }
    const title = card.querySelector('.card-h')?.innerText.trim();
    if (!title) {
      return;
    }

    card.remove();

    interviewList = interviewList.filter(item => item.cardH.trim() !== title);
    rejectedList = rejectedList.filter(item => item.cardH.trim() !== title);

    if (currentStatus === 'interview-filter-btn') {
      renderInterview();
    } else if (currentStatus === 'rejected-filter-btn') {
      renderRejected();
    }
    // machine call
    calculateCount();


  }
})


// add interview list rendering and empty state handling

function renderInterview() {
  filteredSection.innerHTML = '';
  if (interviewList.length === 0) {
    filteredSection.innerHTML = `
        <div class="text-center py-16 bg-white rounded-lg border border-[#E5E7EB] mx-auto">
                <div class="mx-auto flex justify-center mb-6">
                    <i class="fa-solid fa-file-lines text-8xl text-[#7DA8FF]"></i>
                </div>
                <h3 class="text-2xl font-semibold text-[#002C5C] mb-2">No jobs available</h3>
                <p class="text-[#64748B] text-lg">
                    Check back soon for new job opportunities
                </p>
            </div>
        `
  }

  for (let interview of interviewList) {
    console.log(interview)
    let div = document.createElement('div');
    div.className = 'full-card p-6 bg-white border border-[#F1F2F4] rounded-lg'
    div.innerHTML = `
        <div>
                <div class="flex justify-between">
                    <div>
                        <h2 class="text-[#002C5C] font-semibold text-[18px] pb-1 card-h">${interview.cardH}</h2>
                        <p class="text-[#64748B] card-p">${interview.cardP}</p>
                    </div>
                    <button id="delete-btn" class="w-10 h-10 flex items-center justify-center border rounded-full border-[#F1F2F4]"><i class="fa-regular fa-trash-can text-[#64748B]"></i></button>
                </div>
                <div class="py-5 text-[#64748B]">
                    <p class="job-type">${interview.jobType}</p>
                </div>
                <div class="mb-5">
                    <p class="status py-2 px-3 rounded-sm bg-[#EEF4FF] w-[130px] font-medium mb-2">${interview.status}</p>
                    <p class="notes">${interview.notes}</p>
                </div>
                <div class="flex gap-2">
                    <button class="border border-[#10B981] text-[#10B981] font-semibold rounded-sm px-3 py-2 interview-btn">Interview</button>
                    <button class="border border-[#EF4444] text-[#EF4444] font-semibold rounded-sm px-3 py-2 rejected-btn">Rejected</button>
                </div>
            </div>
        `
    filteredSection.appendChild(div);
  }
}

