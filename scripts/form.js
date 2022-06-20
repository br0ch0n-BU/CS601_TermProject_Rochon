// The form that holds all relevant elements
const mainForm = document.getElementById("mainForm");
const url = "https://httpbin.org/post";
const responseDiv = document.getElementById("response");

// toggleHint(targetElement)
//  Looks up the "aria-describedby" div which holds
//  the input element's hint.  If the target element holds
//  invalid input, unhide the hint and set the input
//  element itself to 'bad' for CSS styling. Only toggles
//  elements with an aria-describedby attribute.
function toggleHint(tgt) {
  const ariaDescName = tgt.getAttribute("aria-describedby");
  const ariaDescElement = ariaDescName
    ? document.getElementById(ariaDescName)
    : false;
  if (ariaDescElement && !tgt.validity.valid) {
    ariaDescElement.classList.remove("hideMe");
    tgt.classList.add("badInput");
  } else if (ariaDescElement) {
    ariaDescElement.classList.add("hideMe");
    tgt.classList.remove("badInput");
  }
}

function sendFeedback() {
  fetch(url, {
    method: "POST",
    body: new FormData(mainForm),
  })
    .then((response) => {
      if (!response.ok) {
        responseDiv.textContent="🙁 We're sorry, but the server didn't accept your comment. Please try again later.";

        throw Error(response.statusText);
      }
      return response.json();
    })
    // Display the server's OK response
    .then((data) => {
      responseDiv.textContent=`✅ Thanks ${data.form.firstName}, your comment was received by the server!`;
    })
    // Catch any exceptions
    .catch((error) => {
      console.error("Error submitting form data to server:", error);
    });
}
// On blur of any form input, check if field is valid
// and show error if not via toggleHint().  Uses capturing
// so as to delegate to any input in the form.  This allows
// users to see input errors before clicking submit.
mainForm.addEventListener(
  "blur",
  function (event) {
    toggleHint(event.target);
  },
  true
);

// Checks for any invalid inputs in the form element
// array and shows their hint, then blocks submission.
// If there are no invalid components, allow submit.
mainForm.addEventListener(
  "submit",
  function (event) {
    // Always prevent default because submit will use fetch api
    event.preventDefault();

    for (const formElement of mainForm.elements) {
      if (!formElement.validity.valid) {
        toggleHint(formElement);
      }
    }
    // else let it submit
    if (mainForm.checkValidity()) {
      sendFeedback();
    }
  },
  false
);
