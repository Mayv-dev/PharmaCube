import MotorController, time

motorcontroller = MotorController.MotorController()

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
    