console.log('client-updates.js');

let monthlyBudget = 20000;
let employeesArray = [];
let months = 12;

class Employee {
    constructor(firstName, lastName, idNum, jobTitle, annualSalary ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNum = idNum;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    } // end constructor
} // end Employee class

$(document).ready(readyNow);

function readyNow() {        
    addClickListeners();
} // end readyNow

function addClickListeners() {
    $('#addEmployeeBtn').on('click', addEmployee);
    //$('#addEmployeeBtn').on('click', appendMonthlyTotal);
    $('.employeeList').on('click', '.removeBtn', removeEmployee);
}

// add new employee
function addEmployee() {
    event.preventDefault();
    console.log('submit btn clicked');
    let firstNameIn = $('#firstName').val();
    let lastNameIn = $('#lastName').val();
    let idNumIn = $('#id').val();
    let jobTitleIn = $('#jobTitle').val();
    let annualSalaryIn = $('#annualSalary').val();
    let newEmployee = new Employee(firstNameIn, lastNameIn, idNumIn, jobTitleIn, parseInt(annualSalaryIn));
    
    if ( firstNameIn === '' || lastNameIn === '' || idNumIn === '' || jobTitleIn === '' || annualSalaryIn === '' ) {
        return alert('Not all inputs entered.');
    }
    else {
        // push employee to employeesArray
        employeesArray.push(newEmployee);
        console.log('adding', newEmployee);
        appendEmployees(); // append employee to DOM
        appendMonthlyTotal(); // append monthly total
        clearInputs(); // clear inputs on DOM
    } // end if else
} // end addEmployee

// append new employee to table on DOM
function appendEmployees() {
    let employeeList = $('.employeeList');
    employeeList.empty();
    // loop employeesArray to append to DOM
    for (let employee of employeesArray) {
        let employeeElement =`<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.idNum}</td>
            <td>${employee.jobTitle}</td>
            <td>${employee.annualSalary}</td>
            <td><button class="removeBtn">Remove</button></td>
            </tr>`
        employeeList.append(employeeElement);
    } // end for-of
} // end appendEmployee

// append monthly cost
function appendMonthlyTotal() {
    console.log('in appendMonthlyTotal');
    let totalSalaries = 0;

    let totalMonthly = $('#totalMonthly');
    totalMonthly.empty();
    totalMonthly.removeClass('exceed');

    for (let salary of employeesArray) {   
        totalSalaries += salary.annualSalary / months;
        console.log(totalSalaries);
    } // end for of

    if (totalSalaries >= monthlyBudget) {
        totalMonthly.addClass('exceed');
        console.log('exceeded budget');
    } // end exceeds $20,000
    
    totalMonthly.append(`Total Monthly: $${totalSalaries.toFixed(2)}`);
    return totalSalaries;
} // end monthly appendMonthlyTotal

// remove employee
function removeEmployee() {
    console.log('remove clicked');
    let selectedItem = $(this).closest('tr').text();
    console.log('selected', selectedItem);

    for (let i = 0; i < employeesArray.length; i++) {
        if (selectedItem.includes(employeesArray[i].lastName)) {
            employeesArray.splice(i, 1);
            $(this).closest('tr').remove(); 
        } // end if 'td' has lastName remove <tr>
    } // end for loop
    appendMonthlyTotal();
    appendEmployees();
    console.log(employeesArray);
    return true;
} // end removeEmployee

// clear input fields
function clearInputs() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
} // end clearInputs