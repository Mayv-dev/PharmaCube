import stepper

IN1 = 28
IN2 = 27
IN3 = 26
IN4 = 22

motor = stepper.FullStepMotor.frompins(IN1, IN2, IN3, IN4)

def start():
    motor.reset()    

def move_to_compartment(compartment_number):
    motor.step_until_angle((compartment_number - 1)*45)