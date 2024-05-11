// Define an array of month names
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December',
];

// Function to get the number of days in a given month
const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Create an array of a specified length, filled with undefined values
const createArray = (length) => {
    const result = [];
    for (let i = 0 ; i < length; i++) {
        result.push(i);
    }
    return result;
}

// Function to create calendar data for the current month
const createData = () => {
    const current = new Date(); // Create a new Date object representing the current date
    current.setDate(1); // Set the date to the 1st of the month

    const startDay = current.getDay(); // Get the day of the week for the 1st of the month (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const daysInMonth = getDaysInMonth(current); // Get the number of days in the current month

    const weeks = createArray(Math.ceil((daysInMonth + startDay) / 7)); ; // Create an array representing the weeks in the calendar
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        });
    
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const day = (weekIndex * 7) + dayIndex - startDay + 1; // Calculate the day value
            const isValid = day > 0 && day <= daysInMonth; // Check if the day is valid for the current month
    
            result[weekIndex].days.push({
                dayOfWeek: dayIndex, // Corrected dayOfWeek index (0-6)
                value: isValid ? day : '',
            });
        }
    }
    
    return result;
};

// Function to add a table cell to existing HTML content
const addCell = (existing, classString, value) => {
    const result = `
        ${existing} 
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;
    return result;
};

// Function to create HTML content for the calendar data
const createHtml = (data) => {
    let result = '';
    for (const { week, days } of data) {
        let inner = "";
        inner += addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Corrected condition for weekend days
            const isAlternate = week % 2 === 0;

            let classString = 'table__cell';

            if (isToday) classString += ` table__cell_today`; // Added space before class name
            if (isWeekend) classString += ` table__cell_weekend`; // Added space before class name
            if (isAlternate) classString += ` table__cell_alternate`; // Added space before class name
            
            inner = addCell(inner, classString, value);
        }
        result += `<tr>${inner}</tr>`;
    }
    return result;
};

// Set the title of the calendar to the current month and year
const current = new Date();
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

// Generate calendar data and insert it into the HTML content
const data = createData();
document.querySelector('[data-content]').innerHTML = createHtml(data);
