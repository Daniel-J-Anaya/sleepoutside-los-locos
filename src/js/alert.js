// Function to load and display alerts from the JSON file
export function loadAlerts() {

  // Fetch the alerts.json file
  fetch('../public/json/alerts.json')
    .then(response => response.json())  // Parse the JSON response
    .then(alerts => {
      if (alerts && alerts.length > 0) {
        // Create a <section> element with the class 'alert-list'
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        // Loop through each alert object in the alerts array
        alerts.forEach(alert => {
          // Create a <p> element for each alert message
          const alertParagraph = document.createElement('p');
          alertParagraph.textContent = alert.message;

          // Apply the background and text color to the <p> element
          alertParagraph.style.backgroundColor = alert.background;
          alertParagraph.style.color = alert.color;

          // Append the <p> element to the alert section
          alertSection.appendChild(alertParagraph);
        });

        // Prepend the alert section to the <main> element on the page
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.prepend(alertSection);  // Add the alert section to the top of the page
        }
      }
    })
    .catch(error => {
      console.error('Error loading alerts:', error);  // Handle any errors during fetch
    });
}
