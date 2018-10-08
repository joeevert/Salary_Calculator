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

$(readyNow);

function readyNow() {
    console.log('jq');
        
    $('#addEmployee').on('click', addNewEmployee);
    $('#addEmployee').on('click', appendNewEmployee);
    $('#addEmployee').on('click', appendMonthlyTotal);
    $('.employeeList').on('click', '.removeEmployee', removeEmployee);
} // end readyNow

// add new employee
function addNewEmployee() {
    event.preventDefault();
    console.log('in addNewEmployee');

    let firstNameIn = $('#firstName').val();
    let lastNameIn = $('#lastName').val();
    let idNumIn = $('#id').val();
    let jobTitleIn = $('#jobTitle').val();
    let annualSalaryIn = $('#annualSalary').val();
    let newEmployee = new Employee(firstNameIn, lastNameIn, idNumIn, jobTitleIn, parseInt(annualSalaryIn));

    // add employee to employeesArray
    employeesArray.push(newEmployee);
    console.log(employeesArray);
    
    // clear inputs
    clearInputs();
} // end addNewEmployee

// append new employee to table
function appendNewEmployee() {
    console.log('in appendNewEmployee');
    let employeeList = $('.employeeList');
    employeeList.empty();

    // loop employee properties
    for (let employee of employeesArray) {
        let firstName = `<td>${employee.firstName}</td>`;
        let lastName = `<td>${employee.lastName}</td>`;
        let idNum = `<td>${employee.idNum}</td>`;
        let jobTitle = `<td>${employee.jobTitle}</td>`;
        let annualSalary = `<td>${employee.annualSalary}</td>`;
        let removeEmp = '<td><button class="removeEmployee">Remove</button></td>';
        let element = '<tr>' + firstName + lastName + idNum + jobTitle + annualSalary + removeEmp + '</tr>';
        $('table tbody').append(element);
    } // end for of
} // end appendNewEmployee

// append monthly cost
function appendMonthlyTotal() {
    console.log('in appendMonthlyTotal');
    let totalMonthly = $('#totalMonthly');
    totalMonthly.empty();
    let totalSalaries = 0;
    for (let salary of employeesArray) {   
        totalSalaries += salary.annualSalary / months;
        console.log(totalSalaries);
        if (totalSalaries > totalMonthlySalaries) {
            totalMonthly.parent().toggleClass('exceed');
            console.log('exceeded budget');
        } // end exceeds $20,000
    }
    totalMonthly.append(`Total Monthly: $${totalSalaries.toFixed(2)}`);
    return totalSalaries;
} // end monthly appendMonthlyTotal

// remove employee
function removeEmployee() {
    console.log('in removeEmployee');
    let selectedItem = $(this).closest('tr').find('td').text();
    console.log(selectedItem);
    for (let i = 0; i < employeesArray.length; i++) {
        if (selectedItem.includes(employeesArray[i].idNum)) {
            employeesArray.splice(i, 1);
            $(this).closest('tr').find('td').remove();
            // logic for updating total monthly...
            appendMonthlyTotal();
        } // end if 'td' has idNum remove 'tr'???
    return true;

    } // end for loop
} // end removeEmployee

// clear inputs
function clearInputs() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
} // end clearInputs






// check input fields are complete
/*function checkInputs(){
    console.log('in checkInputs');
    
    if ( $('#firstName').val() == '' || $('#lastName').val() == '' || $('#id').val() == '' || $('#jobTitle').val() == '' || $('#annualSalary').val() == '' ){
        console.log( 'Not all input fields completed.' );
        alert('no')
      } // end input field checks
}*/

// required feature not working on submit...need to get checkInputs field working.

// an alert box to confirm employee removal???

// need to resolve NaN?

// toggle not working correctly...tried an if statement.

// delete removes bottom border of table.