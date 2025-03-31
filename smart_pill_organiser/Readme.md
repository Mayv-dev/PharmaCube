<h3>Setup</h3>
<h4>What you will need</h4>
<ul>
    <li>Green ULN2003 Stepper Motor Driver Board</li>
    <li>28BYJ-48 Stepper Motor</li>
    <li>Raspberry Pi Pico W</li>
    <li>Any Speaker compatible with the audio module</li>
    <li>Audio Expansion Module for Raspberry Pi Pico</li>
    <li>AZDelivery MB102 Power Supply</li>
</ul>
<h4>Wiring</h4>
<ul>
    <li>Ensure one of the power supply terminals is 5V and the other is 3.3V</li>
    <li>
        <ul>
            <b>Speaker</b>
            <li>Connect the audio module to the pi</li>
            <li>Connect the speaker to the audio module</li>
        </ul>
    </li>
    <li>
        <ul>
            <b>Motor</b>
            <li>Connect the motor to the driver board</li>
            <li>IN1 -> Pin 28</li>
            <li>IN2 -> Pin 27</li>
            <li>IN3 -> Pin 26</li>
            <li>IN4 -> Pin 22</li>
            <li>+ -> Power Supply 5V +</li>
            <li>- -> Power Supply Any -</li>
        </ul>
    </li>
</ul>
Copy all files in the Code folder to the pi<br>
Run main.py