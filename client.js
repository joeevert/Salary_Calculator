let totalMonthlySalaries = 20000;
let employeesArray = [];
let months = 12;

class Employee {
    constructor(firstName, lastName, idNum, jobTitle, annualSalary ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNum = idNum;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    } // end constructor
} // end Employee class

$(document).ready(readyNow);

function readyNow() {
    $('#addEmployee').on('click', addNewEmployee);
    $('#employeeList').on('click', '.removeEmployee', removeEmployee);
} // end readyNow

// add new employee
function addNewEmployee() {
    event.preventDefault();
    console.log('add employee');

    let firstNameIn = $('#firstName').val();
    let lastNameIn = $('#lastName').val();
    let idNumIn = $('#id').val();
    let jobTitleIn = $('#jobTitle').val();
    let annualSalaryIn = $('#annualSalary').val();
    let newEmployee = new Employee(firstNameIn, lastNameIn, idNumIn, jobTitleIn, annualSalaryIn);

    employeesArray.push(newEmployee);
    console.log(employeesArray);
    appendNewEmployee();
} // end addNewEmployee

// append new employee to table
function appendNewEmployee() {
    console.log('append New Employees');
    let totalSalaries = 0;
    let employeeList = $('#employeeList');
    employeeList.empty();

    // loop employee properties
    for(employee of employeesArray) {
        let element = `<tr> <td>${employee.firstName}</td> <td>${employee.lastName}</td> <td>${employee.idNum}</td> 
        <td>${employee.jobTitle}</td> <td>${employee.annualSalary}</td> 
        <td><button class='removeEmployee'>Remove</button></td> </tr>`;
        employeeList.append(element);

        // calculate monthly total of annual salaries
        totalSalaries += parseInt(employee.annualSalary) / months;
    } // end for of
    appendMonthlyTotal(totalSalaries);
    // clear inputs
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
} // end appendNewEmployee

// append monthly cost
function appendMonthlyTotal(allSalaries) {
    console.log('total monthly cost');
    let totalMonthly = $('#totalMonthly');
        totalMonthly.empty();
        totalMonthly.append(`<h2>Total Monthly:$${allSalaries}</h2>`)
    if( allSalaries > totalMonthlySalaries ) {
        totalMonthly.addClass('exceed');
    } // end exceeds $20,000
} // end monthly appendMonthlyTotal

// remove employee
function removeEmployee() {
    console.log('remove employee');
    //let selectedItem = $(this).parent().text();
    let selectedItem = $(this).closest('tr').find('td').text();
    console.log(selectedItem);
    for (let i = 0; i < employeesArray.length; i++) {
        if (selectedItem.includes(employeesArray[i].lastName)){
            console.log('remove me');
            employeesArray.splice(i, 1);
            $(this).closest('tr').remove();
        } // end if 'td' has lastName remove 'tr'
    } // end for loop
} // end removeEmployee

// some issues with removing still...sometimes it won't remove the 'tr'.

// base mode almost complete...change CSS to match wireframe

// update monthly total on dom for removal

// add a rollover to highlight 'tr'

// an alert box to confirm employee removal?