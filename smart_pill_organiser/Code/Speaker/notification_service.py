from Speaker.audio import Audio
import time
from machine import Pin

class Notification_Service:
    a = Audio()
    mute_pin = Pin(9, Pin.IN)
    
    def alert(self):
        for i in range(3):
            if self.muted():
                return
            self.a.write(100, 1)
            time.sleep(1)
            
            
    def confirm(self):
        if self.muted():
            return
        self.a.write(100, 2)
        
    def muted(self):
        return self.mute_pin.value() == 0
