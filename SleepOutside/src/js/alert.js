export default class Alert {
    init() {
      fetch("/json/alerts.json")
        .then((Response) => Response.json())
        .then((data) => {
          console.log(data);
        });
    }
  
    buildAlert(alerts) {
      let section = `<section class="alert-list">`;
      if (alerts.length > 0) {
        const elements = alerts.map((alert) => {
          let p = `<p style="background-color:${alert.background};color:${alert.color}">${alert.message}</p>`;
        });
        section += elements.join("");
        section += "</section>";
  
        document.getElementsByTagName("main").appendChild(section);
      }
    }
  }