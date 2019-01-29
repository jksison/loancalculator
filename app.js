const loanForm = document.getElementById('loan-form');
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

loadEvents();


function loadEvents() {
   loanForm.addEventListener('submit', function(e) {
      loading.style.display = 'block';
      results.style.display = 'none';
      setTimeout(calculateResults, 2000);      
      e.preventDefault();
   });
}

function calculateResults() {
   const principal = Number(amount.value);
   const monthlyInterestRate = Number(interest.value) / 100 / 12;
   const numberOfPayments = Number(years.value) * 12;

   // Compute monthly payment
   const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
   const monthly = (principal*x*monthlyInterestRate)/(x-1);
   
   loading.style.display = 'none';

   if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2); 
      totalPayment.value = (monthly * numberOfPayments).toFixed(2);
      totalInterest.value = ((monthly * numberOfPayments) - principal).toFixed(2);

      results.style.display = 'block';
   } else {
      showError('Please check your numbers');
   }   
}


function showError(error) {
   // Create a div
   const errorDiv = document.createElement('div');

   // Add class
   errorDiv.className = 'alert alert-danger';

   // Create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));

   card.insertBefore(errorDiv, heading);

   setTimeout(clearError, 3000);
}

function clearError() {
   document.querySelector('.alert').remove();
}