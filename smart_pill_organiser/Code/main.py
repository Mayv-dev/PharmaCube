import MotorController, time
import schedule_handler

motorcontroller = MotorController.MotorController()
sh = schedule_handler.Schedule_Handler()

def main():
    response = sh.get_schedule(1)
    print(response.json())
            
if __name__ == "__main__":
    main()
    