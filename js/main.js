const links = [{
    label: "Week1 notes ",
    url: 'week1/index.html'
}, {
    label: "Week2 notes ",
    url: 'week2/index.html'
}, {
    label: "Week3 notes ",
    url: 'week3/index.html'
}, {
    label: "Week4 notes ",
    url: 'week4/index.html',
}, {
    label: "Week4 Team Activity",
    url: 'week4/index_team.html'
}, {
    label: "Week5 Team Activity",
    url: 'week5/index_team.html'
}, {
    label: "Week5 Notes",
    url: 'week5/index.html'
}, {
    label: "Todo App",
    url: 'todoApp/index.html'
},
{
    label: "Week 8 Notes",
    url: 'week8/index.html'
},
{
    label: "Week 8 team activity",
    url: 'week8/week8team.html'
},
{
    label: "Week 9 Notes",
    url: 'week9/index.html'
},
{
    label: "Week 9 team activity",
    url: 'week9/index-START.html'
},
{
    label: "Week 10 Notes",
    url: 'week10/index.html'
},
{
    label: "Week 10 team activity",
    url: 'week10/indexTeam.html'
},
{
    label: "Week 11 team activity",
    url: 'week11/client/indexTeam.html'
},
{
    label: " Final Project PokeDex",
    url: 'pokedex/index.html'
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