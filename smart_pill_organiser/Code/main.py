import MotorController, time
import schedule_handler

motorcontroller = MotorController.MotorController()
sh = schedule_handler.Schedule_Handler()

def main():
    schedule = sh.get_schedule(1)
    for s in schedule:
        print(s)
    
if __name__ == "__main__":
    main()
    