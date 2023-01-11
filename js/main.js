const links = [{
    label: "Week1 notes ",
    url: 'week1/index.html'
}, {
    label: "Week2 notes ",
    url: 'week2/index.html'
}, 

]


links.forEach(link => {
let week = document.createElement('li');

let href = document.createElement('a');
href.setAttribute('href', link.url);
if (link.label.includes('Final Video Demonstration')) {
    href.setAttribute('target', '_blank');    
    
}
href.textContent = link.label;

week.appendChild(href);

document.querySelector('ol').appendChild(week);
})