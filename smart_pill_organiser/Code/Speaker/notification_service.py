import smart_pill_organiser.Code.Speaker.audio as audio
import time

class Notification_Service:
    audio = audio.Audio()
    
    def alert(self):
        for i in range(3):
            self.audio.write(100, 1)
            time.sleep(1)
            
            
    def confirm(self):
        self.audio.write(100, 2)