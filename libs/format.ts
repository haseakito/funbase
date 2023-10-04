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