import MotorController, time
import schedule_handler

motorcontroller = MotorController.MotorController()
sh = schedule_handler.Schedule_Handler()

def main():
    start()
            
if __name__ == "__main__":
    main()

def start():
    while(True):
        sh.get_schedule()
        for i in range(0, 6):
            due = sh.get_due_schedule(time.localtime(), 10)
            for s in due:
                motorcontroller.move_to_compartment(s[5])
                time.sleep(60)
            time.sleep(10)