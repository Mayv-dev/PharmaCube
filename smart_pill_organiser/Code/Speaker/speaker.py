import audiocore

class Speaker:
    audio_input = 0
    audio_bit_clock = 0
    audio_word_clock = 0
    
    file_to_play = None

    def init(self):
        self.audio_input = 0
        self.audio_bit_clock = 0
        self.audio_word_clock = 0

    def load_file(self, file_name):
        file = open(file_name, "rb")
        self.file_to_play = audiocore.WaveFile(file)

