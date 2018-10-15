let totalMonthlySalaries = 20000;
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
    $('#addEmployeeBtn').on('click', appendMonthlyTotal);
    $('.employeeList').on('click', '.removeEmployee', removeEmployee);
}

// add new employee
function addEmployee() {
    event.preventDefault();
    console.log('submit clicked');

    let firstNameIn = $('#firstName').val();
    let lastNameIn = $('#lastName').val();
    let idNumIn = $('#id').val();
    let jobTitleIn = $('#jobTitle').val();
    let annualSalaryIn = $('#annualSalary').val();
    let newEmployee = new Employee(firstNameIn, lastNameIn, idNumIn, jobTitleIn, parseInt(annualSalaryIn));

    // push employee to employeesArray
    employeesArray.push(newEmployee);
    console.log(employeesArray);
    
    // append employee to DOM
    appendEmployee();

    // clear inputs on DOM
    clearInputs();
} // end addEmployee

// append new employee to table on DOM
function appendEmployee() {
    console.log('append new employee');
    let employeeList = $('.employeeList');
    employeeList.empty();

    // loop employee properties
    for (let employee of employeesArray) {
        let firstName = `<td>${employee.firstName}</td>`;
        let lastName = `<td>${employee.lastName}</td>`;
        let idNum = `<td>${employee.idNum}</td>`;
        let jobTitle = `<td>${employee.jobTitle}</td>`;
        let annualSalary = `<td>${employee.annualSalary}</td>`;
        let removeBtn = '<td><button class="removeEmployee">Remove</button></td>';
        let element = `<tr>${firstName} ${lastName} ${idNum} ${jobTitle} ${annualSalary} ${removeBtn}</tr>`;
        $('table tbody').append(element);
    } // end for-of
} // end appendEmployee

// append monthly cost
function appendMonthlyTotal() {
    console.log('in appendMonthlyTotal');
    let totalSalaries = 0;

    let totalMonthly = $('#totalMonthly');
    totalMonthly.empty();
    
    for (let salary of employeesArray) {   
        totalSalaries += salary.annualSalary / months;
        console.log(totalSalaries);
        if (totalSalaries >= totalMonthlySalaries) {
            totalMonthly.addClass('exceed');
            console.log('exceeded budget');
        } // end exceeds $20,000
    }
    totalMonthly.append(`Total Monthly: $${totalSalaries.toFixed(2)}`);
    return totalSalaries;
} // end monthly appendMonthlyTotal

// remove employee
function removeEmployee() {
    console.log('remove clicked');
    let selectedItem = $(this).closest('tr').find('td').text();
    console.log(selectedItem);
    
    for (let i = 0; i < employeesArray.length; i++) {
        if (selectedItem.includes(employeesArray[i].idNum)) {
            employeesArray.splice(i, 1);
            $(this).closest('tr').find('td').remove();
            
            // logic for updating total monthly
            appendMonthlyTotal();
        } // end if 'td' has idNum remove 'tr'???
    } // end for loop
    console.log(employeesArray);
} // end removeEmployee

// clear input fields
function clearInputs() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
} // end clearInputs

//remove employee
function removeEmployee() {
    console.log('remove clicked');
    $(this).closest('tr').remove();
    console.log(employeesArray);
}