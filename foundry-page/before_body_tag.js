document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".generate-quote");
    let inputElement = document.querySelector(".number-of-designs-input");
    let slider = document.getElementById("seq-count-slider")
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            let buttonValue = button.getAttribute("data-value");

            inputElement.value = slider.value;
            console.log(slider.value)

        });
    });
})

const formOrganizationField = document.getElementById('organization-field')
const formNameField = document.getElementById('name-field')
const formEmailField = document.getElementById('email-field')

document.getElementById('email-form').addEventListener('submit', function (e) {
    // Prevent the form from actually submitting (which would refresh the page)
    event.preventDefault();
    fetch("https://3t56ebe25e.execute-api.eu-central-1.amazonaws.com/default/infun-generate-quote-and-send-email", {
        method: "POST",
        body: JSON.stringify({
            "organization": formOrganizationField.value,
            "name": formNameField.value,
            "email": formEmailField.value,
            "seq_count": slider.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    console.log(formOrganizationField.value, formNameField.value, formEmailField.value, slider.value)
});
