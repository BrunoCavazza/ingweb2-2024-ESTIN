$(document).ready(function() {
  // Get the header element
  var headerElement = document.getElementById('header-container');

  // Fetch the header.html content
  fetch("../pages/clients_header.html")
      .then(function(response) {
          if (response.ok) {
              return response.text();
          }
          throw new Error("Network response was not ok.");
      })
      .then(function(headerContent) {
          // Inject the content into the header element
          headerElement.innerHTML = headerContent;

          // Get the current page URL
          var url = window.location.href;

          // Get the filename from the URL
          var filename = url.substring(url.lastIndexOf('/') + 1);

          // Remove the file extension if present
          if (filename.indexOf('.') !== -1) {
              filename = filename.split('.')[0];
          }

          // Remove any query parameters from the filename
          filename = filename.split('?')[0];

          // Set the active page based on the filename
          $('#' + filename).addClass('active');
      })
      .catch(function(error) {
          console.log("Error:", error);
      });
});



fetch("../pages/footer.html")
  .then(response => response.text())
  .then(html => {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = html;
  })
  .catch(error => {
    console.error("Error al cargar el archivo de pie de página:", error);
  });