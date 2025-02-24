import web_connection as wc
import urequests as requests
import config
import schedule

class Schedule_Handler:
    ip = None
    schedules = []
    
    def __init__(self):
        if self.ip is None:
            ip = wc.connect()
            
    def get_schedule(self, id):
        url = "http://" + config.URL + ":8080/patient/" + str(id) + "/schedule"
        print("Connecting to " + url)
        response = requests.get(url)
        print(response.status_code)
        return response
    
    def get_due_schedule(self, time, limit):
        to_return = []
        for schedule in self.schedules:
            if schedule.is_due(time, limit):
                to_return.append(schedule)
        
        return to_return
