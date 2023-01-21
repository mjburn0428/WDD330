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
    {
      label: "Week 05",
      url: "week5/index.html"
    },
    {
      label: "Week 06 todo App",
      url: "week6/index.html"
    },
    {
      label: "Week 07 ",
      url: "week7/index.html"
    },
    {
      label: "Week 08 ",
      url: "week8/index.html"
    },
    {
      label: "Week 09 ",
      url: "week9/index.html"
    },
    {
      label: "Week 10 ",
      url: "week10/index.html"
    },
    {
      label: "Final Project",
      url: "FINAL-PROJECT/index.html"
    }




  ]

  let counter = 1;

   links.forEach(function (info) {
   

    let link = "link"+counter;
    console.log(link)
    
    document.getElementById(link).innerHTML = '<a href="' + info.url + '">'+ info.label +'</a>';
    
    counter++;
  


})



//document.getElementById("week").innerHTML = links.label