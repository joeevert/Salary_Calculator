$(document).ready(readyNow);

let monthlyBudget = 20000;
let employeesArray = [];
let totalSalaries = 0;
let months = 12;

class Employee {
    constructor(firstName, lastName, idNum, jobTitle, annualSalary ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNum = idNum;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    }
}

function readyNow() {        
    addClickListeners();
}

function addClickListeners() {
    $('#addEmployeeBtn').on('click', addEmployee);
    $('#employeeList').on('click', '.removeBtn', removeEmployee);
}

// add new employee
function addEmployee() {
    event.preventDefault();
    let firstNameIn = $('#firstName').val();
    let lastNameIn = $('#lastName').val();
    let idNumIn = $('#id').val();
    let jobTitleIn = $('#jobTitle').val();
    let annualSalaryIn = $('#annualSalary').val();
    let newEmployee = new Employee(firstNameIn, lastNameIn, idNumIn, jobTitleIn, parseInt(annualSalaryIn));
    
    // alert if not all inputs entered
    if ( firstNameIn === '' || lastNameIn === '' || idNumIn === '' || jobTitleIn === '' || annualSalaryIn === '' ) {
        return alert('Not all inputs entered.');
    }
    else {
        employeesArray.push(newEmployee);
        appendEmployees();
        appendMonthlyTotal();
        checkBudget();
        clearInputs();
    }
} // end addEmployee

// appends employees to table on DOM
function appendEmployees() {
    let employeeList = $('#employeeList');
    employeeList.empty();
    // loop employeesArray to append to DOM
    for (let employee of employeesArray) {
        let employeeElement =$(`<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.idNum}</td>
            <td>${employee.jobTitle}</td>
            <td>${employee.annualSalary}</td>
            <td><button class="removeBtn">Remove</button></td>
            </tr>`)
        employeeList.append(employeeElement);
        employeeElement.data('id', employee.idNum)
    }
} // end appendEmployee

// append monthly cost
function appendMonthlyTotal() {
    // let totalSalaries = 0;
    totalSalaries = 0;

    let totalMonthly = $('#totalMonthly');
    totalMonthly.empty();

    for (let salary of employeesArray) {   
        totalSalaries += salary.annualSalary / months;
    }
    totalMonthly.append(`Total Monthly: $${totalSalaries.toFixed(2)}`);
} // end monthly appendMonthlyTotal

// check if budget is over $20,000
function checkBudget(){
    if( totalSalaries > monthlyBudget ){
        $('#totalMonthly').addClass('exceed');
    } else {
        $('#totalMonthly').removeClass('exceed');
    }
} // end checkBudget

// removes employee
function removeEmployee() {
    let selectedItem = $(this).closest('tr').data('id');
    console.log('selectedItem id:', selectedItem);
    for (let i = 0; i < employeesArray.length; i++) {
        if (selectedItem.includes(employeesArray[i].idNum)) {
            employeesArray.splice(i, 1);
            $(this).parent().empty();
        }
    }
    appendEmployees();
    appendMonthlyTotal();
    checkBudget();
    console.log(employeesArray);
} // end removeEmployee

// clears input fields
function clearInputs() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
} // end clearInputs