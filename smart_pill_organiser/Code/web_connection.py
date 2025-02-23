import network
import socket
from time import sleep
import machine
import rp2
import sys

ssid = "eir54958645"
password = "HMPaRFfa8r"

def connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected == False:
        print("Waiting for connection")
        sleep(1)
    print(wlan.ifconfig())
    
connect()