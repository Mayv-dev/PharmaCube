import Motor.motor_controller as motor_controller
import Schedules.schedule_handler as schedule_handler
import Schedules.schedule as schedule
import Speaker.notification_service as notification_service
import time
from config import TEST_MODE, USER_ID
from machine import Pin

#sh = schedule_handler.Schedule_Handler()
ns = notification_service.Notification_Service()

def main():
    if(TEST_MODE):
        test()
    else:
        run()

def run():
    schedule = sh.get_schedule(USER_ID)
    check_schedule(schedule)
    time.sleep(60)

def check_schedule(schedule: list):
    for s in schedule:
        if(s.is_due()):
            handle_due_schedule(s)
            schedule.remove(s)

def handle_due_schedule(s: schedule.schedule):
    open_pin = Pin(14, Pin.IN)
    while(open_pin.value() == 0):
        pass
    mc = motor_controller.MotorController()
    mc.move_to_compartment(s.compartment)
    while(open_pin.value() == 1):
        pass
    mc.move_to_compartment(10 - s.compartment)

def test():
    turn_pin = Pin(17,Pin.IN)
    filling_pin = Pin(16, Pin.IN)

    while(True):
        if turn_pin.value() == 1 :
            print("Time to take medication")
            test_medication_due()
            return
        elif filling_pin.value() == 1:
            print("Time to fill medication")
            test_guided_filling()
            return

def test_medication_due():
    s = schedule.schedule(time.time(), 4)
    handle_due_schedule(s)

def test_guided_filling():
    confirm_pin = Pin(14, Pin.IN)
    mc = motor_controller.MotorController()
    mc.move_to_compartment(3)
    print("In position")
    time.sleep(2)
    for i in range (1, 5):
        while confirm_pin.value() == 0:
              pass
        print("Moving to compartment " + str(i)) 
        mc.move_to_compartment(3 + i)
        time.sleep(2)
    mc.move_to_compartment(1)

if __name__ == "__main__":
    main()
