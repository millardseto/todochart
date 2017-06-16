window.onload = function(){


  /**
   * addTask - Adds a task to the TODO list and then shows it
   */
  function addTask(){
    // block the default behavior
    event.preventDefault();

    // get form values
    var form = document.forms[0];
    //var task = document.getElementById('task').value;
    var task = form["task"].value;
    var assignTo = form["assignTo"].value;
    var level = form["level"].value;

    // add new item to tasks
    tasks.push({task:task, assignTo:assignTo, level:level});

    // update list
    showList();

    // reset form
    form.reset();
  }


  /**
   * showList - creates a listItem(s) for each task
   *
   * @return {type}  description
   */
  function showList(){
    // clear existing content
    var ul = document.querySelector('ul');
    ul.innerText = "";

    // dictionary object for lookups - might need to be global var in the future.
    var levels =
    [
        "Very Easy",
        "Easy",
        "Medium",
        "Hard",
        "Very Hard"
    ];

    // go through each task
    for(var i=0; i<tasks.length; i++) {
      // create list item and text
      var li = document.createElement("li");
      li.innerText = "Assigned To: " + tasks[i].assignTo + ", Level: " + levels[tasks[i].level] + ", Task: " + tasks[i].task;
      li.className = "list-group-item"; // bootstrap

      // add the list item to the list
      ul.appendChild(li);
    }
  }



  // container for tasks
  var tasks = [];

  // submit button
  var form = document.forms[0];
  form.addEventListener("submit", addTask);


}
