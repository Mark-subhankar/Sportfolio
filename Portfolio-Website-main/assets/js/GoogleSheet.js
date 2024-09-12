document.addEventListener("DOMContentLoaded", function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwES1WYrtgJ1weMjnwt40OLQgS5oUQuz8lscZCzdh2nwNKO6VoFE90VnJQqa5eAHopFOQ/exec';
    const form = document.forms['contact-form'];

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Get form input values
        const name = form.querySelector("input[name='name']").value.trim();
        const email = form.querySelector("input[name='email']").value.trim();
        const phone = form.querySelector("input[name='phone']").value.trim();
        const message = form.querySelector("textarea[name='message']").value.trim();

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate the form fields
        let isValid = true;

        if (name === "") {
            alert("Please enter your name.");
            isValid = false;
        }

        if (email === "") {
            alert("Please enter your email.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        // Assuming phone and message are optional

        if (isValid) {
            // Get the current date and time
            const timestamp = new Date();

            // Prepare the data to send to Google Sheets
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('message', message);
            formData.append('timestamp', timestamp); // Include the timestamp

            // Submit to Google Sheets using fetch
            fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        // Google Sheets submission successful
                        swal("Successfull", "Your form is submitted successfully", "success")
                        form.reset();
                    } else {
                        // Google Sheets submission failed
                        swal("Something wrong", "Your form is not submitted", "error")

                    }
                })
                .catch(error => console.error('Error!', error.message));
            $.ajax({
                url: "https://formspree.io/f/xbjvyqay",
                method: "POST",
                data: $(form).serialize(),
                dataType: "json",
                error: function(xhr, status, error) {
                    // Handle the error here
                    console.log(xhr.responseText);
                }
            });
        }
    });
});