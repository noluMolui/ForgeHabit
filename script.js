// This array will hold all of our habit objects.
let habits = [];

//  DOM ELEMENTS
const habitForm = document.getElementById('habit-form');
const nameInput = document.getElementById('habit-name');
const targetInput = document.getElementById('habit-target');
const categoryInput = document.getElementById('habit-category');
const errorContainer = document.getElementById('error-message'); 
const habitList = document.getElementById('habit-list'); 

const totalHabitsText = document.getElementById('total-habits');
const doneTodayText = document.getElementById('done-today');
const completionRateText = document.getElementById('completion-rate');
// FUNCTIONS
// Function to validate the form inputs before adding a habit.
function validateForm(name, target, category) {
    // Check if name is too short (at least 3 characters required).
    if (name.trim().length < 3) {
        return "Habit name must be at least 3 characters long.";
    }
    // Check if target is empty or not between 1 and 7.
    const targetNum = Number(target);
    if (!target || targetNum < 1 || targetNum > 7) {
        return "Target must be a number between 1 and 7.";
    }
    // Check if a category was selected.
    if (category === "") {
        return "Please select a category from the dropdown.";
    }
    // If everything is fine, return null (no errors)
    return null;
}
// Function to calculate and update the top summary dashboard.
function updateSummary() {
    const total = habits.length; 
    let doneCount = 0; 
    
    // Use a basic loop to count how many habits are completed today.
    for (let i = 0; i < habits.length; i++) {
        if (habits[i].doneToday === true) {
            doneCount++;
        }
    }
    // Calculate percentage, handling division by zero if there are no habits.
    let percentage = 0;
    if (total > 0) {
        percentage = Math.round((doneCount / total) * 100);
    }
    // Update the HTML text.
    totalHabitsText.textContent = total;
    doneTodayText.textContent = doneCount;
    completionRateText.textContent = percentage + "%";
}
// Function to dynamically build the list elements inside the HTML.
function renderHabits() {
    // Clear out the list first to prevent duplicates when rewriting.
    habitList.innerHTML = "";
    // Loop through the source array and create HTML elements for each habit.
    habits.forEach(function(habit) {
        // Create the main container item.
        const li = document.createElement('li');
        li.className = "habit-row";
        // Apply styling if the habit is already done today.
        if (habit.doneToday) {
            li.classList.add('checked-off');
        }
        // Construct the internal elements using dynamic variables
        li.innerHTML = `
            <div class="left-side">
                <input type="checkbox" class="check-box" data-id="${habit.id}" ${habit.doneToday ? 'checked' : ''}>
                <span class="habit-title">${habit.name}</span>
                <span class="tag">${habit.category}</span>
            </div>
            <div class="right-side">
                <span class="streak"> ${habit.streak} days</span>
                <button class="remove-button" data-id="${habit.id}">Delete</button>
            </div>
        `;
        // Append the configured row into our main page container.
        habitList.appendChild(li);
    });
}
// Helper function to sync everything whenever data updates.
function updateUI() {
    renderHabits();
    updateSummary();
}
// Function to handle adding a brand new habit to our state array.
function addHabit(name, target, category) {
    // Create the standard object structure required by the brief.
    const newHabit = {
        id: Date.now().toString(), 
        name: name.trim(),
        category: category,
        target: parseInt(target),
        streak: 0,
        doneToday: false
    };
    // Push it into our array tracking system.
    habits.push(newHabit);
    // Save and redraw.
    saveToStorage();
    updateUI();
}
// Function to look up an item and remove it completely.
function deleteHabit(id) {
    // Reassign array by filtering out the matching ID element.
    habits = habits.filter(function(habit) {
        return habit.id !== id;
    });
    saveToStorage();
    updateUI();
}
// Function to toggle a checkbox and track the streak value safely.
function toggleHabitDone(id) {
    // Loop through the master array to find our targeted entry.
    for (let i = 0; i < habits.length; i++) {
        if (habits[i].id === id) {
            // Reverse the current true/false flag state.
            habits[i].doneToday = !habits[i].doneToday;
            
            // Adjust the numerical streak score based on checking status.
            if (habits[i].doneToday === true) {
                habits[i].streak = habits[i].streak + 1;
            } else {
                // Subtract 1 but prevent streaks from dropping below zero.
                if (habits[i].streak > 0) {
                    habits[i].streak = habits[i].streak - 1;
                }
            }
            break; 
        }
    }
    
    saveToStorage();
    updateUI();
}

// Optional Stretch Goal Functions: Storage persistence
function saveToStorage() {
    localStorage.setItem('myHabitsList', JSON.stringify(habits));
}

// Load data back out of local storage 
function loadFromStorage() {
    const savedData = localStorage.getItem('myHabitsList');
    if (savedData) {
        habits = JSON.parse(savedData);
        updateUI();
    }
}
// Listener for handling form processing safely
habitForm.addEventListener('submit', function(event) {
    // Block standard HTML page-reloading behavior on submissions
    event.preventDefault();
    
    // Clear out any stale text in the error section.
    errorContainer.textContent = "";
    
    // Capture user's input arguments.
    const inputName = nameInput.value;
    const inputTarget = targetInput.value;
    const inputCategory = categoryInput.value;
    
    // Run validation checks first.
    const validationError = validateForm(inputName, inputTarget, inputCategory);
   if (validationError !== null) {
        errorContainer.textContent = validationError;
        return; 
    }
    addHabit(inputName, inputTarget, inputCategory);
    habitForm.reset();
});
habitList.addEventListener('click', function(event) {
    const clickedElement = event.target;
 
    if (clickedElement.classList.contains('check-box')) {
        const targetId = clickedElement.getAttribute('data-id');
        toggleHabitDone(targetId);
    }
   
    if (clickedElement.classList.contains('remove-button')) {
        const targetId = clickedElement.getAttribute('data-id');
        deleteHabit(targetId);
    }
});

loadFromStorage();