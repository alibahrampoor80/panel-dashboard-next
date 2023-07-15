export function ToLocalDateString(date) {
    const option = {
        // weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric"
    }
    return new Date(date).toLocaleDateString('fa-ir', option)
}