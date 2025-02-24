class schedule:
    datetime = None
    compartment = None

    def __init__(self, time, compartment):
        self.datetime = time
        self.compartment = compartment

    def is_due(self, time, limit) -> bool:
        delta = self.datetime[4] - time[4]

        if(delta < 0):
            return False
        
        return delta < limit