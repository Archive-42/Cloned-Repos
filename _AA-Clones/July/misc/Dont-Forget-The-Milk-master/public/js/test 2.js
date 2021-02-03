(() => {
  let tasks = document.querySelectorAll('.task')
  tasks.forEach((task) => {
    task.addEventListener('click', (e) => {
      console.log('hello')
      alert(e.target.id)
    })
  })
})();