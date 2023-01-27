const links = [
  {
    label: "Week 01 ",
    url: "week1/index.html"
  },
  {
    label: "Week 02 ",
    url: "week2/index.html"
  },
  {
    label: "Week 03 ",
    url: "week3/index.html"
  },
  {
    label: "Week 04 ",
    url: "week4/index.html"
  },
  



]

let counter = 1;

 links.forEach(function (info) {
 

  let link = "link"+counter;
  console.log(link)
  
  document.getElementById(link).innerHTML = '<a href="' + info.url + '">'+ info.label +'</a>';
  
  counter++;



})


//document.getElementById("week").innerHTML = links.label