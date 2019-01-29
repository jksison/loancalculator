const loanForm = document.getElementById('loan-form');
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

loadEvents();


function loadEvents() {
   loanForm.addEventListener('submit', calculateResults);
}

function calculateResults(e) {
   const principal = Number(amount.value);
   const monthlyInterestRate = Number(interest.value) / 100 / 12;
   const numberOfPayments = Number(years.value) * 12;

   console.log(principal);
   console.log(monthlyInterestRate);
   console.log(numberOfPayments);

   // Compute monthly payment
   const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
   const monthly = (principal*x*monthlyInterestRate)/(x-1);
   
   if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2); 
      totalPayment.value = (monthly * numberOfPayments).toFixed(2);
      totalInterest.value = ((monthly * numberOfPayments) - principal).toFixed(2);
   } else {
      console.log('Error');
   }

   e.preventDefault();
}