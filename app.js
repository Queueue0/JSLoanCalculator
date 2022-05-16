// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate results
function calculateResults(e){
    if (document.querySelector('.alert') !== null) {
        clearError();
    }
    console.log('Calculating...');

    // UI Vars
    const amountEl = document.getElementById('amount');
    const interestEl = document.getElementById('interest');
    const monthsEl = document.getElementById('months');
    const monthlyPaymentEl = document.getElementById('monthly-payment');
    const totalPaymentEl = document.getElementById('total-payment');
    const totalInterestEl = document.getElementById('total-interest');

    const principal = parseFloat(amountEl.value);
    const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;
    const calculatedPayments = parseFloat(monthsEl.value);

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPaymentEl.value = monthly.toFixed(2);
        totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestEl.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
    }

    // Hide loader
    document.getElementById('loading').style.display = 'none';
}


// Show Error
function showError(error) {
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // create a div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = "alert alert-danger"

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // // Clear error after 3 seconds
    // setTimeout(clearError, 3000);
}


// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}