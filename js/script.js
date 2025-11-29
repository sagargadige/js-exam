const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.task-input')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

const allQuotes = [
  'Raise the bar by completing your Tasks!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the tasks, time for chill :)',
]

const alltasks = JSON.parse(localStorage.getItem('alltasks')) || {}

let completedtasksCount = Object.values(alltasks).filter(
  (task) => task.completed
).length

progressValue.style.width = `${(completedtasksCount / inputFields.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedtasksCount}/${inputFields.length} completed`
progressLabel.innerText = allQuotes[completedtasksCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const alltasksAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (alltasksAdded) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      alltasks[inputId].completed = !alltasks[inputId].completed
      completedtasksCount = Object.values(alltasks).filter(
        (task) => task.completed
      ).length

      progressValue.style.width = `${(completedtasksCount / inputFields.length) * 100}%`
      progressValue.firstElementChild.innerText = `${completedtasksCount}/${inputFields.length} completed`
      progressLabel.innerText = allQuotes[completedtasksCount]

      localStorage.setItem('alltasks', JSON.stringify(alltasks))
    } else {
      progressBar.classList.add('show-error')
    }
  })
})

inputFields.forEach((input) => {
  if (alltasks[input.id]) {
    input.value = alltasks[input.id].name

    if (alltasks[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
  })

  input.addEventListener('input', (e) => {
    if (alltasks[input.id] && alltasks[input.id].completed) {
      input.value = alltasks[input.id].name
      return
    }

    if (alltasks[input.id]) {
      alltasks[input.id].name = input.value
    } else {
      alltasks[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('alltasks', JSON.stringify(alltasks))
  })
})