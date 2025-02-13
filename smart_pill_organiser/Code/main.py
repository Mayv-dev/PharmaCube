from Motor import motor_controller
import time

motorcontroller = motor_controller.MotorController()

def main():
    i = 1
    motorcontroller.start()
    while(True):
        motorcontroller.move_to_compartment(i)
        i+= 2
        if(i >= 9):
            i = 1
            
if __name__ == "__main__":
    main()
    