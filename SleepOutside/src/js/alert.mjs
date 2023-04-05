export default class Alert {
  constructor() {
    this.alertList = document.createElement("section");
    this.alertList.classList.add("alert-list");
  }

  async fetchAlerts(alertFile) {
    const response = await fetch(alertFile);
    const json = await response.json();
    return json;
  }

  //Fetch alerts
  async create(alertFile) {
    const alerts = await this.fetchAlerts(alertFile);
    if (alerts.alerts == null){
      return;
    }
    alerts.alerts.forEach((alert) => {
      let options = {};
      options.bgColor = alert.bgColor;
      options.textColor = alert.textColor;
      options.customClass = alert.customClass;
      options.scroll = false;
      Alert.createOneAlert(alert.message, options);
    });
  }
  static createOneAlert(message, options = {}){
    /*
    Options are:
    scroll (true or false)
    bgColor (Background color. In the format '#RRGGBB')
    textColor (Text color. In the format '#RRGGBB')
    customClass (A custom class to add to the item. in the format 'ClassName')
    */
      //creates a div to hold the alert
      const alert = document.createElement('div');
  
      //add attributes to the alert div
      alert.classList.add('alert');
      alert.age = 0;

      // Handle most of the options
      if (options.bgColor != null){
        alert.style.backgroundColor = options.bgColor;
      }
      if (options.textColor != null){
        alert.style.color = options.textColor;
      }
      if (options.customClass != null){
        alert.classList.add(options.customClass);
      }

      //insert the alert's message and an X to close the alert
      alert.innerHTML = `<p>${message}</p><span>X</span>`;

      //add an eventlistener to the X to remove the alert
      alert.addEventListener('click', function (e) {
        if(e.target.tagName == "SPAN") {
          main.removeChild(this);
        }
      });

      //get the main element and store it to a variable
      const main = document.querySelector('main');

      //Make it so that the alert automatically dissapears
        // I think undefined == null, this should work?
      if (main.hasAlertInterval == null){
        main.hasAlertInterval = false;
      }
      if (!main.hasAlertInterval){
        main.hasAlertInterval = true;
        let timerID = setInterval(()=>{
          let alerts = document.querySelectorAll(".alert")
          let youngest = 10;
          alerts.forEach((alert)=>{
            if (alert.age < youngest){
              youngest = alert.age;
            }
            // When it is about to get deleted, make it fade
            if (alert.age == 8){
              alert.classList.add("fading");
            }
            if (alert.age >= 9){
              alert.remove();
            }else{
              alert.age ++;
            }
          })
          // This will remove the interval even if the user hit the X button
          if (youngest == 10){
            document.querySelector("main").hasAlertInterval = false;
            clearTimeout(timerID);
          }
        }, 1000)
      }
      //prepend the alert to the main container so it shows at the top
      main.prepend(alert);
  
      //set the scroll so that the window will automatically scroll up to the top for the user to see the alert
      if (options.scroll != null && options.scroll){
        window.scrollTo(0, 0);
      }
  }
}