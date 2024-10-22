const form = document.getElementById('memberForm');

form.addEventListener('submit',function(event){
    event.preventDefault(); 
    const formData = {
        FirstName: document.getElementById('Firstname').value.toUpperCase(),
        LastName: document.getElementById('Lastname').value.toUpperCase(),
        Address: document.getElementById('Address').value,
        PhoneNumber: document.getElementById('phonenumber').value,
        Email: document.getElementById('email').value,
        DateOfBirth: document.getElementById('dob').value,
        MembershipDate: document.getElementById('membership').value,
    };
    // send form data to the server using fetch API
    fetch('/add-member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => {
        if (data.success){
            alert('Member added successfully');
            // clear the form after success
            form.reset();
        }
        else{
            alert('Error: data.message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was a problem adding the member.')
      });
    
});