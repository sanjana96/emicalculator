document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const disclaimerLink = document.getElementById('disclaimer-link');
    const disclaimerPopup = document.getElementById('disclaimer-popup');
    const closePopup = document.querySelector('.close-popup');
    
    calculateBtn.addEventListener('click', calculateEMI);
    
    // Disclaimer popup functionality
    disclaimerLink.addEventListener('click', function() {
        disclaimerPopup.style.display = 'block';
    });
    
    closePopup.addEventListener('click', function() {
        disclaimerPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === disclaimerPopup) {
            disclaimerPopup.style.display = 'none';
        }
    });
    
    // Add input validation and live calculation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters except decimal point
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const decimalCount = (this.value.match(/\./g) || []).length;
            if (decimalCount > 1) {
                this.value = this.value.slice(0, this.value.lastIndexOf('.'));
            }
        });
    });
    
    function calculateEMI() {
        // Get input values
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value);
        const loanTenure = parseInt(document.getElementById('loan-tenure').value);
        
        // Validate inputs
        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
            alert('Please enter valid values for all fields');
            return;
        }
        
        if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
            alert('All values must be greater than zero');
            return;
        }
        
        // Calculate EMI
        // Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
        // Where:
        // P = Principal loan amount
        // R = Monthly interest rate (annual rate / 12 / 100)
        // N = Loan tenure in months
        
        const monthlyInterestRate = interestRate / 12 / 100;
        const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenure) / 
                   (Math.pow(1 + monthlyInterestRate, loanTenure) - 1);
        
        const totalAmount = emi * loanTenure;
        const totalInterest = totalAmount - loanAmount;
        
        // Display results
        document.getElementById('monthly-emi').textContent = '₹ ' + emi.toFixed(2);
        document.getElementById('total-interest').textContent = '₹ ' + totalInterest.toFixed(2);
        document.getElementById('total-amount').textContent = '₹ ' + totalAmount.toFixed(2);
        
        // Show result section
        resultDiv.classList.add('active');
        resultDiv.style.display = 'block';
    }
    
    // Reset form function
    window.resetCalculator = function() {
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        resultDiv.style.display = 'none';
    };
});
