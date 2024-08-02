document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('filter-category').addEventListener('change', filterExpenses);

let expenses = [];

function addExpense(event) {
    event.preventDefault();
    
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value).toFixed(2);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;
    
    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
        date
    };

    expenses.push(expense);
    updateExpenseTable();
    updateTotalAmount();
    
    document.getElementById('expense-form').reset();
}

function updateExpenseTable() {
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function updateTotalAmount() {
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);
    document.getElementById('total-amount').textContent = totalAmount;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseTable();
    updateTotalAmount();
}

function filterExpenses() {
    const category = document.getElementById('filter-category').value;
    const filteredExpenses = category === 'All' ? expenses : expenses.filter(expense => expense.category === category);
    
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = '';

    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    document.getElementById('expense-name').value = expense.name;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-date').value = expense.date;
    
    deleteExpense(id);
}