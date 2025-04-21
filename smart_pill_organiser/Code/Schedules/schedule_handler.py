import web_connection as wc
import urequests as requests
import config
from schedule import schedule

class Schedule_Handler:
    ip = None
    schedules = []
    
    def __init__(self):
        if self.ip is None:
            ip = wc.connect()
            
    def get_schedule(self, id):
        url = "http://" + config.URL + ":8080/patient/" + str(id) + "/scheduledregime"
        print("Connecting to " + url)
        response = requests.get(url)
        if response.status_code == 200:
            items = response.json()
            self.schedule = []
            for i in items:
                date_time_to_take = i["date_time_to_take"].split(' ')[1].split('+')[0]
                compartment_id = i["compartment_id"]
                sc = schedule(date_time_to_take, compartment_id)
                self.schedules.append(sc)
            return self.schedules
        else:
            return None
    
    def get_due_schedule(self, time, limit):
        to_return = []
        for schedule in self.schedules:
            if schedule.is_due(time, limit):
                to_return.append(schedule)
        
        return to_return
