

 const pollData = [
    {
      option: "Ja",
      votes: 11,
      color: "rgb(255, 99, 132)"
    },
    {
      option: "Nej",
      votes: 8,
      color: "rgb(54, 162, 235)"
    },
    {
      option: "Måske",
      votes: 11,
      color: "rgb(36, 36, 36)"
    }
  ];
  
  const pollForm = document.querySelector("#pollForm");
  
  pollForm.addEventListener("submit", pollFormSubmit);
  
  function pollFormSubmit(event) {
    event.preventDefault();
    const pollOptionInput = pollForm.querySelector("input[name='pollOptions']:checked");
    if(pollOptionInput) {
      const pollOptionValue = pollOptionInput.value;
      pollData.find(pollOption => pollOption.option === pollOptionValue).votes++;
      pollChart.data.datasets[0].data = pollData.map(pollOption => pollOption.votes);
      pollChart.update();
      pollForm.reset();
    }
  }
  
  function rgbToRgba(rgb, alpha=1) {
    return `rgba(${rgb.substring(rgb.indexOf('(')+1, rgb.length-1).split(',').join()}, ${alpha})`;
  }
  
  Chart.defaults.font.family = '"Comic Sans MS", cursive, sans-serif';
  
  
  const ctx = document.getElementById('chart').getContext('2d');
  const pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pollData.map(pollOption => pollOption.option),
      datasets: [{
        label: '# of Votes',
        data: pollData.map(pollOption => pollOption.votes),
        backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Kunne du finde på at fjerne dine øjenbryn, øjenvipper og hårgrænse hvis det blev anset som smukt? ',
        fontColor: "#333",
        fontSize: 20,
        padding: 20
      },
      legend: {
        display: false,
      }
    }
  });
