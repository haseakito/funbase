export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(price)
}

export const formatMB = (num: number) => {
    return num * Math.pow(1024, 2)
}

export const formatGB = (num: number) => {
    return num * Math.pow(1024, 3)
}

export const formatDate = (date: string) => {
    const newDate = new Date(date);

    // Define an array to map month names
    const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract the day, month, and year from the Date object
    const day = newDate.getDate();
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();

    // Create the formatted date string
    return `${month} ${day}, ${year}`;
}