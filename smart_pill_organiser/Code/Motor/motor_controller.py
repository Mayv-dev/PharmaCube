import stepper

class MotorController:
    IN1 = 0
    IN2 = 0
    IN3 = 0
    IN4 = 0

    motor = None
    
    def __init__(self):
        self.IN1 = 28
        self.IN2 = 27
        self.IN3 = 26
        self.IN4 = 22
        self.motor = stepper.FullStepMotor.frompins(self.IN1, self.IN2, self.IN3, self.IN4)
    
    def start(self):
        self.motor.reset()    

    def move_to_compartment(self, compartment_number):
        self.motor.step_until_angle((compartment_number - 1)*45)
