window.onload = function(){

  function showChart(tasks){
    var counts = [
      {level:"Very Easy", count:0},
      {level:"Easy", count:0},
      {level:"Medium", count:0},
      {level:"Hard", count:0},
      {level:"Very Hard", count:0}
    ]; // holds total counts for each level

    // loop through tasks and count each level
    for (var i=0; i<tasks.length; i++){
      counts[tasks[i].level].count++;
    }

    // build an array of arrays
    var rows = new Array();
    for (var j=0; j<counts.length; j++){
      rows.push([counts[j].level, counts[j].count]);
    }


    // Load the Visualization API and the corechart package.
          google.charts.load('current', {'packages':['corechart']});

          // Set a callback to run when the Google Visualization API is loaded.
          google.charts.setOnLoadCallback(drawChart);

          // Callback that creates and populates a data table,
          // instantiates the pie chart, passes in the data and
          // draws it.
          function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Difficulty');
            data.addColumn('number', 'Level');
            data.addRows(rows);

            /*
            data.addRows([
              ['Mushrooms', 3],
              ['Onions', 1],
              ['Olives', 1],
              ['Zucchini', 1],
              ['Pepperoni', 2]
            ]);*/

            // Set chart options
            var options = {'title':'Percent of Difficulty',
                           'width':400,
                           'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
  }
}



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
    showChart(tasks);

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

  showChart(tasks);
}
