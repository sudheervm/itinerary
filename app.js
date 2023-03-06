const form = document.querySelector('form');
const destinationInput = document.querySelector('#autocomplete-0-input');
const budgetInput = document.querySelector('#budget');
const startDateInput = document.querySelector('#start-date');
const endDateInput = document.querySelector('#days');
const activitiesInput = document.querySelector('#activities');
const resultsDiv = document.querySelector('#results');

const chatGPTAPIKey = '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';
const chatGPTModel = 'text-davinci-003';

form.addEventListener('submit', e => {
  e.preventDefault();

  const destination = destinationInput.value;
  const budget = budgetInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const activities = activitiesInput.value;

  // Call ChatGPT API to get itinerary recommendations
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',  'Access-Control-Allow-Origin': '*', 'Authorization': `Bearer ${chatGPTAPIKey}` },
    body: JSON.stringify({ model: chatGPTModel, 
      prompt: `Recommend an itinerary for a trip to ${destination} from ${startDate} for ${endDate} days with a budget of ${budget} AED. The traveler is interested in the following activities: ${activities}`,
      temperature: 0, max_tokens: 4000
    })
  };
  
  resultsDiv.innerHTML = "Please wait, loading your itinary !.."
  fetch('https://api.openai.com/v1/completions', requestOptions)
  .then(response => response.json())
  .then(data => {
    // Display the first 500 characters of the response
    const shortResponse = data.choices[0].text.replace(', sightseeing, and shopping','');
    resultsDiv.innerHTML = `${shortResponse}`;
    
    // Add event listener to "Read More" button to display full response
    // const readMoreBtn = document.querySelector('.read-more');
    // readMoreBtn.addEventListener('click', e => {
    //   e.preventDefault();
    //   resultsDiv.innerHTML = data.choices[0].text;
    // });
  })
  .catch(error => console.log(error));

});
