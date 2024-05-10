// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []

    for (let i = 0 ; i < length; i++) {
        result.push()
    }

    return result
}

const createData = () => {
    const current = newDate(); // Create a new Date object representing the current date
    current.setDate(1); // Set the date to the 1st of the month

    const startDay = current.getDay(); // Get the day of the week for the 1st of the month (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const daysInMonth = getDaysInMonth(current); // Get the number of days in the current month

    const weeks = createArray(5); // Create an array representing the weeks in the calendar
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        });

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const day = (weekIndex * 7) + dayIndex - startDay + 1;
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            });
        }
    }

    return result;
};


const addCell = (existing, classString, value) => {
    const result = /*html*/ `
        ${existing} <!-- Include existing HTML content -->
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

    return result;
};


const createHtml = (data) => {
    let result = '';

    for (const { week, days } of data) { // Fixed syntax error, added 'days' in the destructuring assignment
        let inner = "";
        inner += addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        for (const { dayOfWeek, value } of days) { // Fixed syntax error, added 'days' to loop through
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7; // Corrected condition for weekend days
            const isAlternate = week % 2 === 0;

            let classString = 'table__cell';

            if (isToday) classString += `${classString}' table__cell_today`; // Added space before class name
            if (isWeekend) classString += `${classString} ' table__cell_weekend`; // Added space before class name
            if (isAlternate) classString += `${classString}' table__cell_alternate`; // Added space before class name
            
            inner += addCell(inner, classString, value);
        }

        result += `<tr>${inner}</tr>`;
    }
    
    return result;
};


// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)