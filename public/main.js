const form = document.getElementById('vote-form');


//event to submit form
form.addEventListener('submit', (e)=>{
  const choiceVote = document.querySelector('input[name=tv]:checked').value;
  const data = {tv : choiceVote};
  //using fetch to send the post request
   fetch('http://localhost:3000/vote', {
     method : 'post',
     body: JSON.stringify(data),
     headers : new Headers({
        'Content-Type' : 'application/json'
     })
   }).then(res => res.json())
   .then(data => console.log(data))
   .catch(err => console.log(err));
  e.preventDefault();
});

let dataPoints = [
   { label :'Vikings', y:0 },
   { label :'Prison Break', y:0 },
   { label :'Game Of Thrones', y:0 },
   { label :'Merlin', y:0 },
   { label :'Legend Of The Seeker', y:0 },
   { label :'Something Else', y:0 }
];

//for Chart container in index.html
const chartSection = document.querySelector('#chartSection');
  if(chartSection){
      const chart = new CanvasJS.Chart('chartSection', {
          animationEnabled: true, //to give an initial slide up on the chart
          theme:'theme2',
          title: {
              text:'Vote Results'
          },
          data:[
              {
                  type:'column',
                  dataPoints: dataPoints
              }
          ]
      });
      chart.render();

       // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('2d7f59f24ca256293ac8', {
      cluster: 'eu',
      forceTLS: true
    });

    var channel = pusher.subscribe('tv-series-app');
    channel.bind('tv-series-vote', function(data) {
      dataPoints = dataPoints.map(x => {
         if( x.label === data.tv){
             x.y += data.points;
             return x;
         } else {
             return x;
         }
      });
      chart.render();
    });
  }