// IIFE - or a self-executing anonymous function
(function(){

  // dictionary object for lookups.  Behaves like a global but it's not thanks to IIFE.
  var levels = [
    "Very Easy",
    "Easy",
    "Medium",
    "Hard",
    "Very Hard"
  ];

  window.onload = function() {
    /**
     * showChart - Shows pie chart of tasks by level of difficulty
     *
     * @param  {array} tasks array of tasks
     * @return {undefined}
     */
    function showChart(tasks) {
      // no point in doing anything if there are no tasks
      if (tasks.length == 0) {
        return;
      }
      var counts = []; // holds total counts for each level

      // initialize counts for each level
      for (var k=0; k<levels.length; k++){
        counts.push(0);
      }

      // loop through tasks and count each level
      for (var i = 0; i < tasks.length; i++) {
        counts[tasks[i].level]++;
      }

      // build an array of arrays
      var rows = new Array();
      for (var j = 0; j < counts.length; j++) {
        // push an array containing [level description, total count of level]
        rows.push( [levels[j], counts[j]] );
      }


      // Load the Visualization API and the corechart package.
      google.charts.load('current', {
        'packages': ['corechart']
      });

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

        // Set chart options
        var options = {
          'title': 'Percent of Difficulty',
          'width': 400,
          'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    }



    /**
     * addTask - Adds a task to the TODO list and then shows it
     */
    function addTask() {
      // block the default behavior
      event.preventDefault();

      // get form values
      var form = document.forms[0];
      //var task = document.getElementById('task').value;
      var task = form["task"].value;
      var assignTo = form["assignTo"].value;
      var level = form["level"].value;

      // add new item to tasks
      tasks.push({
        task: task,
        assignTo: assignTo,
        level: level
      });

      // update list
      showList();
      showChart(tasks);

      // reset form
      form.reset();
    }


    /**
     * showList - creates a listItem(s) for each task
     *
     * @return {undefined}  description
     */
    function showList() {
      // clear existing content
      var ul = document.querySelector('ul');
      ul.innerText = "";

      // go through each task
      for (var i = 0; i < tasks.length; i++) {
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

    // wire up submit button
    var form = document.forms[0];
    form.addEventListener("submit", addTask);

    // Future use:  if we load data from a datasource, show list and chart.
    // showChart(tasks);
    // showList();
    //
  } // end window.onload

})();
