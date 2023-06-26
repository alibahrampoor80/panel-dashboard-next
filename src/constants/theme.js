const moonIcon = document.querySelector('.moon')
const sunIcon = document.querySelector('.sun')

const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

if (userTheme === 'dark' || (!userTheme && systemTheme)) {
    document.documentElement.classList.add('dark')
    sunIcon.classList.add('hidden')
} else {
    document.documentElement.classList.remove('dark')
    moonIcon.classList.add('hidden')
}