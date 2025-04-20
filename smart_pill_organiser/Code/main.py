import smart_pill_organiser.Code.Motor.motor_controller as motor_controller
import smart_pill_organiser.Code.Schedules.schedule_handler as schedule_handler
import smart_pill_organiser.Code.Schedules.schedule as schedule
import smart_pill_organiser.Code.Speaker.notification_service as notification_service
import time

sh = schedule_handler.Schedule_Handler()
ns = notification_service.Notification_Service()

def main():
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

if __name__ == "__main__":
    main()