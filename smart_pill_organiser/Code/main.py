import smart_pill_organiser.Code.Motor.motor_controller as motor_controller
import smart_pill_organiser.Code.Schedules.schedule_handler as schedule_handler
import smart_pill_organiser.Code.Schedules.schedule as schedule
import smart_pill_organiser.Code.Speaker.notification_service as notification_service
import time
from config import TEST_MODE
from machine import Pin

sh = schedule_handler.Schedule_Handler()
ns = notification_service.Notification_Service()

def main():
    if(TEST_MODE):
        test()
    else:
        run()

def run():
    schedule = sh.get_schedule(1)
    for s in schedule:
        print(s)
    time.sleep(60)

def check_schedule(schedule: list):
    for s in schedule:
        if(s.is_due()):
            handle_due_schedule(s)
            schedule.remove(s)

def handle_due_schedule(s: schedule.schedule):
    mc = motor_controller.MotorController()
    mc.move_to_compartment(s.compartment)
    for i in range(1,5):
        ns.alert()
        time.sleep(10)
    mc = motor_controller.MotorController()
    mc.start()

def test():
    turn_pin = Pin(14,Pin.IN)
    filling_pin = Pin(15, Pin.IN)

    while(True):
        if turn_pin.value() == 1 :
            test_medication_due()
        elif filling_pin.value() == 1:
            test_guided_filling
        else:
            return

def test_medication_due():
    s = schedule.schedule(time.time(), 4)
    handle_due_schedule(s)

def test_guided_filling():
    confirm_pin = Pin(16, Pin.IN)
    for i in range (3, 6):
        mc = motor_controller.MotorController()
        mc.move_to_compartment(i)
        while confirm_pin.value() == 0:
              pass
        mc = motor_controller.MotorController()
        mc.start()

if __name__ == "__main__":
    main()