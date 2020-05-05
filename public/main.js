const form = document.getElementById('vote-form');
var event;

//event to submit form
form.addEventListener('submit', (e)=>{
  const choiceVote = document.querySelector('input[name=tv]:checked').value;
  const data = {tv : choiceVote};
  //using fetch to send the post request
   fetch('vote', {
     method : 'post',
     body: JSON.stringify(data),
     headers : new Headers({
        'Content-Type' : 'application/json'
     })
   }).then(res => res.json())
   .catch(err => console.log(err));
  e.preventDefault();
});

fetch('vote')
.then(res => res.json())
.then(data => {
    let votes = data.votes;
    //console.log(votes);
    let allVotes = votes.length;
    document.querySelector('#chartTitle').textContent = `Total Vote Results : ${allVotes}`;
    //to get all vote count
    let allVoteCounts = {
       Vikings : 0,  
       Flash : 0,
       Got : 0,
       Merlin : 0,
       Narcos : 0,
       Other : 0
    };
    
    
    allVoteCounts =
     votes.reduce( (acc, vote) =>
      ((acc[vote.tv] = (acc[vote.tv] || 0) + parseInt(vote.points)), acc), {});


      var dataPoints = [
        { label :'Vikings', y:allVoteCounts.Vikings },
        { label :'Flash', y:allVoteCounts.Flash },
        { label :'Got', y:allVoteCounts.Got },
        { label :'Merlin', y:allVoteCounts.Merlin },
        { label :'Narcos', y:allVoteCounts.Narcos },
        { label :'Other', y:allVoteCounts.Other }
     ];
     
     //for Chart container in index.html
     const chartSection = document.querySelector('#chartSection');
       if(chartSection){
          // Listen for the event.
          document.addEventListener('votesAdded', function (e) { 
            document.querySelector('#chartTitle').textContent = `Total Vote Results : ${e.detail.allVotes}`;
        });
           const chart = new CanvasJS.Chart('chartSection', { 
               animationEnabled: true, //to give an initial slide up on the chart
               theme:'theme2',
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
             dataPoints.forEach( (x) => {
              if( x.label == data.tv){
                  x.y += data.points;
                  allVotes += data.points;
                  event = new CustomEvent('votesAdded',{detail:{allVotes:allVotes}});
                  // Dispatch the event.
                  document.dispatchEvent(event);
              } 
           });
           chart.render();
         });
       }
});

