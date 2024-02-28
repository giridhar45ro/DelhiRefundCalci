document.getElementById('discount-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    validateForm();
});


var radios = document.querySelectorAll('input[type="radio"]');
radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
        hideDiscountedPrice();
        disableThirdFormGroup();
    });
});


function hideDiscountedPrice() {
    var discountedPrice = document.querySelector('.discounted-price');
    discountedPrice.style.display = 'none'; 
}

function disableThirdFormGroup() {
    var programValue = document.querySelector('input[name="program"]:checked').value;
    var thirdFormGroupInputs = document.querySelectorAll('input[name="status"]');
    if (programValue === "EOE") {
        thirdFormGroupInputs.forEach(function(input) {
            input.disabled = true; 
        });
    } else {
        thirdFormGroupInputs.forEach(function(input) {
            input.disabled = false; 
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    function disableThirdFormGroup() {
        var programValue = document.querySelector('input[name="program"]:checked').value;
        var thirdFormGroupInputs = document.querySelectorAll('input[name="status"]');
        if (programValue === "EOE") {
            thirdFormGroupInputs.forEach(function(input) {
                input.disabled = true; 
            });
        } else {
            thirdFormGroupInputs.forEach(function(input) {
                input.disabled = false; 
            });
        }
    }

    var discountedPrice = document.querySelector('.discounted-price');
    discountedPrice.style.display = 'none';

    var errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'none';

    disableThirdFormGroup();

    var inputs = document.querySelectorAll('input[type="radio"], input[type="date"]');
    inputs.forEach(function(input) {
        input.addEventListener('change', function() {
            hideDiscountedPrice();
            hideErrorMessage();
            hideDiscountMessage();
            disableThirdFormGroup();
        });
    });

    document.getElementById('discount-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        validateForm();
    });
});

function hideDiscountedPrice() {
    var discountedPrice = document.querySelector('.discounted-price');
    discountedPrice.style.display = 'none';
}

function hideErrorMessage() {
    var errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'none';
}

function hideDiscountMessage() {
    var errorMessage = document.querySelector('.discount-message');
    errorMessage.style.display = 'none';
}

function showErrorMessage(message) {
    var errorDiv = document.querySelector('.error-message');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
    hideDiscountedPrice();
    hideDiscountMessage();
}

function showDiscountMessage(message) {
    var discountMessage = document.querySelector('.discount-message');
    discountMessage.innerText = message;
    discountMessage.style.display = 'block'; 
}

function offerPercentage(date, category){
    var currentDate = new Date();
    var febTwenty = new Date(currentDate.getFullYear(), 1, 20); 
    var marchEight = new Date(currentDate.getFullYear(), 2, 8);
    var aprilNinth = new Date(currentDate.getFullYear(), 3, 9); 
    var aprilTenth = new Date(currentDate.getFullYear(), 3, 10); 
    var mayTenth = new Date(currentDate.getFullYear(), 4, 10); 
    
    var offer = 0;

    if (category !== 'manasarovar' && category !== 'kailash') {
        if (febTwenty <= date && date <= aprilNinth) {
            offer = 0.15; 
        } else if (aprilTenth <= date && date <= mayTenth) {
            offer = 0.1;
        }
    } else if (category === 'manasarovar' && (febTwenty <= date && date <= marchEight)) {
        offer = 0.15;
    }
    return offer;
    
}


function validateForm() {
    
    var registeredDate = document.getElementById('registered-date').value;
    var currentDate = new Date();
    var julySeventh = new Date(currentDate.getFullYear(), 6, 7); 
    var febSecond = new Date(currentDate.getFullYear(), 1, 2); 
    var enteredDate = new Date(registeredDate);

    if(enteredDate < febSecond){
        showErrorMessage("Please Enter Correct Date");
        return;
    }

    if (enteredDate > julySeventh) {
        showErrorMessage("Not Eligible for Refund");
    } else {
        showDiscountMessage("Eligible for Refund");
    var category = document.querySelector('input[name="category"]:checked').value;
    var program = document.querySelector('input[name="program"]:checked').value;
    var status = document.querySelector('input[name="status"]:checked').value;

    var discountedPrice = document.querySelector('.discounted-price');

    var price;
    var refundAmount = 0;

    var pricing = {"yamuna":2000, "ganga":5000, "bhagirathi":11000, "bramhputra":25000, "manasarovar":50000, "kailash":100000}

    for(var cat in pricing){
        if(category === cat){
            price = pricing[cat];
            break;
        }
    }
    var lan = {"EOE":0 ,"ENG":4000, "REGIONAL":2000}
    var offer = offerPercentage(enteredDate,category)

    if(status == 'NOTSTARTED'){
    price += lan[program];
    }
    salePrice = price - (price * offer)
    refundAmount = salePrice * 0.8;
    
    
    discountedPrice.style.display = 'block'; 
    discountedPrice.innerHTML = "<strong>Refund Amount: " + refundAmount + "</strong>";    
}
}
